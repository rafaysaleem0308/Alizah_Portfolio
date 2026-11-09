import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

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
  ".woff": "font/woff",
  ".ttf": "font/ttf",
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

server.listen(0, async () => {
  const port = server.address().port;
  console.log(`Static server running on http://127.0.0.1:${port}`);

  const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const debugPort = 9222;

  const tmpDir = path.resolve(".chrome_tmp");
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

  const chromeProcess = spawn(chromePath, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${tmpDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
  ]);

  // Wait for Chrome remote debugging to be ready
  let wsUrl = null;
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    try {
      const resp = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      const json = await resp.json();
      wsUrl = json.webSocketDebuggerUrl;
      if (wsUrl) break;
    } catch (e) {}
  }

  if (!wsUrl) {
    console.error("Failed to connect to Chrome debugging endpoint");
    chromeProcess.kill();
    server.close();
    process.exit(1);
  }

  console.log("Connected to Chrome via CDP:", wsUrl);

  const ws = new WebSocket(wsUrl);
  let id = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && callbacks.has(data.id)) {
      const cb = callbacks.get(data.id);
      callbacks.delete(data.id);
      if (data.error) cb.reject(data.error);
      else cb.resolve(data.result);
    }
  };

  const send = (method, params = {}) => {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      callbacks.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  };

  await new Promise((r) => (ws.onopen = r));

  // Create output dir
  const outDir = path.resolve("screenshots");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const viewports = [
    { name: "mobile-360x800", width: 360, height: 800 },
    { name: "mobile-390x844", width: 390, height: 844 },
    { name: "tablet-768x1024", width: 768, height: 1024 },
    { name: "desktop-1280x800", width: 1280, height: 800 },
    { name: "desktop-1440x900", width: 1440, height: 900 },
  ];

  const sectionIds = [
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

  await send("Page.enable");
  await send("DOM.enable");

  const results = [];

  for (const vp of viewports) {
    console.log(`\nTesting viewport: ${vp.name} (${vp.width}x${vp.height})`);
    await send("Emulation.setDeviceMetricsOverride", {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.width < 768,
    });

    await send("Page.navigate", { url: `http://127.0.0.1:${port}/?nopreload` });
    await new Promise((r) => setTimeout(r, 1200));

    // Check horizontal overflow
    const evalRes = await send("Runtime.evaluate", {
      expression: `(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasHScroll = docWidth > winWidth;
        
        // Find elements with overflow issues
        const overflowingEls = [];
        document.querySelectorAll('*').forEach(el => {
          if (el.scrollWidth > el.clientWidth && el.clientWidth > 0) {
            const style = window.getComputedStyle(el);
            if (style.overflowX !== 'scroll' && style.overflowX !== 'auto' && style.overflowX !== 'hidden') {
              overflowingEls.push({ tag: el.tagName, class: el.className, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth });
            }
          }
        });

        return { docWidth, winWidth, hasHScroll, overflowingEls: overflowingEls.slice(0, 5) };
      })()`,
      returnByValue: true,
    });

    const metrics = evalRes.result.value;
    console.log(`  Horizontal scroll check: docWidth=${metrics.docWidth}, winWidth=${metrics.winWidth}, hasHScroll=${metrics.hasHScroll}`);
    if (metrics.overflowingEls.length > 0) {
      console.log(`  Elements overflowing:`, metrics.overflowingEls);
    }

    results.push({ viewport: vp.name, ...metrics });

    // Screenshot each section
    for (const secId of sectionIds) {
      // Scroll into view
      await send("Runtime.evaluate", {
        expression: `(() => {
          const el = document.getElementById('${secId}');
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        })()`,
      });
      await new Promise((r) => setTimeout(r, 400));

      const shot = await send("Page.captureScreenshot", { format: "jpeg", quality: 80 });
      const filename = `${vp.name}_${secId}.jpg`;
      fs.writeFileSync(path.join(outDir, filename), Buffer.from(shot.data, "base64"));
    }
    console.log(`  Saved screenshots for all ${sectionIds.length} sections at ${vp.name}`);
  }

  // Also query computed font sizes for verification table
  const computedSizes = await send("Runtime.evaluate", {
    expression: `(() => {
      const getSizes = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return { fontSize: style.fontSize, lineHeight: style.lineHeight, fontWeight: style.fontWeight };
      };

      return {
        heroHeadline: getSizes('.hero__title'),
        sectionHeading: getSizes('.about .text-heading'),
        bodyText: getSizes('.about__body'),
        cardTitle: getSizes('.placement-role'),
        cardText: getSizes('.placement-desc'),
        sectionLabel: getSizes('.text-section-label'),
        button: getSizes('.btn-primary') || getSizes('.contact-btn--cv'),
        navLink: getSizes('.hero__nav a'),
        badge: getSizes('.placement-badge'),
        pageCounter: getSizes('.page-counter'),
      };
    })()`,
    returnByValue: true,
  });

  console.log("\n--- Computed Font Sizes on Desktop (1440x900) ---");
  console.log(JSON.stringify(computedSizes.result.value, null, 2));

  // Now test mobile font sizes
  await send("Emulation.setDeviceMetricsOverride", {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await new Promise((r) => setTimeout(r, 400));
  const mobileSizes = await send("Runtime.evaluate", {
    expression: `(() => {
      const getSizes = (selector) => {
        const el = document.querySelector(selector);
        if (!el) return null;
        const style = window.getComputedStyle(el);
        return { fontSize: style.fontSize, lineHeight: style.lineHeight, fontWeight: style.fontWeight };
      };

      return {
        heroHeadline: getSizes('.hero__title'),
        sectionHeading: getSizes('.about .text-heading'),
        bodyText: getSizes('.about__body'),
        cardTitle: getSizes('.placement-role'),
        cardText: getSizes('.placement-desc'),
        sectionLabel: getSizes('.text-section-label'),
        button: getSizes('.contact-btn--cv'),
        badge: getSizes('.placement-badge'),
      };
    })()`,
    returnByValue: true,
  });

  console.log("\n--- Computed Font Sizes on Mobile (390x844) ---");
  console.log(JSON.stringify(mobileSizes.result.value, null, 2));

  ws.close();
  chromeProcess.kill();
  server.close();
  console.log("\nAll checks completed successfully!");
  process.exit(0);
});
