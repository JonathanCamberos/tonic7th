/*
  README: MSW server initialization for Node test environments.

  This file creates the testing server that uses the request handlers.
  It is imported by `src/setupTests.ts`.
*/

import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);

/*
  FUTURE OPTIMIZATION:
  - Add conditional setup for browser-based test environments if needed.
*/
