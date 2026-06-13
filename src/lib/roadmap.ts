import { lessons } from "@/lib/lessons";

const categoryColor: Record<string, string> = {
  Basics: "#E2E8F0",
  Scales: "#C7D2FE",
  Harmony: "#FBCFE8",
};

export const roadmapNodes = lessons.map((lesson, index) => ({
  id: lesson.slug,
  position: { x: 40 + index * 280, y: lesson.category === "Harmony" ? 280 : 80 },
  data: {
    label: `${lesson.title}`,
    slug: lesson.slug,
    category: lesson.category,
    description: lesson.description,
  },
  style: {
    width: 240,
    borderRadius: 22,
    background: categoryColor[lesson.category] ?? "#E2E8F0",
    border: "1px solid rgba(15, 23, 42, 0.12)",
    color: "#0F172A",
    padding: "18px",
  },
})) as Array<{
  id: string;
  position: { x: number; y: number };
  data: { label: string; slug: string; category: string; description: string };
  style: React.CSSProperties;
}>;

export const roadmapEdges = [
  {
    id: "edge-intervals-to-major",
    source: "intervals",
    target: "major-scales",
    type: "smoothstep",
    style: {
      stroke: "#94A3B8",
      strokeWidth: 2,
    },
  },
  {
    id: "edge-major-to-triads",
    source: "major-scales",
    target: "triads",
    type: "smoothstep",
    style: {
      stroke: "#94A3B8",
      strokeWidth: 2,
    },
  },
];
