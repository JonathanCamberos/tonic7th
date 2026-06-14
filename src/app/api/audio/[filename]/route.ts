/*
  README: Audio media API route.

  This server-side endpoint serves audio files from local lesson content.
  It is part of the backend API layer in `src/app/api/`.
  The frontend requests this route for playback without exposing raw file paths.
*/

import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const mimeTypes: Record<string, string> = {
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".ogg": "audio/ogg",
};

export async function GET(_request: Request, context: { params: Promise<{ filename: string }> }) {
  const { filename } = await context.params;
  const ext = path.extname(filename).toLowerCase();
  const contentType = mimeTypes[ext];

  if (!contentType) {
    return NextResponse.json({ error: "Unsupported audio format." }, { status: 400 });
  }

  const audioPath = path.join(process.cwd(), "content", "lessons", "testing", filename);
  if (!fs.existsSync(audioPath)) {
    return NextResponse.json({ error: "Audio file not found." }, { status: 404 });
  }

  const fileBuffer = await fs.promises.readFile(audioPath);
  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=59",
    },
  });
}

/*
  FUTURE OPTIMIZATION:
  - Validate the filename against an allowlist instead of only checking extension.
  - Move content path configuration into a shared helper for reuse.
  - Add instrumentation or logging for 404/400 events in production.
*/
