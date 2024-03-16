import { spawn } from "node:child_process";
import puppeteer from "puppeteer";
import type { Page } from "puppeteer";

type Config = {
  scriptRunner: string;
  entrypoint: string;
};

export function start({ scriptRunner, entrypoint }: Config) {
  let proc = spawn(scriptRunner, ["jam", entrypoint], {
    cwd: process.cwd(),
  });

  proc.stdout.on("data", (data) => {
    // TODO: Flush to some kind of buffer
    // Allow users to opt into logging these to the current process also to help debug
  });

  return () => {
    proc.kill();
  };
}

export async function visit(url: URL | string): Promise<{
  page: Page;
  cleanup: () => Promise<void>;
}> {
  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(url.toString());

  return {
    page,
    cleanup: browser.close,
  };
}
