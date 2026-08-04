/**
 * Dijalankan sebelum `next build` di Vercel.
 * Kalau folder `app` tidak ketemu, script ini mencetak isi direktori
 * supaya ketahuan Vercel sedang build dari folder yang mana.
 */
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

const cwd = process.cwd();
const hasApp = existsSync(resolve(cwd, "app"));
const hasPages = existsSync(resolve(cwd, "pages"));

if (hasApp || hasPages) {
  console.log(`[verify-root] OK — build dari: ${cwd}`);
  process.exit(0);
}

console.error("\n[verify-root] GAGAL: folder `app` maupun `pages` tidak ada.\n");
console.error(`  Direktori build saat ini : ${cwd}`);
console.error("  Isi direktori ini        :");
for (const entry of readdirSync(cwd, { withFileTypes: true })) {
  console.error(`    ${entry.isDirectory() ? "[dir] " : "      "}${entry.name}`);
}
console.error(
  "\n  Artinya Root Directory di Vercel menunjuk ke folder yang salah." +
    "\n  Buka Settings > General > Root Directory, lalu arahkan ke folder" +
    "\n  yang berisi package.json dan app/.\n"
);
process.exit(1);
