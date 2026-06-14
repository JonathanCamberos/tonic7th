import fs from "fs";
import os from "os";
import path from "path";
import { describe, expect, it } from "vitest";
import { zipSync } from "fflate";
import {
  extractScoreXmlFromMxl,
  getExerciseAudioSrc,
  loadMusicXml,
} from "./musicXmlLoader";

describe("extractScoreXmlFromMxl", () => {
  it("returns direct XML when present", () => {
    const xml = "<score-partwise></score-partwise>";
    const raw = zipSync({ "score.xml": new TextEncoder().encode(xml) });

    expect(extractScoreXmlFromMxl(raw)).toBe(xml);
  });

  it("resolves score XML via container.xml", () => {
    const scoreXml = "<score-partwise></score-partwise>";
    const raw = zipSync({
      "META-INF/container.xml": new TextEncoder().encode(
        `<?xml version="1.0"?>
<container>
  <rootfiles>
    <rootfile full-path="score1.xml" media-type="application/vnd.recordare.musicxml+xml"/>
  </rootfiles>
</container>`
      ),
      "score1.xml": new TextEncoder().encode(scoreXml),
    });

    expect(extractScoreXmlFromMxl(raw)).toBe(scoreXml);
  });

  it("throws when no valid score XML exists", () => {
    const raw = zipSync({ "META-INF/container.xml": new TextEncoder().encode("<container></container>") });

    expect(() => extractScoreXmlFromMxl(raw)).toThrow(
      "Compressed .mxl file does not contain a readable score XML."
    );
  });
});

describe("loadMusicXml", () => {
  it("finds an .xml file before .mxl", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "music-test-"));
    const xmlFile = path.join(tmpDir, "pianoFourBarExample.xml");
    fs.writeFileSync(xmlFile, "<score-partwise>xml</score-partwise>", "utf8");

    const result = loadMusicXml(tmpDir);
    expect(result).toEqual({ source: "xml", content: "<score-partwise>xml</score-partwise>" });
  });

  it("falls back to .mxl extraction when no xml file exists", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "music-test-"));
    const mxlFile = path.join(tmpDir, "pianoFourBarExample.mxl");
    const xml = "<score-partwise>mxl</score-partwise>";
    const raw = zipSync({ "score.xml": new TextEncoder().encode(xml) });
    fs.writeFileSync(mxlFile, raw);

    const result = loadMusicXml(tmpDir);
    expect(result).toEqual({ source: "mxl", content: xml });
  });

  it("returns null when neither file exists", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "music-test-"));
    const result = loadMusicXml(tmpDir);
    expect(result).toEqual({ source: null, content: null });
  });
});

describe("getExerciseAudioSrc", () => {
  it("returns a valid api path when the mp3 exists", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "audio-test-"));
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(path.join(tmpDir, "pianoFourBarExample.mp3"), "audio");

    expect(getExerciseAudioSrc(tmpDir)).toBe("/api/audio/pianoFourBarExample.mp3");
  });

  it("returns undefined when the mp3 file is missing", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "audio-test-"));
    expect(getExerciseAudioSrc(tmpDir)).toBeUndefined();
  });
});
