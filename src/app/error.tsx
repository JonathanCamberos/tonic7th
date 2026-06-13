"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl rounded-4xl border border-slate-700 bg-slate-900/90 p-10 shadow-xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.28em] text-sky-400">Something went wrong</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">An unexpected error occurred.</h1>
        <p className="mt-4 text-slate-300">{error?.message || "Please try again."}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
