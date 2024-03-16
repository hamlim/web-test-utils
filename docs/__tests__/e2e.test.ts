import { afterAll, beforeAll, expect, it, test } from "@jest/globals";
import { start, visit } from "./web-test-utils";

let cleanup: Function;
beforeAll(() => {
  cleanup = start({
    scriptRunner: "bun",
    entrypoint: "dev",
  });
});

afterAll(() => {
  if (typeof cleanup === "function") {
    cleanup();
  }
});

test("it works", async () => {
  let { page, cleanup } = await visit("http://127.0.0.1:3000");

  let element = await page.waitForSelector("a[href='https://nextjs.org/docs']");
  expect(element).toBeTruthy();

  await cleanup();
});
