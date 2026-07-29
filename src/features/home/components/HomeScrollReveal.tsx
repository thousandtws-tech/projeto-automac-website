export function HomeScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-20 overflow-clip rounded-t-[28px] bg-white shadow-[0_-16px_45px_rgba(0,0,0,0.16)]">
      {children}
    </div>
  );
}
