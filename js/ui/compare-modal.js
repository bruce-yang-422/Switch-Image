/**
 * Clean Output Lightbox Preview Modal
 * Opens on thumbnail click to inspect crop, background matte fill, and watermark.
 * Click the preview image to toggle between fit-to-screen and 100% actual pixel size.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let dom = {};
  let activeItem = null;

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  function syncText() {
    if (!activeItem || !activeItem.outBlob) return;
    const { formatBytes } = SI.formatters;
    const fmt = SI.store.getFormat(activeItem.targetFormat);

    dom.modalTitle.textContent = activeItem.outName;
    if (dom.modalDownloadLabel) {
      dom.modalDownloadLabel.textContent = t('modal.downloadThis', { label: fmt.label });
    } else {
      dom.modalDownloadBtn.textContent = t('modal.downloadThis', { label: fmt.label });
    }

    const diff = activeItem.origSize - activeItem.outBlob.size;
    const pct = activeItem.origSize > 0 ? Math.round((diff / activeItem.origSize) * 100) : 0;
    const delta =
      pct >= 0 ? t('item.saved', { pct }) : t('item.larger', { pct: Math.abs(pct) });

    dom.modalMeta.textContent = t('modal.meta', {
      origSize: formatBytes(activeItem.origSize),
      label: fmt.label,
      outSize: formatBytes(activeItem.outBlob.size),
      w: activeItem.outWidth,
      h: activeItem.outHeight,
      delta
    });
  }

  function open(item) {
    if (!item || item.status !== 'done' || !item.outBlob) return;
    activeItem = item;
    syncText();
    dom.compareStage?.classList.remove('is-zoomed');
    dom.compareOutImg.src = item.outPreviewUrl || item.outUrl;
    dom.compareOutImg.alt = item.outName;
    dom.compareModal.classList.add('open');
  }

  function close() {
    dom.compareModal.classList.remove('open');
    dom.compareStage?.classList.remove('is-zoomed');
    activeItem = null;
  }

  function init(refs) {
    dom = refs;

    dom.compareStage?.addEventListener('click', () => {
      dom.compareStage.classList.toggle('is-zoomed');
    });

    dom.closeModalBtn.addEventListener('click', close);
    dom.compareModal.addEventListener('click', e => {
      if (e.target === dom.compareModal) close();
    });
    dom.modalDownloadBtn.addEventListener('click', () => {
      if (activeItem?.outUrl) {
        SI.download.triggerDownload(activeItem.outUrl, activeItem.outName);
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && dom.compareModal.classList.contains('open')) {
        close();
      }
    });
  }

  SI.compareModal = { init, open, close, syncText };
})(window);
