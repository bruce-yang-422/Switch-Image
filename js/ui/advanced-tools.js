/**
 * Progressive Disclosure Tool Dock & Advanced Scenario Controls
 * Keeps the main interface effortless; expands one focused drawer panel at a time on demand:
 * - Basic Quality & Resize
 * - E-commerce / Social / SEO Size Templates
 * - Batch Renaming
 * - Custom Watermark
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let dom = {};
  let callbacks = {};
  let activeDrawer = null;
  let activeCategory = 'all';
  let searchQuery = '';
  let debounceTimer = null;

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  function scheduleReconvert() {
    if (!SI.store.state.items.length) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (callbacks.onReconvertAll) callbacks.onReconvertAll(false);
    }, 320);
  }

  function setDrawer(name) {
    activeDrawer = activeDrawer === name ? null : name;
    dom.toolDrawer.classList.toggle('hidden', !activeDrawer);

    dom.toolDockButtons.querySelectorAll('[data-drawer]').forEach(btn => {
      const isOpen = btn.dataset.drawer === activeDrawer;
      btn.classList.toggle('active', isOpen);
      btn.setAttribute('aria-selected', String(isOpen));
    });

    dom.drawerPanels.forEach(panel => {
      panel.classList.toggle('hidden', panel.dataset.drawerPanel !== activeDrawer);
    });
  }

  function updateDockBadges() {
    const s = SI.store.state.settings;
    const r = SI.store.state.rename;
    const w = SI.store.state.watermark;
    const fmt = SI.store.getFormat(s.format);

    // Basic badge
    const basicParts = [];
    if (fmt.lossy && s.quality !== fmt.defaultQuality) basicParts.push(`${s.quality}%`);
    if (s.sizeLimitValue) {
      basicParts.push(`${s.sizeLimitValue} px`);
    } else if (s.maxWidth || s.maxHeight) {
      const autoLabel = t('dock.autoDim');
      basicParts.push(`${s.maxWidth || autoLabel}×${s.maxHeight || autoLabel}`);
    }
    if (dom.badgeBasic) {
      dom.badgeBasic.textContent = basicParts.length ? `· ${basicParts.join(' ')}` : '';
      dom.badgeBasic.closest('.dock-pill')?.classList.toggle('has-value', basicParts.length > 0);
    }

    // E-commerce badge
    const templates = SI.store.state.ecommerceTemplatesConfig?.templates || [];
    const activeTpl = templates.find(tpl => tpl.id === s.activeTemplateId);
    if (dom.badgeEcommerce) {
      dom.badgeEcommerce.textContent = activeTpl ? `· ${activeTpl.width}×${activeTpl.height}` : '';
      dom.badgeEcommerce.closest('.dock-pill')?.classList.toggle('has-value', Boolean(activeTpl));
    }

    // Rename badge
    const hasRename = Boolean(r.prefix || r.suffix || r.customBase || r.addSequence);
    if (dom.badgeRename) {
      dom.badgeRename.textContent = hasRename ? t('dock.badgeEnabled') : '';
      dom.badgeRename.closest('.dock-pill')?.classList.toggle('has-value', hasRename);
    }

    // Watermark badge
    if (dom.badgeWatermark) {
      dom.badgeWatermark.textContent = w.enabled ? t('dock.badgeOn') : '';
      dom.badgeWatermark.closest('.dock-pill')?.classList.toggle('has-value', Boolean(w.enabled));
    }
  }

  function updateRenamePreview() {
    const fmt = SI.store.getFormat(SI.store.state.settings.format);
    const sampleOrig = SI.store.state.items[0]?.origName || 'product_photo.png';
    const preview = SI.store.computeItemOutName({ origName: sampleOrig, targetFormat: fmt.id }, 0);
    if (dom.renamePreview) {
      dom.renamePreview.textContent = `${sampleOrig}  →  ${preview}`;
    }
    updateDockBadges();
  }

  function renderCategories() {
    if (!dom.tplCategoryBar) return;
    const cfg = SI.store.state.ecommerceTemplatesConfig || {};
    const categories = cfg.categories || [{ id: 'all', label: '全部' }];
    const templates = cfg.templates || [];
    const { escapeHtml } = SI.formatters;

    dom.tplCategoryBar.innerHTML = categories
      .map(cat => {
        const count =
          cat.id === 'all'
            ? templates.length
            : templates.filter(tpl => tpl.category === cat.id).length;
        const active = cat.id === activeCategory ? 'active' : '';
        const label = SI.i18n ? SI.i18n.getCategoryLabel(cat) : cat.label;
        return `
          <button type="button" class="tpl-cat-pill ${active}" data-tpl-cat="${escapeHtml(cat.id)}" role="tab" aria-selected="${cat.id === activeCategory}">
            ${escapeHtml(label)}
            <span class="tpl-cat-count">${count}</span>
          </button>
        `;
      })
      .join('');
  }

  function renderTemplates() {
    const templates = SI.store.state.ecommerceTemplatesConfig?.templates || [];
    const activeId = SI.store.state.settings.activeTemplateId;
    const { escapeHtml } = SI.formatters;
    const q = searchQuery.trim().toLowerCase();

    const filtered = templates.filter(tpl => {
      if (activeCategory !== 'all' && tpl.category !== activeCategory) return false;
      if (!q) return true;
      const loc = SI.i18n ? SI.i18n.getTemplateDisplay(tpl) : tpl;
      const hay = `${tpl.platform} ${tpl.name} ${tpl.desc} ${loc.platform} ${loc.name} ${tpl.width}x${tpl.height} ${tpl.width}×${tpl.height} ${tpl.format}`.toLowerCase();
      return hay.includes(q);
    });

    const modeLabels = {
      pad: t('tpl.modePad'),
      cover: t('tpl.modeCover'),
      contain: t('tpl.modeContain')
    };

    if (!filtered.length) {
      dom.ecommerceGrid.innerHTML = `<div class="tpl-empty">${escapeHtml(t('tpl.empty', { q: searchQuery }))}</div>`;
      return;
    }

    dom.ecommerceGrid.innerHTML = filtered
      .map(tpl => {
        const activeClass = tpl.id === activeId ? 'active' : '';
        const loc = SI.i18n ? SI.i18n.getTemplateDisplay(tpl) : tpl;
        return `
          <button type="button" class="tpl-card ${activeClass}" data-template="${escapeHtml(tpl.id)}" title="${escapeHtml(loc.desc)}">
            <div class="tpl-card-head">
              <span class="tpl-platform">${escapeHtml(loc.platform)}</span>
              <span class="tpl-dim">${tpl.width}×${tpl.height}</span>
            </div>
            <div class="tpl-name">${escapeHtml(loc.name)}</div>
            <div class="tpl-meta">${escapeHtml(tpl.format.toUpperCase())} · ${escapeHtml(modeLabels[tpl.resizeMode] || tpl.resizeMode)}</div>
          </button>
        `;
      })
      .join('');
  }

  function applyTemplate(templateId) {
    const templates = SI.store.state.ecommerceTemplatesConfig?.templates || [];
    const tpl = templates.find(item => item.id === templateId);
    if (!tpl) return;

    const s = SI.store.state.settings;
    s.activeTemplateId = tpl.id;
    s.format = tpl.format;
    s.quality = tpl.quality;
    s.maxWidth = tpl.width;
    s.maxHeight = tpl.height;
    s.resizeMode = tpl.resizeMode;
    s.sizeLimitValue = 0;
    s.bgMode = tpl.bgMode;
    s.bgColor = tpl.bgColor;

    SI.store.applyGlobalFormatToItems(s.format);
    SI.store.refreshAllOutputNames();
    SI.settingsPanel.syncAllInputsFromStore();
    renderTemplates();
    updateRenamePreview();

    const loc = SI.i18n ? SI.i18n.getTemplateDisplay(tpl) : tpl;
    SI.toast.show(
      t('toast.templateApplied', {
        platform: loc.platform,
        name: loc.name,
        w: tpl.width,
        h: tpl.height
      })
    );
    if (SI.store.state.items.length && callbacks.onReconvertAll) {
      callbacks.onReconvertAll(false);
    }
  }

  function clearTemplate() {
    const s = SI.store.state.settings;
    s.activeTemplateId = '';
    s.maxWidth = 0;
    s.maxHeight = 0;
    s.resizeMode = 'contain';
    s.sizeLimitValue = 0;
    SI.settingsPanel.syncAllInputsFromStore();
    renderTemplates();
    SI.store.refreshAllOutputNames();
    updateRenamePreview();
    callbacks.onNamesUpdated?.();
    SI.toast.show(t('toast.templateReset'));
    scheduleReconvert();
  }

  function syncWatermarkFields() {
    const w = SI.store.state.watermark;
    const isImg = w.type === 'image';
    dom.wmControlsBody.classList.toggle('disabled-block', !w.enabled);
    dom.wmTextFields.classList.toggle('hidden', isImg);
    dom.wmImageFields.classList.toggle('hidden', !isImg);
    if (w.logoImage && w.logoName && dom.wmLogoStatus) {
      dom.wmLogoStatus.textContent = t('wm.logoLoaded', {
        name: w.logoName,
        w: w.logoImage.naturalWidth,
        h: w.logoImage.naturalHeight
      });
    }
    updateDockBadges();
  }

  function rerenderLocale() {
    renderCategories();
    renderTemplates();
    syncWatermarkFields();
    updateRenamePreview();
  }

  function init(refs, cbs) {
    dom = refs;
    callbacks = cbs || {};

    rerenderLocale();

    dom.toolDockButtons.addEventListener('click', e => {
      const btn = e.target.closest('[data-drawer]');
      if (!btn) return;
      setDrawer(btn.dataset.drawer);
    });

    dom.tplCategoryBar?.addEventListener('click', e => {
      const btn = e.target.closest('[data-tpl-cat]');
      if (!btn) return;
      activeCategory = btn.dataset.tplCat;
      renderCategories();
      renderTemplates();
    });

    dom.tplSearchInput?.addEventListener('input', () => {
      searchQuery = dom.tplSearchInput.value;
      if (searchQuery.trim() && activeCategory !== 'all') {
        activeCategory = 'all';
        renderCategories();
      }
      renderTemplates();
    });

    dom.ecommerceGrid.addEventListener('click', e => {
      const card = e.target.closest('[data-template]');
      if (!card) return;
      applyTemplate(card.dataset.template);
    });

    dom.clearTemplateBtn.addEventListener('click', clearTemplate);
    dom.templateSuffixOptions.addEventListener('change', () => {
      const group = dom.templateSuffixOptions;
      SI.store.state.settings.templateSuffix = {
        name: group.querySelector('[name="templateSuffixName"]').checked,
        size: group.querySelector('[name="templateSuffixSize"]').checked,
        digits: Number(group.querySelector('#templateSuffixDigits').value)
      };
      SI.store.refreshAllOutputNames();
      updateRenamePreview();
      callbacks.onNamesUpdated?.();
    });

    function onRenameInputChange() {
      const r = SI.store.state.rename;
      r.prefix = dom.renamePrefix.value;
      r.suffix = dom.renameSuffix.value;
      r.customBase = dom.renameBase.value;
      r.addSequence = dom.renameSeqToggle.checked;
      r.seqStart = parseInt(dom.renameSeqStart.value, 10) || 1;
      r.seqPad = parseInt(dom.renameSeqPad.value, 10) || 2;

      SI.store.refreshAllOutputNames();
      updateRenamePreview();
      if (callbacks.onNamesUpdated) callbacks.onNamesUpdated();
    }

    [
      dom.renamePrefix,
      dom.renameSuffix,
      dom.renameBase,
      dom.renameSeqStart,
      dom.renameSeqPad
    ].forEach(el => el.addEventListener('input', onRenameInputChange));
    dom.renameSeqToggle.addEventListener('change', onRenameInputChange);

    dom.resetRenameBtn.addEventListener('click', () => {
      dom.renamePrefix.value = '';
      dom.renameSuffix.value = '';
      dom.renameBase.value = '';
      dom.renameSeqToggle.checked = false;
      dom.renameSeqStart.value = '1';
      dom.renameSeqPad.value = '2';
      onRenameInputChange();
      SI.toast.show(t('toast.renameReset'));
    });

    dom.wmEnabled.addEventListener('change', () => {
      SI.store.state.watermark.enabled = dom.wmEnabled.checked;
      syncWatermarkFields();
      scheduleReconvert();
    });

    dom.wmType.addEventListener('change', () => {
      SI.store.state.watermark.type = dom.wmType.value;
      syncWatermarkFields();
      scheduleReconvert();
    });

    dom.wmText.addEventListener('input', () => {
      SI.store.state.watermark.text = dom.wmText.value;
    });
    dom.wmText.addEventListener('change', scheduleReconvert);

    dom.wmColor.addEventListener('change', () => {
      SI.store.state.watermark.color = dom.wmColor.value;
      scheduleReconvert();
    });

    dom.wmPosition.addEventListener('change', () => {
      SI.store.state.watermark.position = dom.wmPosition.value;
      scheduleReconvert();
    });

    dom.wmFontSize.addEventListener('input', () => {
      SI.store.state.watermark.fontSizePct = Number(dom.wmFontSize.value);
      dom.wmFontSizeVal.textContent = `${dom.wmFontSize.value}%`;
    });
    dom.wmFontSize.addEventListener('change', scheduleReconvert);

    dom.wmOpacity.addEventListener('input', () => {
      SI.store.state.watermark.opacity = Number(dom.wmOpacity.value);
      dom.wmOpacityVal.textContent = `${dom.wmOpacity.value}%`;
    });
    dom.wmOpacity.addEventListener('change', scheduleReconvert);

    dom.wmAngle.addEventListener('input', () => {
      SI.store.state.watermark.angle = Number(dom.wmAngle.value);
      dom.wmAngleVal.textContent = `${dom.wmAngle.value}°`;
    });
    dom.wmAngle.addEventListener('change', scheduleReconvert);

    dom.wmLogoScale.addEventListener('input', () => {
      SI.store.state.watermark.logoScalePct = Number(dom.wmLogoScale.value);
      dom.wmLogoScaleVal.textContent = `${dom.wmLogoScale.value}%`;
    });
    dom.wmLogoScale.addEventListener('change', scheduleReconvert);

    dom.wmLogoFile.addEventListener('change', async e => {
      const file = e.target.files?.[0];
      if (!file) return;
      try {
        const w = SI.store.state.watermark;
        if (w.logoUrl) URL.revokeObjectURL(w.logoUrl);
        const url = URL.createObjectURL(file);
        const img = await SI.imageDecoder.loadImageFromUrl(url);
        w.logoUrl = url;
        w.logoImage = img;
        w.logoName = file.name;
        dom.wmLogoStatus.textContent = t('wm.logoLoaded', {
          name: file.name,
          w: img.naturalWidth,
          h: img.naturalHeight
        });
        if (!w.enabled) {
          w.enabled = true;
          dom.wmEnabled.checked = true;
          syncWatermarkFields();
        }
        scheduleReconvert();
      } catch {
        SI.toast.show(t('toast.logoError'));
      }
      dom.wmLogoFile.value = '';
    });
  }

  SI.advancedTools = {
    init,
    setDrawer,
    renderTemplates,
    updateRenamePreview,
    updateDockBadges,
    rerenderLocale
  };
})(window);
