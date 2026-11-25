/**
 * Unified Image Decoder
 * Decodes PNG, JPG, WebP, AVIF, GIF, ICO, BMP, SVG (with viewBox normalization), and HEIC/HEIF
 * into a ready-to-draw HTMLImageElement plus natural dimensions and a previewable URL.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});
  const workerUrl = new URL('pro-image-worker.js', document.currentScript.src);
  let decodeQueue = Promise.resolve();

  function runCodecWorker(message, transfer = []) {
    return new Promise((resolve, reject) => {
      const fail = key => reject(new Error(SI.i18n.t(key)));
      let worker;
      try {
        worker = new Worker(workerUrl);
      } catch {
        fail('decode.worker');
        return;
      }
      const finish = () => {
        clearTimeout(timeout);
        worker.terminate();
      };
      const timeout = setTimeout(() => {
        finish();
        fail('decode.timeout');
      }, 60000);
      worker.onmessage = ({ data }) => {
        finish();
        if (data.error) fail(data.error);
        else resolve(data);
      };
      worker.onerror = () => {
        finish();
        fail('decode.worker');
      };
      worker.postMessage(message, transfer);
    });
  }

  async function decodeProfessional(item, format) {
    if (item.file.size > 128 * 1024 * 1024) throw new Error(SI.i18n.t('decode.size'));
    if (format === 'jxl' && !item.decodedBlob) {
      let img;
      try {
        img = await loadImageFromUrl(item.origUrl);
      } catch {
        // Older browsers need the WASM decoder.
      }
      if (img) {
        const { naturalWidth: width, naturalHeight: height } = img;
        if (width > 16383 || height > 16383 || width * height > 40_000_000) {
          throw new Error(SI.i18n.t('decode.size'));
        }
        return { img, width, height };
      }
    }
    if (!item.decodedBlob) {
      if (!item.decodePromise) {
        const task = decodeQueue.then(async () => {
          if (!SI.store.state.items.includes(item)) throw new Error();
          const { width, height, pixels, firstPageOnly, orientation } = await runCodecWorker({ file: item.file, format });
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').putImageData(new ImageData(new Uint8ClampedArray(pixels.buffer), width, height), 0, 0);
          let preview = canvas;
          const transforms = {
            2: [-1, 0, 0, 1, width, 0], 3: [-1, 0, 0, -1, width, height],
            4: [1, 0, 0, -1, 0, height], 5: [0, 1, 1, 0, 0, 0],
            6: [0, 1, -1, 0, height, 0], 7: [0, -1, -1, 0, height, width],
            8: [0, -1, 1, 0, 0, width]
          };
          if (transforms[orientation]) {
            preview = document.createElement('canvas');
            preview.width = orientation >= 5 ? height : width;
            preview.height = orientation >= 5 ? width : height;
            const ctx = preview.getContext('2d');
            ctx.setTransform(...transforms[orientation]);
            ctx.drawImage(canvas, 0, 0);
          }
          const blob = await new Promise(resolve => preview.toBlob(resolve, 'image/png'));
          if (!blob) throw new Error(SI.i18n.t('decode.failed'));
          if (!SI.store.state.items.includes(item)) throw new Error();
          item.decodedBlob = blob;
          item.previewOrigUrl = URL.createObjectURL(blob);
          item.firstPageOnly = firstPageOnly;
        });
        item.decodePromise = task.finally(() => { item.decodePromise = null; });
        decodeQueue = item.decodePromise.catch(() => {});
      }
      await item.decodePromise;
    }
    const img = await loadImageFromUrl(item.previewOrigUrl);
    return { img, width: img.naturalWidth, height: img.naturalHeight };
  }

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
    const format = {
      psd: 'psd', tif: 'tiff', tiff: 'tiff', tga: 'tga', jxl: 'jxl'
    }[SI.formatters.getFileExtension(file.name)];
    if (typeof format === 'string') return decodeProfessional(item, format);
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
    decodeItem,
    runCodecWorker
  };
})(window);
