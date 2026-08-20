import React from "react";

interface FormattedTrademarkProps {
  text: string | undefined;
  className?: string;
}

export function FormattedTrademark({ text, className }: FormattedTrademarkProps) {
  if (!text) return null;
  const normalized = text.replace(/\s+\//g, String.fromCharCode(160) + "/");
  if (!normalized.includes("®")) return <span className={className}>{normalized}</span>;

  const tokens = normalized.split(/(\s+)/);
  return (
    <span className={className}>
      {tokens.map((token, index) => {
        if (/^\s+$/.test(token)) return token;
        const parts = token.split("®");
        return (
          <span key={index} className="whitespace-nowrap">
            {parts.map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i < parts.length - 1 && (
                  <sup className="text-[0.55em] relative -top-[0.80em] font-bold select-none ml-[0.05em] align-baseline">
                    ®
                  </sup>
                )}
              </React.Fragment>
            ))}
          </span>
        );
      })}
    </span>
  );
}
