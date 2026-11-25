/* global agPsd, UTIF */
const MAX_PIXELS = 40_000_000;

function checkSize(width, height) {
  if (!width || !height || width > 16383 || height > 16383 || width * height > MAX_PIXELS) {
    throw new Error('decode.size');
  }
}

function loadDependency(url) {
  try {
    importScripts('https://cdn.jsdelivr.net/npm/' + url);
  } catch {
    throw new Error('decode.module');
  }
}

function decodePsd(buffer) {
  const view = new DataView(buffer);
  if (view.getUint32(0) !== 0x38425053 || view.getUint16(4) !== 1) throw new Error();
  checkSize(view.getUint32(18), view.getUint32(14));
  if (view.getUint16(22) !== 8) throw new Error('decode.variant');
  // The PSD has three length-prefixed sections before the merged image.
  let offset = 26;
  for (let i = 0; i < 3; i++) offset += 4 + view.getUint32(offset);
  if (offset + 2 >= buffer.byteLength) throw new Error('decode.psdComposite');
  loadDependency('ag-psd@30.1.0/dist/bundle.js');
  agPsd.initializeCanvas((w, h) => new OffscreenCanvas(w, h), (w, h) => new ImageData(w, h));
  const psd = agPsd.readPsd(buffer, {
    skipLayerImageData: true, skipThumbnail: true, skipLinkedFilesData: true, useImageData: true
  });
  if (!psd.imageData || psd.imageResources?.versionInfo?.hasRealMergedData === false) {
    throw new Error('decode.psdComposite');
  }
  return psd.imageData;
}

function decodeTiff(buffer) {
  const view = new DataView(buffer);
  const order = view.getUint16(0);
  const little = order === 0x4949;
  if ((!little && order !== 0x4d4d) || view.getUint16(2, little) !== 42) {
    throw new Error('decode.variant');
  }
  const ifd = view.getUint32(4, little);
  if (ifd < 8) throw new Error();
  const next = ifd + 2 + view.getUint16(ifd, little) * 12;
  const firstPageOnly = view.getUint32(next, little) !== 0;
  // Decode only the first directory. Ignore subsequent pages and their metadata.
  view.setUint32(next, 0, little);
  loadDependency('pako@1.0.11/dist/pako.min.js');
  loadDependency('utif@3.1.0/UTIF.js');
  const [page] = UTIF.decode(buffer);
  const width = page?.t256?.[0];
  const height = page?.t257?.[0];
  checkSize(width, height);
  const color = page.t262?.[0];
  const bits = page.t258 || [1];
  const samples = page.t277?.[0] || 1;
  if (![0, 1, 2].includes(color) || (page.t284?.[0] || 1) !== 1 ||
      ![1, 3, 4, 5, 6, 7, 8, 32773].includes(page.t259?.[0] || 1) ||
      bits.length !== samples || bits.some(bit => !(color === 2 ? [8] : [1, 8]).includes(bit)) ||
      (color === 2 ? ![3, 4].includes(samples) : samples !== 1)) {
    throw new Error('decode.variant');
  }
  UTIF.decodeImage(buffer, page);
  const pixels = new Uint8ClampedArray(UTIF.toRGBA8(page));
  if (color === 2 && samples === 4 && page.t338?.[0] === 1) {
    for (let i = 0; i < pixels.length; i += 4) {
      const alpha = pixels[i + 3];
      if (!alpha || alpha === 255) continue;
      for (let channel = 0; channel < 3; channel++) pixels[i + channel] *= 255 / alpha;
    }
  }
  const orientation = page.t274?.[0] || 1;
  return { data: pixels, width, height, firstPageOnly, orientation };
}

function decodeTga(buffer) {
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const type = bytes[2];
  const depth = bytes[16];
  const descriptor = bytes[17];
  if (bytes[1] !== 0 || ![2, 10].includes(type) || ![16, 24, 32].includes(depth) ||
      (descriptor & 0xc0)) throw new Error('decode.variant');
  const width = view.getUint16(12, true);
  const height = view.getUint16(14, true);
  checkSize(width, height);
  const count = width * height;
  const data = new Uint8ClampedArray(count * 4);
  const stride = depth / 8;
  const hasAlpha = (descriptor & 15) > 0;
  let offset = 18 + bytes[0];
  let pixel = 0;
  while (pixel < count) {
    if (offset >= bytes.length) throw new Error();
    const packet = type === 10 ? bytes[offset++] : 0;
    const length = (packet & 127) + 1;
    const repeated = (packet & 128) !== 0;
    if (pixel + length > count || offset + stride * (repeated ? 1 : length) > bytes.length) {
      throw new Error();
    }
    for (let i = 0; i < length; i++, pixel++) {
      const col = pixel % width;
      const row = Math.floor(pixel / width);
      const x = descriptor & 16 ? width - 1 - col : col;
      const y = descriptor & 32 ? row : height - 1 - row;
      const dst = (y * width + x) * 4;
      const src = offset + (repeated ? 0 : i * stride);
      if (depth === 16) {
        const packed = view.getUint16(src, true);
        data[dst] = ((packed >> 10) & 31) * 255 / 31;
        data[dst + 1] = ((packed >> 5) & 31) * 255 / 31;
        data[dst + 2] = (packed & 31) * 255 / 31;
        data[dst + 3] = !hasAlpha || (packed & 0x8000) !== 0 ? 255 : 0;
      } else {
        data[dst] = bytes[src + 2];
        data[dst + 1] = bytes[src + 1];
        data[dst + 2] = bytes[src];
        data[dst + 3] = depth === 32 && hasAlpha ? bytes[src + 3] : 255;
      }
    }
    offset += stride * (repeated ? 1 : length);
  }
  return { data, width, height };
}

async function decodeJxl(buffer) {
  let decode;
  try {
    ({ default: decode } = await import('https://cdn.jsdelivr.net/npm/@jsquash/jxl@1.2.0/decode.js'));
  } catch {
    throw new Error('decode.module');
  }
  return decode(buffer);
}

async function encodeJxl({ pixels, width, height, quality }) {
  checkSize(width, height);
  let module;
  const base = 'https://cdn.jsdelivr.net/npm/@jsquash/jxl@1.2.0/';
  try {
    const { default: createEncoder } = await import(base + 'codec/enc/jxl_enc.js');
    module = await createEncoder({ noInitialRun: true });
  } catch {
    throw new Error('encode.jxlModule');
  }
  const bytes = module.encode(pixels, width, height, {
    effort: 4, quality, progressive: false, epf: -1, lossyPalette: false,
    decodingSpeedTier: 0, photonNoiseIso: 0, lossyModular: false
  });
  if (!bytes?.length) throw new Error('encode.jxlFailed');
  return new Blob([bytes], { type: 'image/jxl' });
}

function readJpegPreview(bytes, start) {
  let offset = start + 2;
  let pixels = 0;
  let inScan = false;
  let hasScan = false;
  while (offset < bytes.length) {
    if (inScan) offset = bytes.indexOf(0xff, offset);
    if (offset < 0 || bytes[offset++] !== 0xff) return null;
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if (inScan && (marker === 0 || (marker >= 0xd0 && marker <= 0xd7))) continue;
    if (marker === 0xd9) return hasScan && pixels ? { start, end: offset, pixels } : null;
    inScan = false;
    if (marker < 0xc0 || marker >= 0xf0 || marker === 0xd8 ||
        (marker >= 0xd0 && marker <= 0xd7) || offset + 2 > bytes.length) return null;
    const length = bytes[offset] * 256 + bytes[offset + 1];
    if (length < 2 || offset + length > bytes.length) return null;
    if ([0xc0, 0xc1, 0xc2].includes(marker)) {
      if (length < 8 || bytes[offset + 2] !== 8) return null;
      const height = bytes[offset + 3] * 256 + bytes[offset + 4];
      const width = bytes[offset + 5] * 256 + bytes[offset + 6];
      if (!width || !height || width > 16383 || height > 16383 || width * height > MAX_PIXELS) return null;
      pixels = width * height;
    }
    if (marker === 0xda) {
      if (!pixels) return null;
      inScan = hasScan = true;
    }
    offset += length;
  }
  return null;
}

async function extractRawPreview(file) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const candidates = [];
  for (let start = bytes.indexOf(0xff); start >= 0; start = bytes.indexOf(0xff, start + 1)) {
    if (bytes[start + 1] !== 0xd8 || bytes[start + 2] !== 0xff) continue;
    const preview = readJpegPreview(bytes, start);
    if (!preview) continue;
    candidates.push(preview);
    candidates.sort((a, b) => b.pixels - a.pixels);
    if (candidates.length > 12) candidates.pop();
    start = preview.end - 1;
  }
  for (const { start, end } of candidates) {
    const blob = file.slice(start, end, 'image/jpeg');
    try {
      const bitmap = await createImageBitmap(blob);
      bitmap.close();
      return blob;
    } catch {
      // Try the next largest embedded preview.
    }
  }
  throw new Error('decode.rawMissing');
}

self.onmessage = async ({ data: { file, format, encoding } }) => {
  try {
    if (encoding) {
      self.postMessage({ blob: await encodeJxl(encoding) });
      return;
    }
    if (format === 'raw') {
      self.postMessage({ blob: await extractRawPreview(file) });
      return;
    }
    const buffer = await file.arrayBuffer();
    const decode = { psd: decodePsd, tiff: decodeTiff, tga: decodeTga, jxl: decodeJxl }[format];
    const result = await decode(buffer);
    checkSize(result.width, result.height);
    const { width, height, firstPageOnly, orientation } = result;
    const pixels = result.data;
    self.postMessage({ width, height, pixels, firstPageOnly, orientation }, [pixels.buffer]);
  } catch (error) {
    self.postMessage({
      error: /^(decode|encode)\./.test(error.message) ? error.message
        : encoding ? 'encode.jxlFailed' : 'decode.failed'
    });
  }
};
