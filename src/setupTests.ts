/*
  README: Global test setup for Vitest.

  This file configures the test environment before any test files run.
  It starts the Mock Service Worker server so API requests can be mocked.
*/

import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "./mocks/server";

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

/*
  FUTURE OPTIMIZATION:
  - Add a test setup hook for global mocks or feature flags.
  - Use a custom logger during tests for easier debugging.
*/
