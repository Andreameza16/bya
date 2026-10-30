import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
const root = process.cwd();
const wrap = (background, content, w = 800, h = 900) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".09"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter><linearGradient id="rose" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#211B1E"/><stop offset=".48" stop-color="#713a50"/><stop offset="1" stop-color="#B54770"/></linearGradient><linearGradient id="cream" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#F0DDE4"/><stop offset=".45" stop-color="#C3A06D"/><stop offset="1" stop-color="#756A75"/></linearGradient><linearGradient id="light"><stop stop-color="#FAF7F3"/><stop offset="1" stop-color="#cfaabb"/></linearGradient></defs><rect width="${w}" height="${h}" fill="${background}"/>${content}<rect width="${w}" height="${h}" fill="transparent" filter="url(#grain)"/></svg>`;
const wave = (n, color, offset = 0) =>
  Array.from({ length: n }, (_, i) => {
    const x = 160 + i * 8 + offset;
    return `<path d="M${x} 105 C${x - 155} 275 ${x + 250} 395 ${x + 65} 600 C${x - 65} 750 ${x + 190} 820 ${x + 145} 960" fill="none" stroke="${color}" stroke-width="${2 + (i % 3)}" opacity="${0.2 + (i / n) * 0.55}"/>`;
  }).join("");
const hero = `<circle cx="570" cy="260" r="240" fill="#e7c8d4"/><ellipse cx="428" cy="845" rx="245" ry="24" fill="#211B1E" opacity=".12"/><path d="M180 805 C170 697 283 647 317 610 L331 506 C266 454 241 341 265 261 C286 160 359 125 462 143 C570 158 620 254 586 350 C572 390 540 421 548 454 L560 487 L535 504 C523 574 470 598 430 573 L435 642 C511 677 602 720 617 805Z" fill="url(#cream)"/><path d="M303 551 C191 442 195 272 265 202 C356 111 500 119 573 188 C677 297 518 437 589 622 C652 784 483 866 342 788 C434 690 210 657 303 551Z" fill="url(#rose)"/>${wave(37, "#d2acbb", 15)}<path d="M422 161 C328 294 548 346 436 490 C364 579 569 674 477 788" fill="none" stroke="#F0DDE4" stroke-width="3" opacity=".45"/><path d="M538 384 Q556 389 572 381" fill="none" stroke="#754657" stroke-width="2"/><circle cx="537" cy="526" r="6" fill="#C3A06D"/><path d="M518 488 Q538 492 548 484" fill="none" stroke="#9d365d" stroke-width="2"/><rect x="34" y="91" width="730" height="720" rx="300" fill="none" stroke="#211B1E" stroke-opacity=".1"/>`;
const barber = `<rect x="80" y="80" width="640" height="710" fill="none" stroke="#c3a06d" stroke-opacity=".3"/><circle cx="400" cy="410" r="240" fill="#4b3b43"/><g transform="translate(280 185) rotate(25 120 280)"><rect x="58" y="52" width="155" height="500" rx="70" fill="url(#cream)"/><rect x="40" y="17" width="190" height="100" rx="18" fill="#FAF7F3"/><rect x="51" y="29" width="168" height="63" fill="#756A75"/>${Array.from({ length: 18 }, (_, i) => `<rect x="${54 + i * 9}" y="5" width="4" height="77" fill="#211B1E"/>`).join("")}<rect x="83" y="164" width="107" height="283" rx="50" fill="#211B1E"/><circle cx="136" cy="384" r="17" fill="#C3A06D"/></g><path d="M145 701 L650 234" stroke="#F0DDE4" stroke-width="4" opacity=".3"/><text x="74" y="834" font-size="120" font-family="Georgia" fill="#FAF7F3" opacity=".09">précision</text>`;
const nails = `<circle cx="355" cy="370" r="268" fill="#e7c3cf"/><ellipse cx="380" cy="780" rx="260" ry="32" fill="#9d365d" opacity=".1"/><g transform="rotate(-16 420 460)">${[0, 1, 2, 3].map((i) => `<rect x="${150 + i * 113}" y="${210 - (i % 2) * 43}" width="98" height="450" rx="49" fill="url(#light)"/><rect x="${160 + i * 113}" y="${205 - (i % 2) * 43}" width="78" height="165" rx="39" fill="${["#9D365D", "#B54770", "#F0DDE4", "#211B1E"][i]}"/><path d="M${174 + i * 113} ${240 - (i % 2) * 43} V${310 - (i % 2) * 43}" stroke="#FAF7F3" stroke-width="3" opacity=".6"/>`).join("")}<path d="M157 550 Q340 473 588 550 V699 Q565 797 392 829 Q220 755 157 550Z" fill="url(#light)"/></g><circle cx="638" cy="142" r="28" fill="none" stroke="#C3A06D" stroke-width="2"/>`;
const curls = `<circle cx="480" cy="382" r="255" fill="#dfc19c"/>${Array.from(
  { length: 18 },
  (_, i) => {
    const x = 70 + i * 36;
    return `<path d="M${x} 80 C${x + 220} 190 ${x - 180} 310 ${x + 35} 415 C${x + 240} 520 ${x - 145} 690 ${x + 70} 860" fill="none" stroke="${i % 3 === 0 ? "#C3A06D" : i % 3 === 1 ? "#211B1E" : "#756A75"}" stroke-width="${14 + (i % 4) * 5}" opacity=".75"/>`;
  },
).join(
  "",
)}<circle cx="123" cy="739" r="58" fill="none" stroke="#FAF7F3" stroke-width="1"/>`;
const smooth = `<circle cx="500" cy="400" r="284" fill="#d1bdc6"/><path d="M215 115 Q490 28 644 232 Q464 467 644 776 Q399 953 167 743 Q313 511 215 115Z" fill="url(#rose)"/>${Array.from(
  { length: 65 },
  (_, i) => {
    const x = 212 + i * 6;
    return `<path d="M${x} 125 C${x + 140} 330 ${x - 110} 520 ${x + 18} 820" fill="none" stroke="${i % 3 === 0 ? "#C3A06D" : "#F0DDE4"}" stroke-width="1.2" opacity="${0.09 + (i % 10) / 60}"/>`;
  },
).join(
  "",
)}<path d="M130 665 Q421 685 706 627" fill="none" stroke="#FAF7F3" stroke-width="1"/>`;
const platinum = `<rect x="95" y="90" width="600" height="720" rx="300" fill="#dad0c8"/>${Array.from(
  { length: 45 },
  (_, i) => {
    const x = 100 + i * 13;
    return `<path d="M${x} -30 C${x + 230} 160 ${x - 190} 470 ${x + 70} 970" fill="none" stroke="${i % 4 === 0 ? "#FAF7F3" : i % 4 === 1 ? "#C3A06D" : i % 4 === 2 ? "#756A75" : "#e9dcc8"}" stroke-width="${8 + (i % 3) * 3}"/>`;
  },
).join(
  "",
)}<rect x="45" y="45" width="710" height="810" fill="none" stroke="#211B1E" stroke-opacity=".1"/>`;
const practice = `<circle cx="420" cy="337" r="280" fill="#3d2e35"/><g transform="rotate(-25 400 430)"><ellipse cx="260" cy="600" rx="75" ry="94" fill="none" stroke="#C3A06D" stroke-width="22"/><ellipse cx="507" cy="600" rx="75" ry="94" fill="none" stroke="#C3A06D" stroke-width="22"/><path d="M300 540 L535 112 L489 424 L343 592Z" fill="url(#cream)"/><path d="M468 542 L233 112 L279 424 L425 592Z" fill="url(#light)"/><circle cx="386" cy="414" r="17" fill="#211B1E" stroke="#C3A06D" stroke-width="5"/></g><path d="M70 120 H740 M70 780 H740" stroke="#C3A06D" stroke-opacity=".3"/>`;
const beauty = `<circle cx="385" cy="399" r="266" fill="#edd2db"/><path d="M272 149 Q558 128 570 333 Q650 467 529 556 Q436 597 420 760 H139 Q175 624 256 559 Q168 442 223 274Z" fill="url(#light)"/><path d="M272 150 Q388 82 513 161 Q623 226 570 333 Q489 296 463 268 Q428 233 375 231 Q315 245 293 315 L263 411 Q233 488 258 560 Q93 463 151 284 Q177 194 272 150Z" fill="url(#rose)"/><path d="M486 356 Q527 327 558 353" fill="none" stroke="#9D365D" stroke-width="4"/><path d="M502 459 Q529 467 553 452" fill="none" stroke="#B54770" stroke-width="3"/><circle cx="409" cy="521" r="25" fill="none" stroke="#C3A06D" stroke-width="4"/><path d="M357 221 C290 303 345 398 260 499" fill="none" stroke="#F0DDE4" stroke-width="2" opacity=".45"/><ellipse cx="438" cy="784" rx="271" ry="20" fill="#9d365d" opacity=".1"/>`;
const files = [
  ["business/hero.svg", "#e9ddd5", hero],
  ["business/practica.svg", "#211B1E", practice],
  ["courses/barberia.svg", "#211B1E", barber],
  ["courses/unas.svg", "#F0DDE4", nails],
  ["courses/rizos.svg", "#e7daca", curls],
  ["courses/alisado.svg", "#e5d8de", smooth],
  ["courses/mechas.svg", "#FAF7F3", platinum],
  ["salon/estetica.svg", "#F0DDE4", beauty],
];
for (const [name, background, content] of files) {
  const target = path.join(root, "public", "images", name);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, wrap(background, content));
}
await mkdir(path.join(root, "public", "images", "instructors"), {
  recursive: true,
});
console.log(
  `${files.length} composiciones originales creadas. No representan personas ni resultados reales.`,
);
