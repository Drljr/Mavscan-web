const fs = require("fs/promises");
const path = require("path");

const MAX_SIZE_BYTES = 200 * 1024;
const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif"];
/** Prefer originals over already-optimized outputs when both exist (e.g. lionel.jpg + lionel.avif). */
const SOURCE_PRIORITY = { ".png": 0, ".jpg": 1, ".jpeg": 1, ".webp": 2, ".avif": 3 };
const DERIVED_EXTENSIONS = new Set([".avif", ".webp"]);
const ORIGINAL_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);
const FORCE_CONVERT_PUBLIC_PATHS = ["asset/about/team/"];
const SOURCE_DIRS = ["app", "components", "lib", "public", "content", "src"];
const TEXT_EXTENSIONS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".md",
  ".mdx",
  ".html",
  ".css",
  ".scss",
  ".sass",
  ".json",
]);

function loadSharp() {
  try {
    return require("sharp");
  } catch (err) {
    console.warn(
      "[optimize-images] sharp could not be loaded; skipping optimization.",
      err && err.message ? `— ${err.message}` : ""
    );
    return null;
  }
}

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function getOptimizedBuffer(sharp, inputBuffer, format) {
  const qualities = [80, 70, 60, 50, 40, 35];
  let bestCandidate = null;

  for (const quality of qualities) {
    const buffer = await sharp(inputBuffer).toFormat(format, { quality }).toBuffer();
    if (buffer.length <= MAX_SIZE_BYTES) {
      if (!bestCandidate || buffer.length > bestCandidate.buffer.length) {
        bestCandidate = { buffer, quality };
      }
    }
  }

  if (bestCandidate) return bestCandidate.buffer;
  return sharp(inputBuffer)
    .toFormat(format, { quality: qualities[qualities.length - 1] })
    .toBuffer();
}

async function* walkProjectTextFiles(projectRoot) {
  for (const sourceDir of SOURCE_DIRS) {
    const root = path.join(projectRoot, sourceDir);
    try {
      const stat = await fs.stat(root);
      if (!stat.isDirectory()) continue;
    } catch {
      continue;
    }

    for await (const filePath of walk(root)) {
      const ext = path.extname(filePath).toLowerCase();
      if (TEXT_EXTENSIONS.has(ext)) yield filePath;
    }
  }
}

async function updateReferencesAndDeleteOriginal(filePath, publicDir, projectRoot, preferredExt = "avif") {
  const ext = path.extname(filePath).toLowerCase();
  const relativeFromPublic = path.relative(publicDir, filePath);
  const baseName = path.basename(filePath, ext);
  const dirPart = path.dirname(relativeFromPublic);

  const relativeUrlPath = relativeFromPublic.split(path.sep).join("/");
  const originalUrlWithSlash = `/${relativeUrlPath}`;
  const originalUrlNoSlash = relativeUrlPath;

  const newRelativeUrlPath = path.posix.join(
    dirPart.split(path.sep).join("/"),
    `${baseName}.${preferredExt}`
  );
  const newUrlWithSlash = `/${newRelativeUrlPath}`;
  const newUrlNoSlash = newRelativeUrlPath;

  let anyReplaced = false;

  for await (const codeFile of walkProjectTextFiles(projectRoot)) {
    let content;
    try {
      content = await fs.readFile(codeFile, "utf8");
    } catch {
      continue;
    }

    let updated = content;
    const patterns = [
      [originalUrlWithSlash, newUrlWithSlash],
      [originalUrlNoSlash, newUrlNoSlash],
    ];

    for (const [from, to] of patterns) {
      if (from && from !== to && updated.includes(from)) {
        updated = updated.split(from).join(to);
      }
    }

    if (updated !== content) {
      await fs.writeFile(codeFile, updated, "utf8");
      anyReplaced = true;
    }
  }

  // Re-check after replacements to decide deletion safely.
  let hasRemainingReferences = false;
  for await (const codeFile of walkProjectTextFiles(projectRoot)) {
    let content;
    try {
      content = await fs.readFile(codeFile, "utf8");
    } catch {
      continue;
    }
    if (content.includes(originalUrlWithSlash) || content.includes(originalUrlNoSlash)) {
      hasRemainingReferences = true;
      break;
    }
  }

  if (anyReplaced || !hasRemainingReferences) {
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn(`Failed to delete original image ${filePath}:`, err);
    }
  }
}

async function collectImagesToOptimize(publicDir) {
  const candidates = [];
  for await (const filePath of walk(publicDir)) {
    if (filePath.toLowerCase().endsWith(".svg")) continue;
    const ext = path.extname(filePath).toLowerCase();
    if (!SUPPORTED_EXTENSIONS.includes(ext)) continue;
    candidates.push(filePath);
  }

  const byBaseKey = new Map();
  for (const filePath of candidates) {
    const dir = path.dirname(filePath);
    const baseName = path.basename(filePath, path.extname(filePath));
    const key = `${dir}${path.sep}${baseName}`;
    if (!byBaseKey.has(key)) byBaseKey.set(key, []);
    byBaseKey.get(key).push(filePath);
  }

  const toProcess = [];
  for (const group of byBaseKey.values()) {
    const hasOriginal = group.some((filePath) =>
      ORIGINAL_EXTENSIONS.has(path.extname(filePath).toLowerCase())
    );
    if (!hasOriginal) continue;

    const bestSource = group.reduce((best, filePath) => {
      const priority = SOURCE_PRIORITY[path.extname(filePath).toLowerCase()] ?? 99;
      const bestPriority = SOURCE_PRIORITY[path.extname(best).toLowerCase()] ?? 99;
      return priority < bestPriority ? filePath : best;
    });

    for (const filePath of group) {
      if (filePath === bestSource) continue;
      const ext = path.extname(filePath).toLowerCase();
      if (DERIVED_EXTENSIONS.has(ext)) {
        try {
          await fs.unlink(filePath);
        } catch {
          // ignore missing files
        }
      }
    }

    toProcess.push(bestSource);
  }

  return toProcess;
}

async function optimizeImage(sharp, filePath, publicDir, projectRoot) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED_EXTENSIONS.includes(ext)) return;

  const stat = await fs.stat(filePath);
  const relativeFromPublic = path.relative(publicDir, filePath).split(path.sep).join("/");
  const isForceConvertPath = FORCE_CONVERT_PUBLIC_PATHS.some((segment) =>
    relativeFromPublic.toLowerCase().includes(segment)
  );
  if (!isForceConvertPath && stat.size <= MAX_SIZE_BYTES) return;

  const inputBuffer = await fs.readFile(filePath);
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const formats = ["avif", "webp"];

  for (const format of formats) {
    const outputPath = path.join(dir, `${baseName}.${format}`);
    const buffer = await getOptimizedBuffer(sharp, inputBuffer, format);
    await fs.writeFile(outputPath, buffer);
  }

  console.log(`[optimize-images] ${relativeFromPublic} -> ${baseName}.avif, ${baseName}.webp`);

  const inputExt = path.extname(filePath).toLowerCase();
  if (ORIGINAL_EXTENSIONS.has(inputExt)) {
    await updateReferencesAndDeleteOriginal(filePath, publicDir, projectRoot, "avif");
  }
}

async function main() {
  const sharp = loadSharp();
  if (!sharp) {
    process.exit(0);
    return;
  }

  const publicDir = path.join(process.cwd(), "public");
  const projectRoot = process.cwd();

  try {
    const stat = await fs.stat(publicDir);
    if (!stat.isDirectory()) {
      console.log(`No public directory found at ${publicDir}, skipping image optimization.`);
      return;
    }
  } catch {
    console.log(`No public directory found at ${publicDir}, skipping image optimization.`);
    return;
  }

  const imagesToOptimize = await collectImagesToOptimize(publicDir);
  for (const filePath of imagesToOptimize) {
    try {
      await optimizeImage(sharp, filePath, publicDir, projectRoot);
    } catch (err) {
      console.warn(`Failed to optimize image ${filePath}:`, err);
    }
  }
}

main().catch((err) => {
  console.error("Image optimization failed:", err);
  process.exit(1);
});
