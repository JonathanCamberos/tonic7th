"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import { roadmapEdges, roadmapNodes } from "@/lib/roadmap";

export default function RoadmapFlow() {
  const router = useRouter();
  const nodes = useMemo(() => roadmapNodes, []);
  const edges = useMemo(() => roadmapEdges, []);
  const defaultEdgeOptions = useMemo(
    () => ({
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#94A3B8",
      },
    }),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={(_, node) => {
        if (node.data?.slug) {
          router.push(`/lessons/${node.data.slug}`);
        }
      }}
      onNodeMouseEnter={(_, node) => {
        // Warm the lesson route and client bundle so the lesson loads faster
        if (node.data?.slug) {
          try {
            router.prefetch(`/lessons/${node.data.slug}`);
          } catch {}
          // Prefetch the client player bundle
          void import("@/components/OsmdLessonPlayerWrapper");
        }
      }}
      fitView
      attributionPosition="bottom-left"
      defaultEdgeOptions={defaultEdgeOptions}
    >
      <Background gap={16} color="#334155" />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}
