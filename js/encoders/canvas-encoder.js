/**
 * Native Canvas Encoder (PNG, JPG, WebP, AVIF)
 * Includes automatic AVIF native capability check + optional client-side WASM fallback (@jsquash/avif).
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let avifWasmPromise = null;

  function canvasToBlob(canvas, mime, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        blob => {
          if (blob) resolve(blob);
          else reject(new Error(`瀏覽器無法輸出 ${mime} 格式`));
        },
        mime,
        quality
      );
    });
  }

  async function loadAvifWasmEncoder() {
    if (!avifWasmPromise) {
      avifWasmPromise = (async () => {
        const urls = [
          'https://cdn.jsdelivr.net/npm/@jsquash/avif@1.3.0/+esm',
          'https://esm.sh/@jsquash/avif@1.3.0'
        ];
        let lastErr = null;
        for (const url of urls) {
          try {
            const mod = await import(url);
            if (typeof mod.encode === 'function') {
              return mod.encode;
            }
          } catch (err) {
            lastErr = err;
          }
        }
        avifWasmPromise = null;
        throw lastErr || new Error('無法載入 AVIF WASM 編碼器');
      })();
    }
    return avifWasmPromise;
  }

  async function encodeAvif(canvas, quality) {
    // 1. Try native browser AVIF encoding first (fastest, 100% offline)
    if (SI.capabilities?.state?.avifEncode) {
      const nativeBlob = await canvasToBlob(canvas, 'image/avif', quality);
      if (nativeBlob && nativeBlob.type === 'image/avif') {
        return nativeBlob;
      }
    }

    // 2. Fallback to client-side WASM AVIF encoder
    try {
      const encode = await loadAvifWasmEncoder();
      const ctx = canvas.getContext('2d');
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const q = Math.round(Math.min(100, Math.max(1, quality * 100)));
      const buffer = await encode(imageData, { quality: q, speed: 6 });
      return new Blob([buffer], { type: 'image/avif' });
    } catch (err) {
      throw new Error(
        '此瀏覽器尚未原生支援 AVIF 編碼，且無法連網載入 WASM 編碼器（' +
          (err?.message || '請改用 WebP 或於連網狀態重試') +
          '）'
      );
    }
  }

  async function encode(canvas, formatInfo, options) {
    const quality = options?.quality ?? 0.85;
    if (formatInfo.id === 'avif') {
      return encodeAvif(canvas, quality);
    }
    const q = formatInfo.lossy ? quality : undefined;
    const blob = await canvasToBlob(canvas, formatInfo.mime, q);
    if (formatInfo.id === 'webp' && blob.type !== 'image/webp') {
      throw new Error('目前瀏覽器不支援 WebP 編碼');
    }
    return blob;
  }

  SI.canvasEncoder = { encode, canvasToBlob };
})(window);
