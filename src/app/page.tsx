import Link from "next/link";
import RoadmapFlow from "@/components/RoadmapFlow";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/95">
        <nav className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-6 py-4 text-sm uppercase tracking-[0.28em] text-slate-300 sm:px-10">
          <Link href="/" className="font-semibold text-white tracking-[0.48em]">
            tonic7th
          </Link>
          <Link href="/" className="transition hover:text-white">
            Roadmap
          </Link>
          <Link href="/lessons" className="transition hover:text-white">
            Lessons A-Z
          </Link>
          <Link href="/ear-training" className="transition hover:text-white">
            Ear Training
          </Link>
          <Link href="/news" className="transition hover:text-white">
            News
          </Link>
          <Link href="/community" className="transition hover:text-white">
            Community
          </Link>
          <Link href="/resources" className="transition hover:text-white">
            Resources
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>
      </header>
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-10">
        <header className="rounded-4xl border border-white/10 bg-slate-900/90 p-10 shadow-[0_20px_120px_-60px_rgba(15,23,42,0.75)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Tonic 7th</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Learn music theory with an interactive roadmap.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore the fundamentals, scales, harmony, and sheet music lessons built with React Flow,
            OSMD, Tone.js, and MDX.
          </p>
        </header>

        <section className="rounded-4xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20 sm:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Roadmap</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Music theory topics</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400 sm:text-right">
              Click any node to open the lesson page and view the sheet music, playback controls,
              and explanatory content.
            </p>
          </div>

          <div className="h-[680px] rounded-[32px] border border-slate-800 bg-slate-950/90 p-4">
            <RoadmapFlow />
          </div>
        </section>
      </div>
    </main>
  );
}
