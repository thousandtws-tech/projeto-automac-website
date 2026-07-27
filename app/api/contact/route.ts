import { NextResponse } from "next/server";
import { Resend } from "resend";

function validate(data: Record<string, unknown>) {
  const errors: string[] = [];
  if (!data.nome || typeof data.nome !== "string" || data.nome.trim().length < 2)
    errors.push("Nome deve ter pelo menos 2 caracteres.");
  if (!data.email || typeof data.email !== "string" || !data.email.includes("@"))
    errors.push("E-mail inválido.");
  if (!data.telefone || typeof data.telefone !== "string" || data.telefone.trim().length < 8)
    errors.push("Telefone deve ter pelo menos 8 dígitos.");
  if (!data.mensagem || typeof data.mensagem !== "string" || data.mensagem.trim().length < 10)
    errors.push("Mensagem deve ter pelo menos 10 caracteres.");
  return errors;
}

function buildEmailHtml(data: {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  segmento?: string;
  mensagem: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e0e0e0;">
          <!-- Header -->
          <tr>
            <td style="background:#000;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#fff;font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:2px;">
                Novo contato — site
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["Nome", data.nome],
                  ["E-mail", data.email],
                  ["Telefone", data.telefone],
                  ["Empresa", data.empresa || "—"],
                  ["Segmento", data.segmento || "—"],
                ]
                  .map(
                    ([label, value]) =>
                      `<tr>
                        <td style="padding:8px 0 4px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#666;">${label}</td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 16px;font-size:15px;color:#111;border-bottom:1px solid #eee;">${value}</td>
                      </tr>`
                  )
                  .join("")}
                <tr>
                  <td style="padding:24px 0 8px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#666;">Mensagem</td>
                </tr>
                <tr>
                  <td style="padding:0 0 8px;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${data.mensagem}</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f4f4f4;padding:20px 40px;text-align:center;font-size:11px;color:#999;">
              Automec Portas Automáticas — atendimento@automec.com.br
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { error: "Serviço de e-mail indisponível." },
        { status: 503 }
      );
    }

    const body = await request.json();

    const errors = validate(body);
    if (errors.length > 0) {
      return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
    }

    const data = {
      nome: body.nome as string,
      email: body.email as string,
      telefone: body.telefone as string,
      empresa: (body.empresa as string) || undefined,
      segmento: (body.segmento as string) || undefined,
      mensagem: body.mensagem as string,
    };

    const to = process.env.CONTACT_EMAIL_TO || "atendimento@automec.com.br";
    const from = process.env.CONTACT_EMAIL_FROM || "contato@automec.com.br";
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: `Contato Site <${from}>`,
      to: [to],
      replyTo: data.email,
      subject: `Novo contato — ${data.nome} — ${data.empresa || data.segmento || "Sem empresa"}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Falha ao enviar e-mail. Tente novamente." }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}
