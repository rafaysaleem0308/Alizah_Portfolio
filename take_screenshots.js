import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const distDir = path.resolve("dist");
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.join(distDir, urlPath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(54321, "127.0.0.1", () => {
  console.log("Server listening on 127.0.0.1:54321");

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const outDir = path.resolve("screenshots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const viewports = [
    { name: "mobile_360x800", w: 360, h: 800 },
    { name: "mobile_390x844", w: 390, h: 844 },
    { name: "tablet_768x1024", w: 768, h: 1024 },
    { name: "desktop_1280x800", w: 1280, h: 800 },
    { name: "desktop_1440x900", w: 1440, h: 900 },
  ];

  const sections = [
    "hero",
    "about",
    "experience",
    "clinical-expertise",
    "food-safety",
    "from-the-kitchen",
    "education",
    "achievements-training",
    "contact",
  ];

  try {
    for (const vp of viewports) {
      console.log(`Taking screenshot for ${vp.name}...`);
      for (const sec of sections) {
        const outName = `${vp.name}_${sec}.png`;
        const outPath = path.join(outDir, outName);
        const url = `http://127.0.0.1:54321/?nopreload#${sec}`;

        execFileSync(
          chromePath,
          [
            "--headless=new",
            "--disable-gpu",
            `--window-size=${vp.w},${vp.h}`,
            `--screenshot=${outPath}`,
            "--virtual-time-budget=2000",
            url,
          ],
          { timeout: 15000 }
        );

        const stats = fs.statSync(outPath);
        console.log(`  Saved ${outName} (${stats.size} bytes)`);
      }
    }
    console.log("All screenshots taken successfully!");
  } catch (err) {
    console.error("Error during screenshot:", err);
  } finally {
    server.close();
  }
});
