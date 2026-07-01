export default function Loading() {
  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div
        className="
          mx-auto
          max-w-7xl
          grid
          gap-6
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="
              overflow-hidden
              rounded-2xl
              border
              bg-background
              animate-pulse
            "
          >
            <div className="h-64 bg-muted" />

            <div className="space-y-4 p-6">
              <div className="h-5 w-3/4 rounded bg-muted" />
              <div className="h-4 w-1/2 rounded bg-muted" />

              <div className="pt-4">
                <div className="h-10 w-full rounded-lg bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}