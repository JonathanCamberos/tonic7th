import fs from "fs";
import path from "path";
import { unzipSync } from "fflate";

export type MusicXmlSource = "xml" | "mxl" | null;
export type MusicXmlResult = { source: MusicXmlSource; content: string | null };

const defaultBaseDir = path.join(process.cwd(), "content", "lessons", "testing");

export function getExerciseAudioSrc(
  baseDir = defaultBaseDir,
  filename = "pianoFourBarExample.mp3"
) {
  const audioPath = path.join(baseDir, filename);
  return fs.existsSync(audioPath) ? `/api/audio/${filename}` : undefined;
}

export function extractScoreXmlFromMxl(raw: Uint8Array): string {
  const entries = unzipSync(raw);
  const xmlEntries = Object.keys(entries).filter((name) => name.toLowerCase().endsWith(".xml"));

  const directXml = xmlEntries.find((name) => !name.toLowerCase().includes("container"));
  if (directXml) {
    return new TextDecoder().decode(entries[directXml]);
  }

  const containerFile = xmlEntries.find((name) => name.toLowerCase().includes("container"));
  if (containerFile) {
    const containerText = new TextDecoder().decode(entries[containerFile]);
    const match = containerText.match(/full-path="([^"]+)"/i);
    if (match) {
      const scorePath = match[1];
      const scoreEntry = Object.keys(entries).find(
        (name) => name === scorePath || name.endsWith(`/${scorePath}`)
      );
      if (scoreEntry) {
        return new TextDecoder().decode(entries[scoreEntry]);
      }
    }
  }

  throw new Error("Compressed .mxl file does not contain a readable score XML.");
}

export function loadMusicXml(baseDir = defaultBaseDir): MusicXmlResult {
  const xmlPath = path.join(baseDir, "pianoFourBarExample.xml");
  const mxlPath = path.join(baseDir, "pianoFourBarExample.mxl");

  if (fs.existsSync(xmlPath)) {
    return { source: "xml", content: fs.readFileSync(xmlPath, "utf8") };
  }

  if (!fs.existsSync(mxlPath)) {
    return { source: null, content: null };
  }

  try {
    const raw = fs.readFileSync(mxlPath);
    return { source: "mxl", content: extractScoreXmlFromMxl(raw) };
  } catch (error) {
    return {
      source: "mxl",
      content: "Compressed .mxl file does not contain a readable score XML.",
    };
  }
}
