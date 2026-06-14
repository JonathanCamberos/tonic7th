import fs from "fs";
import os from "os";
import path from "path";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { GET } from "./route";

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "audio-route-test-"));
const contentDir = path.join(tempRoot, "content", "lessons", "testing");

beforeEach(() => {
  fs.mkdirSync(contentDir, { recursive: true });
  vi.spyOn(process, "cwd").mockReturnValue(tempRoot);
});

afterEach(() => {
  vi.restoreAllMocks();
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

describe("/api/audio/[filename] route", () => {
  it("returns 200 for an existing MP3", async () => {
    const filePath = path.join(contentDir, "pianoFourBarExample.mp3");
    fs.writeFileSync(filePath, "audio data");

    const response = await GET(new Request("http://localhost/api/audio/pianoFourBarExample.mp3"), {
      params: Promise.resolve({ filename: "pianoFourBarExample.mp3" }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("audio/mpeg");
    const body = await response.text();
    expect(body).toBe("audio data");
  });

  it("returns 404 when the file is missing", async () => {
    const response = await GET(new Request("http://localhost/api/audio/missing.mp3"), {
      params: Promise.resolve({ filename: "missing.mp3" }),
    });

    expect(response.status).toBe(404);
  });

  it("returns 400 for unsupported extensions", async () => {
    const response = await GET(new Request("http://localhost/api/audio/pianoFourBarExample.txt"), {
      params: Promise.resolve({ filename: "pianoFourBarExample.txt" }),
    });

    expect(response.status).toBe(400);
  });
});
