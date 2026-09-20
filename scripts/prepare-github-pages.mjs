import { access, rename, rm } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("dist/client");
const nestedProjectDirectory = path.join(outputDirectory, "ZhadanAndCompany");
const nestedAssets = path.join(nestedProjectDirectory, "_next");
const publicAssets = path.join(outputDirectory, "_next");

try {
  await access(nestedAssets);
} catch {
  throw new Error(`Expected GitHub Pages assets were not found at ${nestedAssets}`);
}

await rm(publicAssets, { recursive: true, force: true });
await rename(nestedAssets, publicAssets);
await rm(nestedProjectDirectory, { recursive: true, force: true });

console.log("GitHub Pages assets prepared in dist/client/_next");
