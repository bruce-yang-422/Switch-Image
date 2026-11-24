/**
 * Unified Image Decoder
 * Decodes PNG, JPG, WebP, AVIF, GIF, ICO, BMP, SVG (with viewBox normalization), and HEIC/HEIF
 * into a ready-to-draw HTMLImageElement plus natural dimensions and a previewable URL.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function loadImageFromUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('無法解碼此圖片格式或檔案已損毀'));
      img.src = url;
    });
  }

  /**
   * Ensures SVG has explicit width/height and crisp rasterization dimensions
   * even when the source SVG only specifies a viewBox or tiny dimensions.
   */
  async function decodeSvgFile(file, preferredMinSize = 0) {
    const rawText = await file.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(rawText, 'image/svg+xml');
    const svgEl = doc.documentElement;

    if (!svgEl || svgEl.tagName.toLowerCase() !== 'svg') {
      throw new Error('SVG 語法無效，無法解析');
    }

    if (!svgEl.getAttribute('xmlns')) {
      svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }

    let w = parseFloat(svgEl.getAttribute('width') || '0');
    let h = parseFloat(svgEl.getAttribute('height') || '0');
    const vb = (svgEl.getAttribute('viewBox') || '').trim().split(/[\s,]+/).map(Number);

    if ((!w || !h) && vb.length === 4 && vb[2] > 0 && vb[3] > 0) {
      w = vb[2];
      h = vb[3];
    }
    if (!w || !h) {
      w = w || 512;
      h = h || 512;
    }

    // Scale up very small icon SVGs (e.g. 24x24) so raster exports stay sharp
    const minTarget = preferredMinSize || 512;
    let renderW = w;
    let renderH = h;
    if (Math.max(renderW, renderH) < minTarget) {
      const scale = minTarget / Math.max(renderW, renderH);
      renderW = Math.round(renderW * scale);
      renderH = Math.round(renderH * scale);
    }

    svgEl.setAttribute('width', String(renderW));
    svgEl.setAttribute('height', String(renderH));
    if (!svgEl.getAttribute('viewBox')) {
      svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
    }

    const serialized = new XMLSerializer().serializeToString(svgEl);
    const svgBlob = new Blob([serialized], { type: 'image/svg+xml;charset=utf-8' });
    const tempUrl = URL.createObjectURL(svgBlob);

    try {
      const img = await loadImageFromUrl(tempUrl);
      return {
        img,
        width: renderW,
        height: renderH,
        previewBlob: null,
        cleanupUrl: tempUrl
      };
    } catch (err) {
      URL.revokeObjectURL(tempUrl);
      throw err;
    }
  }

  /**
   * Main entry point for decoding any supported image item.
   * Caches decoded HEIC blob on item so re-conversions are instant.
   */
  async function decodeItem(item) {
    const file = item.file;
    const isSvg =
      (file.type || '').toLowerCase() === 'image/svg+xml' ||
      /\.svg$/i.test(file.name || '');

    if (isSvg) {
      return decodeSvgFile(file);
    }

    const isHeic = await SI.heicDecoder.isHeicFile(file);
    if (isHeic) {
      if (!item.decodedBlob) {
        item.decodedBlob = await SI.heicDecoder.decodeHeicToPngBlob(file);
        if (item.previewOrigUrl && item.previewOrigUrl !== item.origUrl) {
          URL.revokeObjectURL(item.previewOrigUrl);
        }
        item.previewOrigUrl = URL.createObjectURL(item.decodedBlob);
      }
      const img = await loadImageFromUrl(item.previewOrigUrl);
      return {
        img,
        width: img.naturalWidth || img.width || 1024,
        height: img.naturalHeight || img.height || 1024,
        previewBlob: item.decodedBlob,
        cleanupUrl: null
      };
    }

    const img = await loadImageFromUrl(item.origUrl);
    return {
      img,
      width: img.naturalWidth || img.width || 1024,
      height: img.naturalHeight || img.height || 1024,
      previewBlob: null,
      cleanupUrl: null
    };
  }

  SI.imageDecoder = {
    loadImageFromUrl,
    decodeItem
  };
})(window);
