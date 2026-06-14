"use client";

import { useRouter } from "next/navigation";
import { lessons } from "@/lib/lessons";

export default function StaticRoadmap() {
  const router = useRouter();

  return (
    <div className="w-full overflow-auto p-4">
      <div className="mx-auto max-w-4xl space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">Lesson Plans</h3>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <button
              key={lesson.slug}
              onClick={() => router.push(`/lessons/${lesson.slug}`)}
              onMouseEnter={() => {
                void router.prefetch(`/lessons/${lesson.slug}`);
              }}
              className="lesson-card"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-base font-semibold text-slate-900">{lesson.title}</div>
                  <p className="mt-1 text-sm text-slate-700">{lesson.description}</p>
                </div>
                <span className="text-sm text-slate-600">{lesson.category}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
