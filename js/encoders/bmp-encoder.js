/**
 * Pure JavaScript Zero-Dependency 24-bit Windows BMP Encoder.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function encodeImageData(imageData) {
    const { width, height, data } = imageData;
    const rowStride = Math.ceil((width * 3) / 4) * 4;
    const pixelArraySize = rowStride * height;
    const fileSize = 54 + pixelArraySize;

    const buffer = new ArrayBuffer(fileSize);
    const view = new DataView(buffer);
    const bytes = new Uint8Array(buffer);

    // BITMAPFILEHEADER (14 bytes)
    view.setUint8(0, 0x42); // 'B'
    view.setUint8(1, 0x4d); // 'M'
    view.setUint32(2, fileSize, true);
    view.setUint32(6, 0, true);
    view.setUint32(10, 54, true); // Pixel data offset

    // BITMAPINFOHEADER (40 bytes)
    view.setUint32(14, 40, true);          // Header size
    view.setInt32(18, width, true);        // Width
    view.setInt32(22, height, true);       // Height (positive = bottom-up)
    view.setUint16(26, 1, true);           // Planes
    view.setUint16(28, 24, true);          // Bits per pixel (24-bit BGR)
    view.setUint32(30, 0, true);           // BI_RGB (uncompressed)
    view.setUint32(34, pixelArraySize, true);
    view.setInt32(38, 2835, true);         // X pixels per meter (~72 DPI)
    view.setInt32(42, 2835, true);         // Y pixels per meter
    view.setUint32(46, 0, true);
    view.setUint32(50, 0, true);

    // Pixel data (bottom-up rows, BGR order)
    let dstRow = 54;
    for (let y = height - 1; y >= 0; y--) {
      let srcIdx = y * width * 4;
      let dstIdx = dstRow;
      for (let x = 0; x < width; x++) {
        bytes[dstIdx] = data[srcIdx + 2];     // B
        bytes[dstIdx + 1] = data[srcIdx + 1]; // G
        bytes[dstIdx + 2] = data[srcIdx];     // R
        srcIdx += 4;
        dstIdx += 3;
      }
      dstRow += rowStride;
    }

    return bytes;
  }

  async function encode(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const bmpBytes = encodeImageData(imageData);
    return new Blob([bmpBytes], { type: 'image/bmp' });
  }

  SI.bmpEncoder = { encode, encodeImageData };
})(window);
