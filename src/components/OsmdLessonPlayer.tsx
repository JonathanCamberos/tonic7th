"use client";

import { useEffect, useRef, useState } from "react";

type OsmdLessonPlayerProps = {
  scoreXml: string;
};

export default function OsmdLessonPlayer({ scoreXml }: OsmdLessonPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioPlayerRef = useRef<any>(null);
  const synthRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Defer heavy initialization until user interacts to avoid high CPU on page load
  useEffect(() => {
    return () => {
      audioPlayerRef.current = null;
      synthRef.current = null;
    };
  }, []);

  async function initializePlayer() {
    if (isReady) return;
    if (!containerRef.current) return;

    // Use requestIdleCallback when available to defer work until the main thread is idle
    const doInit = async () => {
      const { OpenSheetMusicDisplay } = await import("opensheetmusicdisplay");
      const audioModule = await import("osmd-audio-player");
      const AudioPlayerClass = (audioModule.default ?? audioModule) as any;

      const osmd = new OpenSheetMusicDisplay(containerRef.current!, {
        autoResize: true,
        drawTitle: true,
      });

      await osmd.load(scoreXml);
      osmd.render();

      try {
        audioPlayerRef.current = new AudioPlayerClass(osmd);
      } catch {
        audioPlayerRef.current = null;
      }

      const tone = await import("tone");
      synthRef.current = new tone.Synth().toDestination();

      setIsReady(true);
    };

    if (typeof (window as any).requestIdleCallback === "function") {
      (window as any).requestIdleCallback(() => {
        void doInit();
      });
    } else {
      await doInit();
    }
  }

  const handlePlay = async () => {
    // Ensure player is initialized before playing
    if (!isReady) {
      await initializePlayer();
    }

    const tone = await import("tone");
    await tone.start();

    if (audioPlayerRef.current?.play) {
      audioPlayerRef.current.play();
      setIsPlaying(true);
      return;
    }

    if (synthRef.current) {
      const now = tone.now();
      const notes = ["C4", "E4", "G4", "C5"];
      notes.forEach((note: string, index: number) => {
        synthRef.current.triggerAttackRelease(note, "8n", now + index * 0.25);
      });
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (audioPlayerRef.current?.pause) {
      audioPlayerRef.current.pause();
    }
    synthRef.current?.triggerRelease();
    setIsPlaying(false);
  };

  return (
    <section className="flex flex-col gap-5 rounded-4xl border border-slate-800 bg-slate-950/90 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-sky-400">Sheet music</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Interactive music score</h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700"
            onClick={handlePlay}
            disabled={!isReady || isPlaying}
          >
            Play
          </button>
          <button
            className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
            onClick={handleStop}
          >
            Stop
          </button>
        </div>
      </div>
      <div className="min-h-[320px] overflow-hidden rounded-3xl bg-white/5 p-3 text-slate-300">
        <div ref={containerRef} className="h-full min-h-[280px]" />
      </div>
      {!isReady ? (
        <p className="text-sm text-slate-400">Loading sheet music and audio player...</p>
      ) : (
        <p className="text-sm text-slate-400">Press play to hear the score using osmd-audio-player and Tone.js.</p>
      )}
    </section>
  );
}
