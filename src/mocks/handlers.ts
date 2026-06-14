/*
  README: MSW request handlers for tests.

  These handlers intercept browser or server-side network calls during tests.
  The audio route is mocked so tests do not depend on actual files.
*/

import { http } from "msw";

export const handlers = [
  http.get("/api/audio/:filename", ({ params }) => {
    const filename = String(params.filename);
    return new Response(`mock-audio-${filename}`, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  }),
];

/*
  FUTURE OPTIMIZATION:
  - Add more handlers for additional API routes as the app grows.
  - Return realistic binary blobs for audio integration tests if needed.
*/
