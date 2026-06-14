import { rest } from "msw";

export const handlers = [
  rest.get("/api/audio/:filename", (req, res, ctx) => {
    const { filename } = req.params;
    return res(
      ctx.status(200),
      ctx.set("Content-Type", "audio/mpeg"),
      ctx.body(`mock-audio-${filename}`),
    );
  }),
];
