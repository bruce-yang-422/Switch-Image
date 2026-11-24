/**
 * Pure JavaScript SVG Encoder
 * Supports two modes:
 * 1. "embed": Responsive SVG wrapping a lossless PNG data URI (100% visual fidelity).
 * 2. "vector": Pure vector color-quantized <path> tracing (ideal for logos, icons & pixel art).
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function toHex(r, g, b) {
    return (
      '#' +
      ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)
    );
  }

  function encodeEmbeddedSvg(canvas) {
    const w = canvas.width;
    const h = canvas.height;
    const dataUrl = canvas.toDataURL('image/png');
    const svg = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">`,
      `  <image width="${w}" height="${h}" href="${dataUrl}" />`,
      `</svg>`
    ].join('\n');
    return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  }

  function quantizeColors(rgba, maxColors) {
    const step = Math.max(1, Math.floor((rgba.length / 4) / 25000));
    const samples = [];
    for (let i = 0; i < rgba.length; i += 4 * step) {
      if (rgba[i + 3] < 128) continue;
      samples.push([rgba[i], rgba[i + 1], rgba[i + 2]]);
    }
    if (!samples.length) return [[0, 0, 0]];

    // Simple k-means++ seeded quantization for crisp posterized vector colors
    const k = Math.min(maxColors, samples.length);
    const centroids = [samples[0].slice()];

    while (centroids.length < k) {
      let farthest = samples[0];
      let maxDist = -1;
      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        let minD = Infinity;
        for (let c = 0; c < centroids.length; c++) {
          const dr = s[0] - centroids[c][0];
          const dg = s[1] - centroids[c][1];
          const db = s[2] - centroids[c][2];
          const d = dr * dr + dg * dg + db * db;
          if (d < minD) minD = d;
        }
        if (minD > maxDist) {
          maxDist = minD;
          farthest = s;
        }
      }
      if (maxDist <= 0) break;
      centroids.push(farthest.slice());
    }

    for (let iter = 0; iter < 6; iter++) {
      const sums = centroids.map(() => [0, 0, 0, 0]);
      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        let best = 0;
        let bestD = Infinity;
        for (let c = 0; c < centroids.length; c++) {
          const dr = s[0] - centroids[c][0];
          const dg = s[1] - centroids[c][1];
          const db = s[2] - centroids[c][2];
          const d = dr * dr + dg * dg + db * db;
          if (d < bestD) {
            bestD = d;
            best = c;
          }
        }
        sums[best][0] += s[0];
        sums[best][1] += s[1];
        sums[best][2] += s[2];
        sums[best][3] += 1;
      }
      for (let c = 0; c < centroids.length; c++) {
        if (sums[c][3] > 0) {
          centroids[c][0] = Math.round(sums[c][0] / sums[c][3]);
          centroids[c][1] = Math.round(sums[c][1] / sums[c][3]);
          centroids[c][2] = Math.round(sums[c][2] / sums[c][3]);
        }
      }
    }

    return centroids;
  }

  function encodeVectorTraceSvg(canvas, maxColors = 16) {
    // Limit trace grid so vector SVG stays compact & fast to render
    const MAX_GRID = 160;
    let traceW = canvas.width;
    let traceH = canvas.height;
    if (traceW > MAX_GRID || traceH > MAX_GRID) {
      const ratio = Math.min(MAX_GRID / traceW, MAX_GRID / traceH);
      traceW = Math.max(1, Math.round(traceW * ratio));
      traceH = Math.max(1, Math.round(traceH * ratio));
    }

    const work = document.createElement('canvas');
    work.width = traceW;
    work.height = traceH;
    const wctx = work.getContext('2d');
    wctx.imageSmoothingEnabled = true;
    wctx.imageSmoothingQuality = 'high';
    wctx.drawImage(canvas, 0, 0, traceW, traceH);

    const { data } = wctx.getImageData(0, 0, traceW, traceH);
    const palette = quantizeColors(data, Math.min(32, Math.max(2, maxColors)));
    const pathsByColor = palette.map(() => []);

    const grid = new Int16Array(traceW * traceH);
    for (let y = 0; y < traceH; y++) {
      for (let x = 0; x < traceW; x++) {
        const idx = (y * traceW + x) * 4;
        if (data[idx + 3] < 128) {
          grid[y * traceW + x] = -1;
          continue;
        }
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        let best = 0;
        let bestD = Infinity;
        for (let c = 0; c < palette.length; c++) {
          const dr = r - palette[c][0];
          const dg = g - palette[c][1];
          const db = b - palette[c][2];
          const d = dr * dr + dg * dg + db * db;
          if (d < bestD) {
            bestD = d;
            best = c;
          }
        }
        grid[y * traceW + x] = best;
      }
    }

    // Merge contiguous horizontal + vertical rectangles into compact <path> runs per color
    const visited = new Uint8Array(traceW * traceH);
    for (let y = 0; y < traceH; y++) {
      for (let x = 0; x < traceW; x++) {
        const pos = y * traceW + x;
        const colorIdx = grid[pos];
        if (colorIdx < 0 || visited[pos]) continue;

        let runW = 1;
        while (x + runW < traceW && grid[pos + runW] === colorIdx && !visited[pos + runW]) {
          runW++;
        }

        let runH = 1;
        outer: while (y + runH < traceH) {
          const rowStart = (y + runH) * traceW + x;
          for (let dx = 0; dx < runW; dx++) {
            if (grid[rowStart + dx] !== colorIdx || visited[rowStart + dx]) {
              break outer;
            }
          }
          runH++;
        }

        for (let dy = 0; dy < runH; dy++) {
          const rowStart = (y + dy) * traceW + x;
          for (let dx = 0; dx < runW; dx++) {
            visited[rowStart + dx] = 1;
          }
        }

        pathsByColor[colorIdx].push(`M${x} ${y}h${runW}v${runH}h-${runW}z`);
      }
    }

    const pathEls = [];
    for (let c = 0; c < palette.length; c++) {
      if (!pathsByColor[c].length) continue;
      const hex = toHex(palette[c][0], palette[c][1], palette[c][2]);
      pathEls.push(`  <path fill="${hex}" d="${pathsByColor[c].join('')}" />`);
    }

    const svg = [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${traceW} ${traceH}" width="${canvas.width}" height="${canvas.height}" shape-rendering="crispEdges">`,
      ...pathEls,
      `</svg>`
    ].join('\n');

    return new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  }

  async function encode(canvas, options) {
    if (options?.svgMode === 'vector') {
      return encodeVectorTraceSvg(canvas, options?.svgColors || 16);
    }
    return encodeEmbeddedSvg(canvas);
  }

  SI.svgEncoder = { encode };
})(window);
