export type LessonMetadata = {
  slug: string;
  title: string;
  category: string;
  description: string;
};

export const lessons: LessonMetadata[] = [
  {
    slug: "intervals",
    title: "Intervals",
    category: "Basics",
    description: "Understand melodic and harmonic distance between notes.",
  },
  {
    slug: "major-scales",
    title: "Major Scales",
    category: "Scales",
    description: "Build major scales and identify key signatures.",
  },
  {
    slug: "triads",
    title: "Triads",
    category: "Harmony",
    description: "Explore triads, chord quality, and basic harmony.",
  },
];

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug);
}

export function getAllLessonSlugs() {
  return lessons.map((lesson) => lesson.slug);
}
