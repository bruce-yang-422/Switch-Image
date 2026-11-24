/**
 * Pure JavaScript Zero-Dependency Multi-Size ICO Encoder (PNG-in-ICO specification).
 * Renders centered aspect-ratio-preserved square icons for one or multiple sizes.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function renderSquarePng(sourceCanvas, size, fillBg, bgColor) {
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    if (fillBg) {
      ctx.fillStyle = bgColor || '#ffffff';
      ctx.fillRect(0, 0, size, size);
    }

    const scale = Math.min(size / sourceCanvas.width, size / sourceCanvas.height);
    const drawW = Math.max(1, Math.round(sourceCanvas.width * scale));
    const drawH = Math.max(1, Math.round(sourceCanvas.height * scale));
    const offsetX = Math.floor((size - drawW) / 2);
    const offsetY = Math.floor((size - drawH) / 2);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(sourceCanvas, offsetX, offsetY, drawW, drawH);

    return new Promise((resolve, reject) => {
      c.toBlob(
        async blob => {
          if (!blob) return reject(new Error('ICO 內部 PNG 渲染失敗'));
          const bytes = new Uint8Array(await blob.arrayBuffer());
          resolve({ size, bytes });
        },
        'image/png'
      );
    });
  }

  function packIcoEntries(entries) {
    const count = entries.length;
    const headerSize = 6;
    const dirSize = count * 16;
    let totalBytes = headerSize + dirSize;
    for (const entry of entries) {
      totalBytes += entry.bytes.length;
    }

    const buffer = new ArrayBuffer(totalBytes);
    const view = new DataView(buffer);
    const out = new Uint8Array(buffer);

    // ICONDIR Header
    view.setUint16(0, 0, true);     // Reserved
    view.setUint16(2, 1, true);     // Type: 1 = ICO
    view.setUint16(4, count, true); // Number of images

    let dataOffset = headerSize + dirSize;
    for (let i = 0; i < count; i++) {
      const { size, bytes } = entries[i];
      const dim = size >= 256 ? 0 : size; // 0 represents 256px in ICO spec
      const entryOffset = headerSize + i * 16;

      view.setUint8(entryOffset + 0, dim);            // Width
      view.setUint8(entryOffset + 1, dim);            // Height
      view.setUint8(entryOffset + 2, 0);              // Color palette count
      view.setUint8(entryOffset + 3, 0);              // Reserved
      view.setUint16(entryOffset + 4, 1, true);       // Color planes
      view.setUint16(entryOffset + 6, 32, true);      // Bits per pixel
      view.setUint32(entryOffset + 8, bytes.length, true); // Image data size
      view.setUint32(entryOffset + 12, dataOffset, true);  // Offset to image data

      out.set(bytes, dataOffset);
      dataOffset += bytes.length;
    }

    return out;
  }

  async function encode(canvas, options) {
    const sizes = Array.isArray(options?.icoSizes) && options.icoSizes.length
      ? options.icoSizes
      : [16, 32, 48, 256];

    const clampedSizes = [...new Set(sizes.map(s => Math.min(256, Math.max(16, Number(s) || 32))))].sort(
      (a, b) => a - b
    );

    const entries = await Promise.all(
      clampedSizes.map(size => renderSquarePng(canvas, size, options?.fillBg, options?.bgColor))
    );
    const icoBytes = packIcoEntries(entries);
    return new Blob([icoBytes], { type: 'image/x-icon' });
  }

  SI.icoEncoder = { encode, packIcoEntries };
})(window);
