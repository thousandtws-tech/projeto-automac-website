import { ImageResponse } from "next/og";

export const alt = "Automec Portas Automáticas | Engenharia de acesso seguro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1d1816 60%, #360708 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 14, height: 56, background: "#e41e26" }} />
          <span
            style={{
              color: "#ffffff",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Automec
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span
            style={{
              color: "#ffffff",
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Portas Automáticas
          </span>
          <span style={{ color: "#e5e5e5", fontSize: 32, lineHeight: 1.35 }}>
            Engenharia de acesso seguro para projetos em todo o Brasil
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <span style={{ color: "#e41e26", fontSize: 26, fontWeight: 700 }}>
            +35 ANOS
          </span>
          <span style={{ color: "#a3a3a3", fontSize: 26 }}>automec.com.br</span>
        </div>
      </div>
    ),
    size,
  );
}
