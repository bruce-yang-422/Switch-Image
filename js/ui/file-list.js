/**
 * File List & Summary Toolbar UI
 * Renders conversion queue items with per-item output format selector, size savings, and actions.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let dom = {};
  let callbacks = {};

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  function buildFormatOptionsHtml(selectedId) {
    const { escapeHtml } = SI.formatters;
    return SI.store.state.outputFormats
      .map(
        fmt =>
          `<option value="${escapeHtml(fmt.id)}" ${fmt.id === selectedId ? 'selected' : ''}>${escapeHtml(fmt.label)}</option>`
      )
      .join('');
  }

  function fillItemElement(el, item) {
    const { formatBytes, escapeHtml } = SI.formatters;
    const fmt = SI.store.getFormat(item.targetFormat);

    let statusHtml = '';
    let sizeHtml = `<span>${formatBytes(item.origSize)}</span>`;
    let dimHtml = '';

    if (item.status === 'done' && item.outBlob) {
      const diff = item.origSize - item.outBlob.size;
      const pct = item.origSize > 0 ? Math.round((diff / item.origSize) * 100) : 0;
      sizeHtml = `
        <span>${formatBytes(item.origSize)}</span>
        <span class="meta-arrow">→</span>
        <strong>${formatBytes(item.outBlob.size)}</strong>
      `;
      if (pct >= 0) {
        statusHtml = `<span class="status-tag status-done">${escapeHtml(t('item.saved', { pct }))}</span>`;
      } else {
        statusHtml = `<span class="status-tag status-larger">${escapeHtml(t('item.larger', { pct: Math.abs(pct) }))}</span>`;
      }
      const resized = item.origWidth !== item.outWidth || item.origHeight !== item.outHeight;
      dimHtml = resized
        ? `<span>${item.origWidth}×${item.origHeight} → ${item.outWidth}×${item.outHeight}</span>`
        : `<span>${item.outWidth}×${item.outHeight}</span>`;
    } else if (item.status === 'converting' || item.status === 'queued') {
      statusHtml = `<span class="status-tag status-working">${escapeHtml(t('item.converting'))}</span>`;
    } else if (item.status === 'error') {
      statusHtml = `<span class="status-tag status-error">${escapeHtml(item.error)}</span>`;
    }

    const thumbSrc = item.outPreviewUrl || item.outUrl || item.previewOrigUrl || item.origUrl;
    const previewLabel = escapeHtml(t('item.preview'));

    el.innerHTML = `
      <div class="thumb-wrap checkerboard" data-action="preview" data-preview-label="${previewLabel}" title="${escapeHtml(t('item.thumbTitle'))}">
        <img src="${thumbSrc}" alt="${escapeHtml(item.origName)}" loading="lazy" />
      </div>
      <div class="file-info">
        <div class="file-title-row">
          <div class="file-name" title="${escapeHtml(item.origName)} → ${escapeHtml(item.outName)}">${escapeHtml(item.outName)}</div>
          <span class="format-flow-badge">${escapeHtml(item.sourceFormatLabel)} → <span class="target-ext">${escapeHtml(fmt.label)}</span></span>
        </div>
        <div class="file-meta">
          ${sizeHtml}
          ${dimHtml}
          ${item.firstPageOnly ? `<span>${escapeHtml(t('decode.firstPage'))}</span>` : ''}
          ${item.rawPreview ? `<span>${escapeHtml(t('decode.rawPreview', { w: item.origWidth, h: item.origHeight }))}</span>` : ''}
          ${statusHtml}
        </div>
      </div>
      <div class="file-actions">
        <select class="item-format-select" data-action="change-format" title="${escapeHtml(t('item.formatTitle'))}" aria-label="${escapeHtml(t('item.formatTitle'))}">
          ${buildFormatOptionsHtml(item.targetFormat)}
        </select>
        <button type="button" class="btn btn-primary btn-sm" data-action="download" ${item.status !== 'done' ? 'disabled' : ''}>
          <img class="ui-icon icon-adaptive" src="./assets/icons/download.svg" alt="" width="14" height="14" aria-hidden="true" />
          ${escapeHtml(t('item.download'))}
        </button>
        <button type="button" class="btn btn-danger-ghost btn-icon-sm" data-action="remove" title="${escapeHtml(t('item.remove'))}" aria-label="${escapeHtml(t('item.remove'))}">
          <img class="ui-icon icon-adaptive" src="./assets/icons/close.svg" alt="" width="15" height="15" aria-hidden="true" />
        </button>
      </div>
    `;
  }

  function updateSummary() {
    const { formatBytes, escapeHtml } = SI.formatters;
    const items = SI.store.state.items;
    const total = items.length;
    const doneItems = items.filter(i => i.status === 'done' && i.outBlob);
    const origTotal = doneItems.reduce((sum, i) => sum + i.origSize, 0);
    const outTotal = doneItems.reduce((sum, i) => sum + i.outBlob.size, 0);
    const diff = origTotal - outTotal;
    const pct = origTotal > 0 ? Math.round((diff / origTotal) * 100) : 0;

    const isMulti = total > 1 || doneItems.length > 1;
    dom.downloadAllBtn.classList.toggle('hidden', !isMulti);
    dom.downloadAllBtn.disabled = doneItems.length <= 1;
    dom.downloadZipBtn.disabled = doneItems.length === 0;
    dom.reconvertBtn.disabled = total === 0;

    if (dom.downloadPrimaryLabel) {
      if (doneItems.length === 1) {
        const single = doneItems[0];
        const fmt = SI.store.getFormat(single.targetFormat);
        dom.downloadPrimaryLabel.textContent = t('results.downloadSingle', { label: fmt.label });
        dom.downloadZipBtn.title = single.outName;
      } else if (doneItems.length > 1) {
        dom.downloadPrimaryLabel.textContent = t('results.downloadZip', { n: doneItems.length });
        dom.downloadZipBtn.title = 'SwitchImage_Batch.zip';
      } else {
        dom.downloadPrimaryLabel.textContent = isMulti
          ? t('results.downloadZipDefault')
          : t('results.downloadDefault');
        dom.downloadZipBtn.title = '';
      }
    }

    let savingsBadge = '';
    if (doneItems.length > 0 && origTotal > 0) {
      if (diff >= 0) {
        savingsBadge = `<span class="savings-pill">${escapeHtml(t('results.savedBadge', { size: formatBytes(diff), pct }))}</span>`;
      } else {
        savingsBadge = `<span class="savings-pill negative">${escapeHtml(t('results.largerBadge', { size: formatBytes(Math.abs(diff)), pct: Math.abs(pct) }))}</span>`;
      }
    }

    dom.statsBar.innerHTML = `
      <span>${t('results.statsCountHtml', { total, done: doneItems.length })}</span>
      ${doneItems.length ? `<span>${formatBytes(origTotal)} → <strong>${formatBytes(outTotal)}</strong></span>` : ''}
      ${savingsBadge}
    `;
  }

  function renderAll() {
    const items = SI.store.state.items;
    const hasItems = items.length > 0;
    dom.resultsSection.classList.toggle('hidden', !hasItems);
    dom.dropzone?.classList.toggle('is-compact', hasItems);
    dom.reconvertBtn.classList.toggle('hidden', !hasItems);
    dom.reconvertBtn.disabled = !hasItems;

    dom.fileList.innerHTML = '';
    for (const item of items) {
      const el = document.createElement('div');
      el.className = 'file-item';
      el.dataset.id = String(item.id);
      dom.fileList.appendChild(el);
      fillItemElement(el, item);
    }
    updateSummary();
  }

  function renderItem(item) {
    const el = dom.fileList.querySelector(`.file-item[data-id="${item.id}"]`);
    if (el) fillItemElement(el, item);
    updateSummary();
  }

  function init(refs, cbs) {
    dom = refs;
    callbacks = cbs || {};

    dom.fileList.addEventListener('click', e => {
      const target = e.target.closest('[data-action]');
      if (!target || target.tagName === 'SELECT') return;
      const row = target.closest('.file-item');
      if (!row) return;
      const id = Number(row.dataset.id);
      const item = SI.store.getItemById(id);
      if (!item) return;

      const action = target.dataset.action;
      if (action === 'download' && item.outUrl) {
        SI.download.triggerDownload(item.outUrl, item.outName);
      } else if (action === 'preview' && item.status === 'done') {
        if (callbacks.onPreview) callbacks.onPreview(item);
      } else if (action === 'remove') {
        SI.store.removeItemById(id);
        renderAll();
      }
    });

    dom.fileList.addEventListener('change', e => {
      const select = e.target.closest('select[data-action="change-format"]');
      if (!select) return;
      const row = select.closest('.file-item');
      if (!row) return;
      const id = Number(row.dataset.id);
      const item = SI.store.getItemById(id);
      if (!item) return;

      SI.store.setItemFormat(item, select.value);
      if (callbacks.onConvertSingle) {
        callbacks.onConvertSingle(item);
      }
    });
  }

  SI.fileListUI = {
    init,
    renderAll,
    renderItem,
    updateSummary
  };
})(window);
