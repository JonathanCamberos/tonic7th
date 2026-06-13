"use client";

import dynamic from "next/dynamic";

const OsmdLessonPlayer = dynamic(
  () => import("./OsmdLessonPlayer"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-4xl border border-slate-800 bg-slate-900/90 p-6 text-slate-400">
        Loading sheet music player...
      </div>
    ),
  }
);

export default function OsmdLessonPlayerWrapper({ scoreXml }: { scoreXml: string }) {
  return <OsmdLessonPlayer scoreXml={scoreXml} />;
}
