import React from "react";

interface FormattedTrademarkProps {
  text: string | undefined;
  className?: string;
}

export function FormattedTrademark({ text, className }: FormattedTrademarkProps) {
  if (!text) return null;
  if (!text.includes("®")) return <span className={className}>{text}</span>;

  const parts = text.split("®");
  return (
    <span className={className}>
      {parts.map((part, index) => (
        <React.Fragment key={index}>
          {part}
          {index < parts.length - 1 && (
            <sup className="text-[0.55em] relative -top-[0.80em] font-bold select-none ml-[0.05em] align-baseline">
              ®
            </sup>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
