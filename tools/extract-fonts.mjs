import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import path from "node:path";
const out = path.join(process.cwd(), "src/assets/fonts");
await mkdir(out, { recursive: true });
for (const family of ["cormorant-garamond", "manrope"]) {
  const archive = (await readdir(".npm-cache")).find(
    (name) =>
      name.startsWith(`fontsource-variable-${family}-`) &&
      name.endsWith(".tgz"),
  );
  if (!archive) throw new Error(`Missing font package for ${family}`);
  const tar = gunzipSync(await readFile(path.join(".npm-cache", archive)));
  for (let offset = 0; offset + 512 <= tar.length;) {
    const header = tar.subarray(offset, offset + 512);
    const name = header.subarray(0, 100).toString().replace(/\0.*$/, "");
    if (!name) break;
    const size =
      parseInt(
        header.subarray(124, 136).toString().replace(/\0.*$/, "").trim(),
        8,
      ) || 0;
    const data = tar.subarray(offset + 512, offset + 512 + size);
    if (
      name === `package/files/${family}-latin-wght-normal.woff2` ||
      name === `package/files/${family}-latin-wght-italic.woff2`
    )
      await writeFile(path.join(out, path.basename(name)), data);
    if (name === "package/LICENSE")
      await writeFile(path.join(out, `${family}-LICENSE.txt`), data);
    offset += 512 + Math.ceil(size / 512) * 512;
  }
}
console.log("Licensed local font files ready.");
