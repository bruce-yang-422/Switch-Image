/**
 * Pure JavaScript Zero-Dependency GIF89a Encoder
 * - Median-Cut quantization up to 255 colors + 1 transparent index
 * - RGB555 lookup cache for fast pixel-to-palette mapping
 * - Spec-compliant LZW variable-length code compression (9-12 bit with Clear Code reset)
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function medianCutQuantize(rgba, maxColors) {
    // Collect unique RGB555 color buckets with frequency weights
    const hist = new Uint32Array(32768);
    let hasTransparent = false;
    const len = rgba.length;

    for (let i = 0; i < len; i += 4) {
      if (rgba[i + 3] < 128) {
        hasTransparent = true;
        continue;
      }
      const key = ((rgba[i] >> 3) << 10) | ((rgba[i + 1] >> 3) << 5) | (rgba[i + 2] >> 3);
      hist[key]++;
    }

    const colorList = [];
    for (let key = 0; key < 32768; key++) {
      const count = hist[key];
      if (count > 0) {
        const r = ((key >> 10) & 31) * 8 + 4;
        const g = ((key >> 5) & 31) * 8 + 4;
        const b = (key & 31) * 8 + 4;
        colorList.push({ r, g, b, count });
      }
    }

    if (colorList.length === 0) {
      const palette = new Uint8Array(256 * 3);
      return { palette, transparentIndex: hasTransparent ? 255 : -1, colorCount: 1 };
    }

    function createBox(items) {
      let rMin = 255, rMax = 0;
      let gMin = 255, gMax = 0;
      let bMin = 255, bMax = 0;
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        const c = items[i];
        if (c.r < rMin) rMin = c.r;
        if (c.r > rMax) rMax = c.r;
        if (c.g < gMin) gMin = c.g;
        if (c.g > gMax) gMax = c.g;
        if (c.b < bMin) bMin = c.b;
        if (c.b > bMax) bMax = c.b;
        total += c.count;
      }
      const rRange = rMax - rMin;
      const gRange = gMax - gMin;
      const bRange = bMax - bMin;
      const maxRange = Math.max(rRange, gRange, bRange);
      return { items, rRange, gRange, bRange, maxRange, total };
    }

    const targetColors = Math.min(maxColors, colorList.length);
    const boxes = [createBox(colorList)];

    while (boxes.length < targetColors) {
      let bestIdx = -1;
      let bestScore = -1;
      for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        if (box.items.length < 2) continue;
        const score = box.maxRange * Math.sqrt(box.total);
        if (score > bestScore) {
          bestScore = score;
          bestIdx = i;
        }
      }
      if (bestIdx === -1) break;

      const box = boxes.splice(bestIdx, 1)[0];
      const channel =
        box.rRange >= box.gRange && box.rRange >= box.bRange
          ? 'r'
          : box.gRange >= box.bRange
          ? 'g'
          : 'b';

      box.items.sort((a, b) => a[channel] - b[channel]);

      const half = box.total / 2;
      let acc = 0;
      let splitAt = 1;
      for (let i = 0; i < box.items.length - 1; i++) {
        acc += box.items[i].count;
        if (acc >= half) {
          splitAt = i + 1;
          break;
        }
      }
      boxes.push(createBox(box.items.slice(0, splitAt)));
      boxes.push(createBox(box.items.slice(splitAt)));
    }

    const palette = new Uint8Array(256 * 3);
    for (let i = 0; i < boxes.length; i++) {
      let rSum = 0, gSum = 0, bSum = 0, total = 0;
      for (const c of boxes[i].items) {
        rSum += c.r * c.count;
        gSum += c.g * c.count;
        bSum += c.b * c.count;
        total += c.count;
      }
      palette[i * 3] = Math.round(rSum / total);
      palette[i * 3 + 1] = Math.round(gSum / total);
      palette[i * 3 + 2] = Math.round(bSum / total);
    }

    return {
      palette,
      transparentIndex: hasTransparent ? 255 : -1,
      colorCount: boxes.length
    };
  }

  function mapPixelsToPalette(rgba, palette, colorCount, transparentIndex) {
    const pixelCount = rgba.length >> 2;
    const indices = new Uint8Array(pixelCount);
    const cache = new Int16Array(32768);
    cache.fill(-1);

    for (let p = 0, i = 0; p < pixelCount; p++, i += 4) {
      if (transparentIndex >= 0 && rgba[i + 3] < 128) {
        indices[p] = transparentIndex;
        continue;
      }
      const r = rgba[i];
      const g = rgba[i + 1];
      const b = rgba[i + 2];
      const key = ((r >> 3) << 10) | ((g >> 3) << 5) | (b >> 3);

      let idx = cache[key];
      if (idx === -1) {
        let best = 0;
        let bestDist = Infinity;
        for (let c = 0; c < colorCount; c++) {
          const dr = r - palette[c * 3];
          const dg = g - palette[c * 3 + 1];
          const db = b - palette[c * 3 + 2];
          // Perceptual weighted RGB distance
          const dist = dr * dr * 2 + dg * dg * 4 + db * db * 3;
          if (dist < bestDist) {
            bestDist = dist;
            best = c;
            if (dist === 0) break;
          }
        }
        cache[key] = best;
        idx = best;
      }
      indices[p] = idx;
    }

    return indices;
  }

  function lzwEncode(indices, minCodeSize) {
    const clearCode = 1 << minCodeSize;
    const eoiCode = clearCode + 1;
    let codeSize = minCodeSize + 1;
    let nextCode = eoiCode + 1;

    // Open-addressed hash table (size 5003 prime > 4096)
    const TABLE_SIZE = 5003;
    const tableKey = new Int32Array(TABLE_SIZE);
    const tableVal = new Int16Array(TABLE_SIZE);
    tableKey.fill(-1);

    const out = [];
    const subBlock = new Uint8Array(255);
    let subLen = 0;
    let bitBuf = 0;
    let bitCount = 0;

    function flushSubBlock() {
      if (subLen > 0) {
        out.push(subLen);
        for (let i = 0; i < subLen; i++) out.push(subBlock[i]);
        subLen = 0;
      }
    }

    function writeCode(code, size) {
      bitBuf |= code << bitCount;
      bitCount += size;
      while (bitCount >= 8) {
        subBlock[subLen++] = bitBuf & 0xff;
        if (subLen === 255) flushSubBlock();
        bitBuf >>>= 8;
        bitCount -= 8;
      }
    }

    function resetTable() {
      tableKey.fill(-1);
      nextCode = eoiCode + 1;
      codeSize = minCodeSize + 1;
    }

    writeCode(clearCode, codeSize);

    if (indices.length > 0) {
      let prefix = indices[0];
      for (let i = 1; i < indices.length; i++) {
        const k = indices[i];
        const combined = (prefix << 8) | k;
        let slot = (combined * 2654435761 >>> 0) % TABLE_SIZE;
        let found = -1;

        while (tableKey[slot] !== -1) {
          if (tableKey[slot] === combined) {
            found = tableVal[slot];
            break;
          }
          slot++;
          if (slot >= TABLE_SIZE) slot = 0;
        }

        if (found !== -1) {
          prefix = found;
        } else {
          writeCode(prefix, codeSize);
          if (nextCode < 4096) {
            tableKey[slot] = combined;
            tableVal[slot] = nextCode++;
            if (nextCode > (1 << codeSize) && codeSize < 12) {
              codeSize++;
            }
          } else {
            writeCode(clearCode, codeSize);
            resetTable();
          }
          prefix = k;
        }
      }
      writeCode(prefix, codeSize);
    }

    writeCode(eoiCode, codeSize);
    if (bitCount > 0) {
      subBlock[subLen++] = bitBuf & 0xff;
    }
    flushSubBlock();
    out.push(0); // Block terminator

    return out;
  }

  function encodeImageData(imageData) {
    const { width, height, data } = imageData;
    const { palette, transparentIndex, colorCount } = medianCutQuantize(data, 255);
    const indices = mapPixelsToPalette(data, palette, colorCount, transparentIndex);
    const lzwBytes = lzwEncode(indices, 8);

    const bytes = [];
    // Header: GIF89a
    bytes.push(0x47, 0x49, 0x46, 0x38, 0x39, 0x61);

    // Logical Screen Descriptor
    bytes.push(width & 0xff, (width >> 8) & 0xff);
    bytes.push(height & 0xff, (height >> 8) & 0xff);
    bytes.push(0xf7); // GCT=1, ColorRes=7, Sort=0, GCTSize=7 (256 colors)
    bytes.push(transparentIndex >= 0 ? transparentIndex : 0);
    bytes.push(0x00);

    // Global Color Table (768 bytes)
    for (let i = 0; i < 768; i++) {
      bytes.push(palette[i]);
    }

    // Graphic Control Extension (when transparency exists)
    if (transparentIndex >= 0) {
      bytes.push(0x21, 0xf9, 0x04, 0x01, 0x00, 0x00, transparentIndex, 0x00);
    }

    // Image Descriptor
    bytes.push(0x2c, 0x00, 0x00, 0x00, 0x00);
    bytes.push(width & 0xff, (width >> 8) & 0xff);
    bytes.push(height & 0xff, (height >> 8) & 0xff);
    bytes.push(0x00); // No local color table

    // LZW Minimum Code Size + Data Sub-blocks
    bytes.push(8);
    for (let i = 0; i < lzwBytes.length; i++) {
      bytes.push(lzwBytes[i]);
    }

    // Trailer
    bytes.push(0x3b);

    return new Uint8Array(bytes);
  }

  async function encode(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const gifBytes = encodeImageData(imageData);
    return new Blob([gifBytes], { type: 'image/gif' });
  }

  SI.gifEncoder = { encode, encodeImageData };
})(window);
