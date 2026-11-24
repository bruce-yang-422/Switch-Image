/**
 * HEIC / HEIF Decoder
 * 1. Detects HEIC/HEIF by extension, MIME, or ISOBMFF ftyp header.
 * 2. Tries native browser decoding first (Safari / macOS / iOS).
 * 3. Falls back to lazy-loading heic2any (client-side WASM/JS decoder) via CDN.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  const HEIC_BRANDS = new Set(['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'mif1', 'msf1']);
  const CDN_URLS = [
    'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js',
    'https://unpkg.com/heic2any@0.0.4/dist/heic2any.min.js'
  ];

  let loaderPromise = null;

  async function isHeicFile(file) {
    if (!file) return false;
    const name = (file.name || '').toLowerCase();
    const type = (file.type || '').toLowerCase();
    if (/\.(heic|heif)$/i.test(name) || type.includes('heic') || type.includes('heif')) {
      return true;
    }
    try {
      const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
      if (header.length >= 12) {
        const box = String.fromCharCode(header[4], header[5], header[6], header[7]);
        const brand = String.fromCharCode(header[8], header[9], header[10], header[11]);
        if (box === 'ftyp' && HEIC_BRANDS.has(brand)) {
          return true;
        }
      }
    } catch {
      // Ignore slice errors
    }
    return false;
  }

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        script.remove();
        reject(new Error(`無法載入解碼器：${url}`));
      };
      document.head.appendChild(script);
    });
  }

  async function ensureHeic2Any() {
    if (typeof root.heic2any === 'function') {
      return root.heic2any;
    }
    if (!loaderPromise) {
      loaderPromise = (async () => {
        let lastErr = null;
        for (const url of CDN_URLS) {
          try {
            await loadScript(url);
            if (typeof root.heic2any === 'function') {
              return root.heic2any;
            }
          } catch (err) {
            lastErr = err;
          }
        }
        loaderPromise = null;
        throw lastErr || new Error('無法載入 HEIC 解碼模組');
      })();
    }
    return loaderPromise;
  }

  async function tryNativeDecode(file) {
    if (typeof createImageBitmap === 'function') {
      const bitmap = await createImageBitmap(file);
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0);
      bitmap.close();
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob(b => (b ? resolve(b) : reject(new Error('原生解碼轉出失敗'))), 'image/png');
      });
      return blob;
    }
    throw new Error('Browser does not support createImageBitmap for HEIC');
  }

  async function decodeHeicToPngBlob(file) {
    try {
      return await tryNativeDecode(file);
    } catch {
      // Fall back to heic2any
    }

    try {
      const heic2any = await ensureHeic2Any();
      const result = await heic2any({
        blob: file,
        toType: 'image/png'
      });
      return Array.isArray(result) ? result[0] : result;
    } catch (err) {
      throw new Error(
        'HEIC 解碼失敗：此瀏覽器不原生支援 HEIC，需連網載入 heic2any 解碼模組（' +
          (err?.message || '網路無法連線') +
          '）'
      );
    }
  }

  SI.heicDecoder = {
    isHeicFile,
    decodeHeicToPngBlob
  };
})(window);
