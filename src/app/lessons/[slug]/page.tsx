import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLessonBySlug, getAllLessonSlugs } from "@/lib/lessons";
import OsmdLessonPlayerWrapper from "@/components/OsmdLessonPlayerWrapper";

export async function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const scorePath = path.join(process.cwd(), "content", "lessons", slug, "score.xml");
  const lessonPath = path.join(process.cwd(), "content", "lessons", slug, "lesson.mdx");

  let scoreXml = "";
  let lessonMarkdown = "";

  try {
    scoreXml = fs.readFileSync(scorePath, "utf8");
    lessonMarkdown = fs.readFileSync(lessonPath, "utf8");
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="mb-10 flex flex-col gap-4 rounded-4xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Lesson</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">{lesson.title}</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">{lesson.description}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            >
              Back to roadmap
            </Link>
            <Link
              href="/lessons"
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              All lessons
            </Link>
          </div>
        </div>

        <OsmdLessonPlayerWrapper scoreXml={scoreXml} />

        <article className="mt-10 rounded-4xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20 text-slate-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {lessonMarkdown}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
