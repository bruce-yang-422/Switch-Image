/**
 * Browser Image Format Capability Detector
 * Probes native encoding/decoding support for WebP and AVIF at startup.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  const state = {
    webpEncode: false,
    avifEncode: false,
    checked: false
  };

  function probeCanvasEncode(mime) {
    return new Promise(resolve => {
      try {
        const c = document.createElement('canvas');
        c.width = 2;
        c.height = 2;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#2563eb';
        ctx.fillRect(0, 0, 2, 2);
        c.toBlob(
          blob => resolve(Boolean(blob && blob.type === mime)),
          mime,
          0.8
        );
      } catch {
        resolve(false);
      }
    });
  }

  async function detectAll() {
    const [webpEncode, avifEncode] = await Promise.all([
      probeCanvasEncode('image/webp'),
      probeCanvasEncode('image/avif')
    ]);
    state.webpEncode = webpEncode;
    state.avifEncode = avifEncode;
    state.checked = true;
    return state;
  }

  SI.capabilities = { state, detectAll };
})(window);
