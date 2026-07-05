export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-brand-red-500 animate-bounce" />
        <div className="w-4 h-4 rounded-full bg-brand-red-500 animate-bounce [animation-delay:-.3s]" />
        <div className="w-4 h-4 rounded-full bg-brand-red-500 animate-bounce [animation-delay:-.5s]" />
      </div>
    </div>
  );
}
