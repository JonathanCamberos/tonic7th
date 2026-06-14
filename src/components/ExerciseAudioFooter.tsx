"use client";

import { useEffect, useRef, useState } from "react";

type ExerciseAudioFooterProps = {
  audioSrc?: string;
};

export default function ExerciseAudioFooter({ audioSrc }: ExerciseAudioFooterProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [statusOverride, setStatusOverride] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const defaultStatus = audioSrc
    ? "Ready to play recorded audio."
    : "Audio file not found. Add pianoFourBarExample.mp3 to public/content/lessons/testing.";
  const status = statusOverride ?? defaultStatus;

  useEffect(() => {
    if (!audioSrc) {
      audioRef.current = null;
      return;
    }

    const audio = new Audio(audioSrc);
    audio.volume = volume;
    audio.preload = "auto";
    audio.onended = () => {
      setIsPlaying(false);
      setStatusOverride("Playback finished.");
    };
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc, volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playAudio = async () => {
    if (!audioRef.current) {
      setStatusOverride("No audio file ready.");
      return;
    }

    setStatusOverride("Playing recorded audio...");
    setIsPlaying(true);

    try {
      await audioRef.current.play();
    } catch {
      setStatusOverride("Playback failed. Try again.");
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (!audioRef.current) {
      setStatusOverride("No audio file ready.");
      return;
    }

    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setStatusOverride("Stopped.");
  };

  return (
    <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-4 text-slate-800">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-600">Playback controls</p>
          <p className="text-sm text-slate-500">Play the recorded MP3 version of the exercise.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:bg-slate-400"
            onClick={playAudio}
            disabled={isPlaying || !audioSrc}
          >
            Play
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            onClick={stopAudio}
            disabled={!isPlaying}
          >
            Stop
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">Volume: {Math.round(volume * 100)}%</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="w-full"
          disabled={!audioSrc}
        />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        {status}
      </div>
    </div>
  );
}
