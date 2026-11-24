/**
 * Format Capabilities Matrix UI
 * Renders all supported formats from data/formats.json alongside live browser capability status.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  function buildHtml() {
    const formats = SI.store.state.formatsConfig?.formats || [];
    const caps = SI.capabilities.state;
    const { escapeHtml } = SI.formatters;

    return formats
      .map(fmt => {
        const readTag =
          fmt.id === 'heic'
            ? `<span class="cap-tag cap-cloud">${escapeHtml(t('matrix.readHeic'))}</span>`
            : `<span class="cap-tag cap-ok">${escapeHtml(t('matrix.readOk'))}</span>`;

        let writeTag = '';
        if (!fmt.canWrite) {
          writeTag = `<span class="cap-tag cap-muted">${escapeHtml(t('matrix.writeReadOnly'))}</span>`;
        } else if (fmt.id === 'avif') {
          writeTag = caps.avifEncode
            ? `<span class="cap-tag cap-ok">${escapeHtml(t('matrix.writeNative'))}</span>`
            : `<span class="cap-tag cap-cloud">${escapeHtml(t('matrix.writeWasm'))}</span>`;
        } else if (fmt.id === 'webp' && caps.checked && !caps.webpEncode) {
          writeTag = `<span class="cap-tag cap-muted">${escapeHtml(t('matrix.writeUnsupported'))}</span>`;
        } else {
          writeTag = `<span class="cap-tag cap-ok">${escapeHtml(t('matrix.writeLocal'))}</span>`;
        }

        const desc = SI.i18n ? SI.i18n.getFormatDesc(fmt) : fmt.description;

        return `
          <div class="matrix-item">
            <div class="matrix-item-head">
              <span class="matrix-item-title">${escapeHtml(fmt.label)}</span>
              <div class="matrix-cap-tags">${readTag}${writeTag}</div>
            </div>
            <p class="matrix-item-desc">${escapeHtml(desc)}</p>
          </div>
        `;
      })
      .join('');
  }

  function render(containerOrList) {
    const targets = Array.isArray(containerOrList) ? containerOrList : [containerOrList];
    const html = buildHtml();
    targets.forEach(el => {
      if (el) el.innerHTML = html;
    });
  }

  SI.formatMatrixUI = { render };
})(window);
