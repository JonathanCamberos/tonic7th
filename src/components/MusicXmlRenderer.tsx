"use client";

import { useEffect, useRef, useState } from "react";

type MusicXmlRendererProps = {
  xml: string;
};

interface OsmdInstance {
  load(xml: string): Promise<void>;
  render(): void;
  clear?: () => void;
}

type OsmdConstructor = new (
  container: HTMLElement,
  options: { autoResize: boolean; drawTitle: boolean; backend: string }
) => OsmdInstance;

export default function MusicXmlRenderer({ xml }: MusicXmlRendererProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isCanceled = false;
    let osmd: OsmdInstance | null = null;

    const initialize = async () => {
      setError(null);
      setLoading(true);

      if (!containerRef.current) {
        setError("Unable to initialize sheet music container.");
        setLoading(false);
        return;
      }

      try {
        const musicModule = await import("opensheetmusicdisplay") as {
          OpenSheetMusicDisplay: OsmdConstructor;
        };
        const { OpenSheetMusicDisplay } = musicModule;

        osmd = new OpenSheetMusicDisplay(containerRef.current, {
          autoResize: true,
          drawTitle: true,
          backend: "svg",
        });

        await osmd.load(xml);
        if (isCanceled) return;
        osmd.render();
      } catch (err) {
        if (!isCanceled) {
          setError((err as Error)?.message ?? "Unable to render MusicXML.");
        }
      } finally {
        if (!isCanceled) {
          setLoading(false);
        }
      }
    };

    void initialize();

    return () => {
      isCanceled = true;
      if (osmd?.clear) {
        osmd.clear();
      }
    };
  }, [xml]);

  return (
    <div className="h-full min-h-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div ref={containerRef} className="min-h-[320px]">
        {loading && <div className="flex h-full items-center justify-center p-10 text-slate-500">Loading sheet music…</div>}
        {error && !loading && <div className="p-6 text-sm text-red-700">{error}</div>}
      </div>
    </div>
  );
}
