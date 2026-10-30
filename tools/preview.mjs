import { chromium } from "@playwright/test";
import { access, mkdir } from "node:fs/promises";
let executablePath = process.env.BROWSER_PATH;
if (!executablePath)
  for (const candidate of [
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  ]) {
    try {
      await access(candidate);
      executablePath = candidate;
      break;
    } catch {}
  }
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const base = process.env.QA_URL || "http://127.0.0.1:3000";
await mkdir("artifacts", { recursive: true });
await page.goto(base, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "artifacts/preview-desktop.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: "artifacts/preview-mobile.png" });
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(base + "/admin/publicaciones?curso=unas-acrilicas", {
  waitUntil: "networkidle",
});
await page.waitForFunction(
  () =>
    document.querySelector(".generator-download") &&
    !document.querySelector(".generator-download").disabled,
  {},
  { timeout: 30000 },
);
await page.screenshot({
  path: "artifacts/preview-generator.png",
  fullPage: true,
});
const downloadEvent = page.waitForEvent("download");
await page.getByRole("button", { name: "Descargar PNG" }).click();
const download = await downloadEvent;
await download.saveAs("artifacts/publicacion-ejemplo.png");
await browser.close();
console.log("Clean preview captures saved in artifacts.");
