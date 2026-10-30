import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const base = process.env.QA_URL || "http://127.0.0.1:3000";
const output = path.join(process.cwd(), "artifacts");
await mkdir(output, { recursive: true });
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
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  acceptDownloads: true,
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const report = {
  routes: [],
  responsive: [],
  accessibility: [],
  flows: [],
  downloads: [],
};
const routes = [
  "/",
  "/academia",
  "/academia/barberia-profesional",
  "/academia/unas-acrilicas",
  "/academia/rizos-permanentes",
  "/academia/alisado-organico",
  "/academia/mechas-platinadas",
  "/seminarios",
  "/salon",
  "/nosotros",
  "/contacto",
  "/privacidad",
  "/admin",
  "/admin/cursos",
  "/admin/cursos/unas-acrilicas",
  "/admin/seminarios",
  "/admin/servicios",
  "/admin/prematriculas",
  "/admin/configuracion",
  "/admin/publicaciones",
];
async function go(route) {
  const response = await page.goto(base + route, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200, route);
  await page.evaluate(() => document.fonts.ready);
}
try {
  for (const route of routes) {
    await go(route);
    assert.equal(await page.locator("h1").count(), 1, `${route} has one H1`);
    report.routes.push({ route, status: 200, title: await page.title() });
  }
  for (const dimensions of [
    { width: 375, height: 812 },
    { width: 390, height: 844 },
    { width: 430, height: 932 },
    { width: 768, height: 1024 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(dimensions);
    for (const route of [
      "/",
      "/academia",
      "/academia/unas-acrilicas",
      "/contacto",
      "/salon",
      "/admin/publicaciones",
    ]) {
      await go(route);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      );
      assert.equal(overflow, false, `${route} overflow at ${dimensions.width}`);
      report.responsive.push({ route, ...dimensions, overflow });
    }
    await go("/");
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.forEach((img) => (img.loading = "eager")),
      );
    await page.waitForFunction(() =>
      Array.from(document.images).every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    );
    await page.screenshot({
      path: path.join(output, `home-${dimensions.width}.png`),
      fullPage: true,
    });
  }
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const route of routes) {
    await go(route);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    report.accessibility.push({
      route,
      violations: results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
  }
  await go("/academia");
  await page.getByRole("button", { name: "Uñas", exact: true }).click();
  assert.equal(await page.locator(".course-card").count(), 1);
  await page.getByRole("button", { name: "Todos", exact: true }).click();
  await page.getByPlaceholder("Buscá tu especialidad").fill("xyz-no-existe");
  await page
    .getByRole("heading", { name: "No encontramos ese programa." })
    .waitFor();
  report.flows.push("Catalog filters and empty state");
  await go("/contacto");
  await page.getByRole("button", { name: "Preparar mi solicitud" }).click();
  await page.getByText("Escribí tu nombre completo.").waitFor();
  await page.getByLabel("Nombre completo").fill("Prueba QA Local");
  await page.getByLabel("WhatsApp", { exact: false }).first().fill("87437145");
  await page.getByLabel("Ciudad donde vivís").fill("Masaya");
  await page.getByLabel("Programa de interés").selectOption("unas-acrilicas");
  await page.getByLabel("Tu nivel actual").selectOption("Estoy comenzando");
  await page.getByLabel("Horario que preferís").selectOption("Fin de semana");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preparar mi solicitud" }).click();
  await page.getByRole("heading", { name: "Un paso más, Prueba." }).waitFor();
  const href = await page
    .getByRole("link", { name: "Enviar por WhatsApp" })
    .getAttribute("href");
  assert.ok(href.startsWith("https://wa.me/50587437145?text="));
  assert.ok(decodeURIComponent(href).includes("Prueba QA Local"));
  assert.ok(decodeURIComponent(href).includes("Uñas Acrílicas"));
  report.flows.push("Validation, local lead, summary, contextual WhatsApp");
  await go("/admin/prematriculas");
  await page.getByText("Prueba QA Local", { exact: true }).waitFor();
  await page
    .getByLabel("Estado de solicitud de Prueba QA Local")
    .selectOption("Contactado");
  const csvEvent = page.waitForEvent("download");
  await page.getByRole("button", { name: "Exportar CSV" }).click();
  const csv = await csvEvent;
  await csv.saveAs(path.join(output, "leads.csv"));
  assert.ok(
    (await readFile(path.join(output, "leads.csv"), "utf8")).includes(
      "Prueba QA Local",
    ),
  );
  report.flows.push("Admin lead status and CSV export");
  await go("/seminarios");
  await page.getByLabel("Nombre completo").fill("Prueba Seminario");
  await page
    .getByLabel("WhatsApp", { exact: false })
    .first()
    .fill("+505 8743 7145");
  await page.getByLabel("Tu ciudad").fill("León");
  await page.getByLabel("Tema de interés").selectOption("rizos-permanentes");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preparar solicitud" }).click();
  await page
    .getByRole("heading", { name: "Tu interés está anotado." })
    .waitFor();
  await go("/admin/seminarios");
  await page.getByText("Prueba Seminario", { exact: true }).waitFor();
  report.flows.push("Seminar interest form and admin list");
  await go("/salon");
  await page.getByRole("button", { name: "02 Uñas" }).click();
  const salonHref = await page
    .getByRole("link", { name: "Consultar disponibilidad" })
    .getAttribute("href");
  assert.ok(decodeURIComponent(salonHref).includes("uñas"));
  report.flows.push("Salon selection and contextual WhatsApp");
  await go("/admin/cursos");
  const nails = page
    .locator(".admin-course-card")
    .filter({
      has: page.getByRole("heading", { name: "Uñas Acrílicas", exact: true }),
    });
  await nails.getByLabel("Próxima fecha").fill("Fecha QA de prueba");
  await nails.getByRole("button", { name: "Guardar en demo" }).click();
  await nails.getByRole("link", { name: "Crear publicación" }).click();
  await page.getByLabel("Título", { exact: true }).waitFor();
  assert.equal(
    await page.getByLabel("Título", { exact: true }).inputValue(),
    "Uñas Acrílicas",
  );
  assert.equal(
    await page.getByLabel("Fecha", { exact: true }).inputValue(),
    "Fecha QA de prueba",
  );
  report.flows.push("Course to publication prefill with saved draft data");
  for (const [id, name] of [
    ["editorial", "Academia Editorial"],
    ["seminar", "Seminario Profesional"],
    ["salon", "Salón"],
    ["enrollment", "Inscripciones"],
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    for (const [format, label, height] of [
      ["square", "Cuadrado", 1080],
      ["portrait", "Vertical", 1350],
      ["story", "Story", 1920],
    ]) {
      await page.getByRole("button", { name: new RegExp(`^${label}`) }).click();
      await page
        .getByRole("button", { name: "Descargar PNG" })
        .waitFor({ state: "visible" });
      await page.waitForFunction(
        () => !document.querySelector(".generator-download").disabled,
      );
      const downloadEvent = page.waitForEvent("download");
      await page.getByRole("button", { name: "Descargar PNG" }).click();
      const download = await downloadEvent;
      const file = path.join(output, `${id}-${format}.png`);
      await download.saveAs(file);
      const data = await readFile(file);
      assert.equal(data.subarray(1, 4).toString(), "PNG");
      assert.equal(data.readUInt32BE(16), 1080);
      assert.equal(data.readUInt32BE(20), height);
      report.downloads.push({
        template: id,
        format,
        width: 1080,
        height,
        bytes: data.length,
      });
    }
  }
  await page.getByRole("button", { name: "Guardar borrador" }).click();
  await page
    .getByText("Borrador guardado en este navegador.", { exact: true })
    .waitFor();
  await page.reload({ waitUntil: "networkidle" });
  assert.ok(await page.locator(".draft-item").count());
  report.flows.push("12 template-format PNG exports and persistent draft");
  await page
    .getByRole("button", { name: "Academia Editorial", exact: true })
    .click();
  await page.getByRole("button", { name: /^Vertical/ }).click();
  await page
    .locator('input[type="file"]')
    .setInputFiles(path.join(output, "editorial-square.png"));
  await page.waitForFunction(
    () => !document.querySelector(".generator-download").disabled,
  );
  await page.getByLabel("Zoom", { exact: true }).fill("1.5");
  await page.getByLabel("Posición horizontal").fill("35");
  await page.getByLabel("Posición vertical").fill("-25");
  await page.waitForFunction(
    () => !document.querySelector(".generator-download").disabled,
  );
  await page.screenshot({
    path: path.join(output, "generator-desktop.png"),
    fullPage: true,
  });
  report.flows.push("Upload, crop, zoom and position");
  await page.setViewportSize({ width: 390, height: 844 });
  await go("/");
  await page.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("navigation", { name: "Navegación móvil" }).waitFor();
  await page.keyboard.press("Escape");
  assert.equal(
    await page.getByRole("navigation", { name: "Navegación móvil" }).count(),
    0,
  );
  report.flows.push("Mobile menu and Escape key");
  for (const route of ["/robots.txt", "/sitemap.xml", "/opengraph-image"]) {
    const response = await context.request.get(base + route);
    assert.equal(response.status(), 200, route);
  }
  await go("/contacto");
  const meta = await page.evaluate(() => ({
    lang: document.documentElement.lang,
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    structured: JSON.parse(
      document.querySelector('script[type="application/ld+json"]').textContent,
    ),
  }));
  assert.equal(meta.lang, "es-NI");
  assert.ok(meta.canonical.endsWith("/contacto"));
  assert.equal(meta.structured.address.addressLocality, "Masaya");
  report.flows.push("Metadata, JSON-LD, sitemap, robots and Open Graph image");
  const violations = report.accessibility.flatMap((v) => v.violations);
  assert.equal(errors.length, 0, `Browser errors: ${errors.join(" | ")}`);
  await page.evaluate(() => {
    for (const key of Object.keys(localStorage))
      if (key.startsWith("ba:")) localStorage.removeItem(key);
  });
  await writeFile(
    path.join(output, "qa-report.json"),
    JSON.stringify({ ...report, pageErrors: errors }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        routes: report.routes.length,
        responsiveChecks: report.responsive.length,
        accessibilityViolations: violations.length,
        flows: report.flows,
        downloads: report.downloads.length,
        pageErrors: errors,
      },
      null,
      2,
    ),
  );
  assert.equal(
    violations.length,
    0,
    "Accessibility violations; inspect artifacts/qa-report.json",
  );
} catch (error) {
  await writeFile(
    path.join(output, "qa-report.json"),
    JSON.stringify(
      { ...report, pageErrors: errors, error: String(error) },
      null,
      2,
    ),
  );
  await page.screenshot({
    path: path.join(output, "failure.png"),
    fullPage: true,
  });
  throw error;
} finally {
  await browser.close();
}
