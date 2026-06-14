/*
  README: Exercise page entry point.

  This file is part of the UI layer in `src/app/`.
  It composes server-side content loaders with client-only components.
  - Loads the MusicXML score from `src/lib/musicXmlLoader.ts`
  - Resolves the MP3 playback URL
  - Renders `MusicXmlRenderer` and `ExerciseAudioFooter`

  Why: We keep data loading on the server and pass only strings/URLs to client components.
  This avoids shipping Node-only file system code into the browser.
*/

import { getExerciseAudioSrc, loadMusicXml } from "@/lib/musicXmlLoader";
import MusicXmlRenderer from "@/components/MusicXmlRenderer";
import ExerciseAudioFooter from "@/components/ExerciseAudioFooter";

// Load the score content from the server-side helper.
// This happens at render time on the server in Next.js App Router.
const loadedXml = loadMusicXml();
const xmlPreview =
  loadedXml.content ??
  "No MusicXML found in content/lessons/testing/pianoFourBarExample.mxl";

// Resolve the audio playback endpoint if the MP3 exists.
const audioSrc = getExerciseAudioSrc();

export default function ExercisePage() {
  return (
    <main className="mainPage pageColor split-container px-6 py-10">
      <section className="flex flex-1 flex-col gap-6 lg:gap-8">
        <div className="flex flex-[3] flex-col gap-6 rounded-[32px] border border-slate-300/20 bg-white/80 p-6 shadow-[0_20px_60px_-30px_rgba(17,24,39,0.45)] md:p-8">
          <div className="flex h-full flex-col gap-6 md:flex-row">
            <div className="flex-1 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-600">MusicXML</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Score Preview</h2>
              <div className="mt-5 min-h-[320px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-700">
                {/* Client-only renderer that draws the score inside the browser. */}
                <MusicXmlRenderer xml={xmlPreview} />
              </div>
              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-950/5 p-4">
                {/* Playback controls are client-only and depend on the browser Audio API. */}
                <ExerciseAudioFooter audioSrc={audioSrc} />
              </div>
            </div>

            <div className="flex-1 rounded-3xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-600">Analysis</p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">Chord Progression</h2>
              <div className="mt-5 flex h-full flex-col gap-4 rounded-3xl bg-white p-5 text-sm leading-7 text-slate-700">
                <div className="space-y-3 rounded-3xl border border-slate-200 p-4">
                  <div className="font-semibold text-slate-900">Progression</div>
                  <p>Cmaj7 • Dm7 • G7 • Cmaj7</p>
                </div>
                <div className="space-y-3 rounded-3xl border border-slate-200 p-4">
                  <div className="font-semibold text-slate-900">Bass Line</div>
                  <p>Root motion: C → D → G → C</p>
                </div>
                <div className="space-y-3 rounded-3xl border border-slate-200 p-4">
                  <div className="font-semibold text-slate-900">Function</div>
                  <p>I → ii → V → I</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-[5] flex-col gap-4 rounded-[32px] border border-slate-300/20 bg-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(17,24,39,0.45)]">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-600">Lesson notes</p>
          <h2 className="text-3xl font-semibold text-slate-900">Exercise Walkthrough</h2>
          <div className="space-y-5 text-base leading-8 text-slate-700">
            <p>
              This mock exercise is designed to help you read a notated phrase while tracing the harmonic movement underneath. Start by identifying the main key center and then follow the bass line through the progression.
            </p>
            <p>
              The left panel now displays the MusicXML content extracted from your file, so you can verify the score structure while the right panel shows the chord analysis.
            </p>
            <p>
              Use the progression labels to listen for the cadence and notice the return from V to I. Then practice singing or playing the root notes on your instrument to internalize the functional harmony.
            </p>
            <p>
              In a full version, this page would also include an interactive playback control, score highlighting, and written prompts to guide your first-pass reading.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
