/**
 * File download utilities for single and staggered batch downloads.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function triggerDownload(blobOrUrl, filename) {
    const isBlob = blobOrUrl instanceof Blob;
    const url = isBlob ? URL.createObjectURL(blobOrUrl) : blobOrUrl;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    if (isBlob) {
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
  }

  async function downloadSequentially(entries, delayMs = 180) {
    for (let i = 0; i < entries.length; i++) {
      triggerDownload(entries[i].url || entries[i].blob, entries[i].name);
      if (i < entries.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  SI.download = {
    triggerDownload,
    downloadSequentially
  };
})(window);
