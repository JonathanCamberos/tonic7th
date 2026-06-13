import Link from "next/link";
import { lessons } from "@/lib/lessons";

export default function LessonsIndex() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <header className="mb-10 rounded-4xl border border-slate-800 bg-slate-900/90 p-10 shadow-xl shadow-slate-950/20">
          <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Lessons</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">All lessons</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400">
            Choose a lesson to open the sheet music demonstration, playback controls, and the
            explanatory MDX content.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-3">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/lessons/${lesson.slug}`}
              className="rounded-4xl border border-slate-800 bg-slate-900/80 p-6 transition hover:border-slate-600 hover:bg-slate-900"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{lesson.category}</p>
              <h2 className="mt-3 text-xl font-semibold text-white">{lesson.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{lesson.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
