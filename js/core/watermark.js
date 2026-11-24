/**
 * Canvas Watermark Renderer
 * Supports both Text Watermarks and Image Logo Watermarks,
 * with 6 placements (corners, center, and full-frame diagonal tiling).
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function computePlacement(position, canvasW, canvasH, itemW, itemH, margin) {
    switch (position) {
      case 'top-left':
        return { x: margin, y: margin };
      case 'top-right':
        return { x: canvasW - itemW - margin, y: margin };
      case 'bottom-left':
        return { x: margin, y: canvasH - itemH - margin };
      case 'center':
        return { x: (canvasW - itemW) / 2, y: (canvasH - itemH) / 2 };
      case 'bottom-right':
      default:
        return { x: canvasW - itemW - margin, y: canvasH - itemH - margin };
    }
  }

  function drawTextWatermark(ctx, width, height, wm) {
    const text = String(wm.text || '').trim();
    if (!text) return;

    const scalePct = Math.min(20, Math.max(1.5, Number(wm.fontSizePct) || 4.5));
    const fontSize = Math.max(12, Math.round(Math.min(width, height) * (scalePct / 100)));
    const opacity = Math.min(1, Math.max(0.05, (Number(wm.opacity) || 45) / 100));
    const color = wm.color || '#ffffff';
    const angleRad = ((Number(wm.angle) || 0) * Math.PI) / 180;
    const margin = Math.max(12, Math.round(Math.min(width, height) * 0.035));

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.font = `700 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", "Noto Sans TC", sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    // Subtle shadow for legibility on varied backgrounds
    ctx.shadowColor = 'rgba(0, 0, 0, 0.42)';
    ctx.shadowBlur = Math.max(2, Math.round(fontSize * 0.16));
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = Math.max(1, Math.round(fontSize * 0.05));

    const metrics = ctx.measureText(text);
    const textW = Math.max(fontSize, metrics.width);
    const textH = fontSize * 1.2;

    if (wm.position === 'tile') {
      const tileAngle = Number.isFinite(Number(wm.angle)) && Number(wm.angle) !== 0
        ? angleRad
        : (-28 * Math.PI) / 180;
      const stepX = Math.max(textW + fontSize * 2.2, width * 0.28);
      const stepY = Math.max(textH * 3.4, height * 0.22);
      const diag = Math.hypot(width, height);

      ctx.translate(width / 2, height / 2);
      ctx.rotate(tileAngle);

      for (let y = -diag / 2; y <= diag / 2; y += stepY) {
        const rowShift = Math.abs(Math.round(y / stepY)) % 2 === 1 ? stepX / 2 : 0;
        for (let x = -diag / 2 - stepX; x <= diag / 2 + stepX; x += stepX) {
          ctx.fillText(text, x + rowShift, y);
        }
      }
    } else {
      const pos = computePlacement(wm.position, width, height, textW, textH, margin);
      const cx = pos.x + textW / 2;
      const cy = pos.y + textH / 2;
      ctx.translate(cx, cy);
      if (angleRad !== 0) ctx.rotate(angleRad);
      ctx.fillText(text, 0, 0);
    }

    ctx.restore();
  }

  function drawImageWatermark(ctx, width, height, wm) {
    const logoImg = wm.logoImage;
    if (!logoImg || !logoImg.width || !logoImg.height) return;

    const scalePct = Math.min(60, Math.max(5, Number(wm.logoScalePct) || 18));
    const opacity = Math.min(1, Math.max(0.05, (Number(wm.opacity) || 60) / 100));
    const angleRad = ((Number(wm.angle) || 0) * Math.PI) / 180;
    const margin = Math.max(12, Math.round(Math.min(width, height) * 0.035));

    const targetW = Math.max(16, Math.round(width * (scalePct / 100)));
    const targetH = Math.max(16, Math.round(targetW * (logoImg.height / logoImg.width)));

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (wm.position === 'tile') {
      const tileAngle = Number.isFinite(Number(wm.angle)) && Number(wm.angle) !== 0
        ? angleRad
        : (-24 * Math.PI) / 180;
      const stepX = Math.max(targetW * 1.9, width * 0.3);
      const stepY = Math.max(targetH * 2.2, height * 0.25);
      const diag = Math.hypot(width, height);

      ctx.translate(width / 2, height / 2);
      ctx.rotate(tileAngle);

      for (let y = -diag / 2; y <= diag / 2; y += stepY) {
        const rowShift = Math.abs(Math.round(y / stepY)) % 2 === 1 ? stepX / 2 : 0;
        for (let x = -diag / 2 - stepX; x <= diag / 2 + stepX; x += stepX) {
          ctx.drawImage(logoImg, x + rowShift - targetW / 2, y - targetH / 2, targetW, targetH);
        }
      }
    } else {
      const pos = computePlacement(wm.position, width, height, targetW, targetH, margin);
      const cx = pos.x + targetW / 2;
      const cy = pos.y + targetH / 2;
      ctx.translate(cx, cy);
      if (angleRad !== 0) ctx.rotate(angleRad);
      ctx.drawImage(logoImg, -targetW / 2, -targetH / 2, targetW, targetH);
    }

    ctx.restore();
  }

  function apply(ctx, width, height, watermarkCfg) {
    if (!watermarkCfg || !watermarkCfg.enabled) return;
    if (watermarkCfg.type === 'image') {
      drawImageWatermark(ctx, width, height, watermarkCfg);
    } else {
      drawTextWatermark(ctx, width, height, watermarkCfg);
    }
  }

  SI.watermark = { apply };
})(window);
