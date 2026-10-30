export type TemplateId = "editorial" | "seminar" | "salon" | "enrollment";
export type PostFormat = "square" | "portrait" | "story";
export type PostContent = {
  type: string;
  title: string;
  subtitle: string;
  date: string;
  city: string;
  price: string;
  whatsapp: string;
  cta: string;
};
export type Crop = { zoom: number; x: number; y: number };
export const postFormats = [
  { id: "square" as const, name: "Cuadrado", width: 1080, height: 1080 },
  { id: "portrait" as const, name: "Vertical", width: 1080, height: 1350 },
  { id: "story" as const, name: "Story", width: 1080, height: 1920 },
];
export const postTemplates = [
  { id: "editorial" as const, name: "Academia Editorial", color: "#FAF7F3" },
  { id: "seminar" as const, name: "Seminario Profesional", color: "#211B1E" },
  { id: "salon" as const, name: "Salón", color: "#F0DDE4" },
  { id: "enrollment" as const, name: "Inscripciones", color: "#B54770" },
];
const palette = {
  ivory: "#FAF7F3",
  plum: "#211B1E",
  rose: "#B54770",
  blush: "#F0DDE4",
  gold: "#C3A06D",
  muted: "#756A75",
};

function linesFor(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words: string[] = [];
  for (const word of text.trim().split(/\s+/)) {
    if (ctx.measureText(word).width <= maxWidth) words.push(word);
    else {
      let part = "";
      for (const char of word) {
        if (part && ctx.measureText(part + char).width > maxWidth) {
          words.push(part);
          part = char;
        } else part += char;
      }
      if (part) words.push(part);
    }
  }
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(candidate).width > maxWidth) {
      lines.push(current);
      current = word;
    } else current = candidate;
  }
  if (current) lines.push(current);
  return lines;
}
function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  maxHeight: number,
  font: string,
  size: number,
  color: string,
  weight = "400",
) {
  let fontSize = size;
  let lines: string[];
  do {
    ctx.font = `${weight} ${fontSize}px ${font}`;
    lines = linesFor(ctx, text, maxWidth);
    if (lines.length * fontSize * 1.05 <= maxHeight) break;
    fontSize -= 2;
  } while (fontSize > 24);
  ctx.fillStyle = color;
  ctx.textBaseline = "top";
  const maxLines = Math.max(1, Math.floor(maxHeight / (fontSize * 1.05)));
  lines.slice(0, maxLines).forEach((line, index) => {
    if (index === maxLines - 1 && lines.length > maxLines) {
      while (ctx.measureText(`${line}…`).width > maxWidth)
        line = line.slice(0, -1);
      line += "…";
    }
    ctx.fillText(line, x, y + index * fontSize * 1.05);
  });
  return Math.min(lines.length, maxLines) * fontSize * 1.05;
}
function photo(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  crop: Crop,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale =
    Math.max(width / image.naturalWidth, height / image.naturalHeight) *
    Math.max(1, Math.min(3, crop.zoom));
  const dw = image.naturalWidth * scale,
    dh = image.naturalHeight * scale;
  const dx =
    x +
    (width - dw) / 2 +
    ((dw - width) / 2) * Math.max(-1, Math.min(1, crop.x / 100));
  const dy =
    y +
    (height - dh) / 2 +
    ((dh - height) / 2) * Math.max(-1, Math.min(1, crop.y / 100));
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.clip();
  ctx.drawImage(image, dx, dy, dw, dh);
  ctx.restore();
}
export function renderPost(
  canvas: HTMLCanvasElement,
  content: PostContent,
  image: HTMLImageElement,
  template: TemplateId,
  format: PostFormat,
  crop: Crop,
  fonts: { display: string; interface: string },
) {
  const dimensions = postFormats.find((f) => f.id === format)!;
  canvas.width = dimensions.width;
  canvas.height = dimensions.height;
  const ctx = canvas.getContext("2d");
  if (!ctx)
    throw new Error("Este navegador no permite generar la publicación.");
  const W = canvas.width,
    H = canvas.height,
    m = 58;
  const dark = template === "seminar" || template === "enrollment";
  ctx.fillStyle = dark
    ? palette.plum
    : template === "salon"
      ? palette.blush
      : palette.ivory;
  ctx.fillRect(0, 0, W, H);
  const light = dark ? palette.ivory : palette.plum;
  ctx.font = `500 33px ${fonts.display}`;
  ctx.fillStyle = light;
  ctx.textBaseline = "top";
  ctx.fillText("Belleza & Armonía", m, 43);
  ctx.font = `600 13px ${fonts.interface}`;
  ctx.fillText("SALÓN & ACADEMIA", m, 84);
  ctx.strokeStyle = dark ? "#756A75" : "#cdbcc4";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(m, 119);
  ctx.lineTo(W - m, 119);
  ctx.stroke();
  const meta = [
    content.date,
    content.city,
    content.price ? `Inversión: ${content.price}` : "",
  ]
    .filter(Boolean)
    .join("  ·  ");
  let titleY: number,
    titleWidth: number,
    titleX = m,
    subtitleY: number;
  if (template === "seminar") {
    const px = 515,
      py = 164,
      pw = W - px - m,
      ph = H - 392;
    photo(ctx, image, crop, px, py, pw, ph);
    const gradient = ctx.createLinearGradient(px, 0, px + 210, 0);
    gradient.addColorStop(0, palette.plum);
    gradient.addColorStop(1, "#211B1E00");
    ctx.fillStyle = gradient;
    ctx.fillRect(px, py, 210, ph);
    ctx.strokeStyle = palette.gold;
    ctx.strokeRect(m, 144, W - 2 * m, H - 344);
    drawText(
      ctx,
      content.type.toUpperCase(),
      m + 24,
      186,
      650,
      42,
      fonts.interface,
      20,
      palette.gold,
      "600",
    );
    titleY = H * 0.3;
    titleX = m + 24;
    titleWidth = 410;
    const used = drawText(
      ctx,
      content.title,
      titleX,
      titleY,
      titleWidth,
      Math.min(400, H * 0.27),
      fonts.display,
      format === "story" ? 104 : 89,
      light,
    );
    subtitleY = titleY + used + 26;
    drawText(
      ctx,
      content.subtitle,
      titleX,
      subtitleY,
      400,
      145,
      fonts.interface,
      27,
      palette.blush,
    );
  } else if (template === "salon") {
    const py = 145,
      ph = H * 0.59;
    photo(ctx, image, crop, m, py, W - 2 * m, ph);
    const panelY = H * 0.6;
    ctx.fillStyle = palette.blush;
    ctx.fillRect(m + 28, panelY, W - 2 * m - 56, H - panelY - 180);
    titleX = m + 56;
    titleWidth = W - 2 * m - 112;
    drawText(
      ctx,
      content.type.toUpperCase(),
      titleX,
      panelY + 28,
      titleWidth,
      35,
      fonts.interface,
      18,
      palette.rose,
      "600",
    );
    titleY = panelY + 78;
    const used = drawText(
      ctx,
      content.title,
      titleX,
      titleY,
      titleWidth,
      Math.max(105, H * 0.17),
      fonts.display,
      format === "story" ? 102 : 78,
      palette.plum,
    );
    subtitleY = titleY + used + 15;
    drawText(
      ctx,
      content.subtitle,
      titleX,
      subtitleY,
      titleWidth,
      Math.max(35, H - 205 - subtitleY),
      fonts.interface,
      24,
      palette.muted,
    );
  } else {
    const py = 155,
      ph = H * (format === "story" ? 0.49 : 0.39);
    photo(ctx, image, crop, m, py, W - 2 * m, ph);
    if (template === "enrollment") {
      ctx.fillStyle = palette.rose;
      ctx.fillRect(m, py + ph - 70, W - 2 * m, 70);
      drawText(
        ctx,
        content.type.toUpperCase(),
        m + 24,
        py + ph - 50,
        W - 2 * m - 48,
        42,
        fonts.interface,
        23,
        "#FFFFFF",
        "700",
      );
    } else
      drawText(
        ctx,
        content.type.toUpperCase(),
        m,
        py + ph + 29,
        W - 2 * m,
        30,
        fonts.interface,
        19,
        palette.rose,
        "700",
      );
    titleY = py + ph + (template === "enrollment" ? 29 : 72);
    titleWidth = W - 2 * m;
    const available = H - 220 - titleY;
    const used = drawText(
      ctx,
      content.title,
      titleX,
      titleY,
      titleWidth,
      Math.max(80, available - 74),
      fonts.display,
      format === "story" ? 112 : 83,
      light,
    );
    subtitleY = titleY + used + 18;
    drawText(
      ctx,
      content.subtitle,
      m,
      subtitleY,
      titleWidth,
      Math.max(32, H - 192 - subtitleY),
      fonts.interface,
      26,
      dark ? palette.blush : palette.muted,
    );
  }
  ctx.fillStyle = dark
    ? palette.plum
    : template === "salon"
      ? palette.blush
      : palette.ivory;
  ctx.fillRect(m, H - 165, W - 2 * m, 90);
  drawText(
    ctx,
    meta,
    m,
    H - 158,
    W - 2 * m,
    65,
    fonts.interface,
    24,
    dark ? palette.gold : palette.muted,
    "500",
  );
  ctx.fillStyle = template === "salon" ? palette.plum : palette.rose;
  ctx.fillRect(0, H - 90, W, 90);
  drawText(
    ctx,
    content.cta || "Solicitá información",
    m,
    H - 65,
    580,
    43,
    fonts.interface,
    25,
    "#FFFFFF",
    "600",
  );
  const number = content.whatsapp.replace(/[^\d+\s-]/g, "");
  ctx.font = `500 25px ${fonts.interface}`;
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "top";
  ctx.textAlign = "right";
  ctx.fillText(number, W - m, H - 65);
  ctx.textAlign = "left";
}
