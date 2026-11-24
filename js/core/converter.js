/**
 * Core Universal Image Conversion Engine
 * Orchestrates: decode -> resize / e-commerce pad / cover crop -> watermark -> format encode
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function clampToCap(w, h, cap) {
    const limit = cap || 16383;
    if (w > limit || h > limit) {
      const ratio = Math.min(limit / w, limit / h);
      return {
        w: Math.max(1, Math.floor(w * ratio)),
        h: Math.max(1, Math.floor(h * ratio))
      };
    }
    return { w, h };
  }

  function computeLayout(origW, origH, maxWidth, maxHeight, resizeMode, formatMaxDim) {
    // Fixed canvas modes ('pad' or 'cover') require both width and height
    if ((resizeMode === 'pad' || resizeMode === 'cover') && maxWidth > 0 && maxHeight > 0) {
      const capped = clampToCap(maxWidth, maxHeight, formatMaxDim);
      const canvasW = capped.w;
      const canvasH = capped.h;

      if (resizeMode === 'pad') {
        const scale = Math.min(canvasW / origW, canvasH / origH);
        const drawW = Math.max(1, Math.round(origW * scale));
        const drawH = Math.max(1, Math.round(origH * scale));
        const dx = Math.floor((canvasW - drawW) / 2);
        const dy = Math.floor((canvasH - drawH) / 2);
        return {
          canvasW,
          canvasH,
          sx: 0, sy: 0, sw: origW, sh: origH,
          dx, dy, dw: drawW, dh: drawH,
          needsBackdrop: true
        };
      }

      // 'cover': centered crop to fill exact target canvas
      const scale = Math.max(canvasW / origW, canvasH / origH);
      const cropW = canvasW / scale;
      const cropH = canvasH / scale;
      const sx = (origW - cropW) / 2;
      const sy = (origH - cropH) / 2;
      return {
        canvasW,
        canvasH,
        sx, sy, sw: cropW, sh: cropH,
        dx: 0, dy: 0, dw: canvasW, dh: canvasH,
        needsBackdrop: false
      };
    }

    // Default 'contain': proportionally shrink within maxWidth / maxHeight without cropping
    let targetW = origW;
    let targetH = origH;

    if (maxWidth > 0 && targetW > maxWidth) {
      const ratio = maxWidth / targetW;
      targetW = Math.round(targetW * ratio);
      targetH = Math.max(1, Math.round(targetH * ratio));
    }
    if (maxHeight > 0 && targetH > maxHeight) {
      const ratio = maxHeight / targetH;
      targetH = Math.round(targetH * ratio);
      targetW = Math.max(1, Math.round(targetW * ratio));
    }

    const capped = clampToCap(targetW, targetH, formatMaxDim);
    return {
      canvasW: capped.w,
      canvasH: capped.h,
      sx: 0, sy: 0, sw: origW, sh: origH,
      dx: 0, dy: 0, dw: capped.w, dh: capped.h,
      needsBackdrop: false
    };
  }

  async function convertItem(item, onUpdate) {
    const { store } = SI;
    const settings = store.state.settings;
    const watermarkCfg = store.state.watermark;
    const formatInfo = store.getFormat(item.targetFormat);

    item.status = 'converting';
    item.error = '';
    item.outName = store.computeItemOutName(item);
    if (onUpdate) onUpdate(item);

    let decoded = null;
    try {
      decoded = await SI.imageDecoder.decodeItem(item);
      item.origWidth = decoded.width;
      item.origHeight = decoded.height;

      const isIco = formatInfo.engine === 'ico';
      const icoSizes = isIco ? store.getIcoSizesArray(settings.icoSizes) : null;
      const maxDim = isIco ? Math.max(...icoSizes) : formatInfo.maxDimension;

      const layout = isIco
        ? {
            canvasW: Math.min(1024, Math.max(decoded.width, maxDim)),
            canvasH: Math.min(1024, Math.max(decoded.height, maxDim)),
            sx: 0, sy: 0, sw: decoded.width, sh: decoded.height,
            dx: 0, dy: 0,
            dw: Math.min(1024, Math.max(decoded.width, maxDim)),
            dh: Math.min(1024, Math.max(decoded.height, maxDim)),
            needsBackdrop: false
          }
        : computeLayout(
            decoded.width,
            decoded.height,
            settings.maxWidth,
            settings.maxHeight,
            settings.resizeMode,
            maxDim
          );

      const canvas = document.createElement('canvas');
      canvas.width = layout.canvasW;
      canvas.height = layout.canvasH;
      const ctx = canvas.getContext('2d');

      const forceFillBg = !formatInfo.supportsAlpha || settings.bgMode === 'fill';
      if ((forceFillBg || (layout.needsBackdrop && settings.bgMode === 'fill')) && !isIco) {
        ctx.fillStyle = settings.bgColor || '#ffffff';
        ctx.fillRect(0, 0, layout.canvasW, layout.canvasH);
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(
        decoded.img,
        layout.sx, layout.sy, layout.sw, layout.sh,
        layout.dx, layout.dy, layout.dw, layout.dh
      );

      // Apply optional watermark before encoding
      if (watermarkCfg?.enabled && !isIco) {
        SI.watermark.apply(ctx, layout.canvasW, layout.canvasH, watermarkCfg);
      }

      const encodeOptions = {
        quality: Math.min(1, Math.max(0.01, Number(settings.quality) / 100)),
        fillBg: forceFillBg,
        bgColor: settings.bgColor || '#ffffff',
        icoSizes,
        svgMode: settings.svgMode,
        svgColors: settings.svgColors
      };

      let blob;
      switch (formatInfo.engine) {
        case 'canvas':
        case 'avif':
          blob = await SI.canvasEncoder.encode(canvas, formatInfo, encodeOptions);
          break;
        case 'gif':
          blob = await SI.gifEncoder.encode(canvas, encodeOptions);
          break;
        case 'ico':
          blob = await SI.icoEncoder.encode(canvas, encodeOptions);
          break;
        case 'svg':
          blob = await SI.svgEncoder.encode(canvas, encodeOptions);
          break;
        case 'bmp':
          blob = await SI.bmpEncoder.encode(canvas, encodeOptions);
          break;
        default:
          throw new Error(`未支援的輸出引擎：${formatInfo.engine}`);
      }

      if (item.outUrl) {
        URL.revokeObjectURL(item.outUrl);
      }
      item.outBlob = blob;
      item.outUrl = URL.createObjectURL(blob);
      item.outWidth = isIco ? maxDim : layout.canvasW;
      item.outHeight = isIco ? maxDim : layout.canvasH;
      item.status = 'done';
    } catch (err) {
      item.status = 'error';
      item.error = err?.message || '轉換失敗';
    } finally {
      if (decoded?.cleanupUrl) {
        URL.revokeObjectURL(decoded.cleanupUrl);
      }
    }

    if (onUpdate) onUpdate(item);
  }

  async function convertBatch(targetItems, onUpdate, concurrency = 4) {
    const queue = [...targetItems];
    if (!queue.length) return;

    let idx = 0;
    async function worker() {
      while (idx < queue.length) {
        const current = queue[idx++];
        if (SI.store.state.items.includes(current)) {
          await convertItem(current, onUpdate);
        }
      }
    }

    const workers = Array.from({ length: Math.min(concurrency, queue.length) }, worker);
    await Promise.all(workers);
  }

  SI.converter = {
    convertItem,
    convertBatch
  };
})(window);
