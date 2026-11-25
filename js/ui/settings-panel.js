/**
 * Settings Panel UI
 * Renders the main Step-1 Format Bar, context-aware quick bar (JPG white/black fill, ICO size, SVG mode),
 * and the Basic drawer (presets, quality, dimensions, resize mode, background color).
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let dom = {};
  let callbacks = {};
  let debounceTimer = null;

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  function scheduleReconvert() {
    if (!SI.store.state.items.length) return;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (callbacks.onReconvertAll) callbacks.onReconvertAll(false);
    }, 320);
  }

  function renderFormatButtons() {
    const { outputFormats, settings } = SI.store.state;
    const { escapeHtml } = SI.formatters;
    const popular = new Set(['webp', 'png', 'jpg', 'avif']);

    dom.formatSelector.innerHTML = outputFormats
      .map(fmt => {
        const active = fmt.id === settings.format ? 'active' : '';
        const badge = SI.i18n ? SI.i18n.getFormatBadge(fmt) : fmt.badge || fmt.ext.toUpperCase();
        const desc = SI.i18n ? SI.i18n.getFormatDesc(fmt) : fmt.description;
        return `
          <button type="button" class="format-btn ${popular.has(fmt.id) ? '' : 'format-extra'} ${active}" data-format="${escapeHtml(fmt.id)}" title="${escapeHtml(desc)}">
            <span class="format-btn-name">${escapeHtml(fmt.label)}</span>
            <span class="format-btn-tag">${escapeHtml(badge)}</span>
          </button>
        `;
      })
      .join('');
  }

  function renderPresets() {
    const presets = SI.store.state.presetsConfig?.presets || [];
    const { escapeHtml } = SI.formatters;

    dom.presetsBar.innerHTML =
      `<span class="presets-label"><img class="ui-icon" src="./assets/icons/sparkles.svg" alt="" width="14" height="14" aria-hidden="true" />${escapeHtml(t('presets.label'))}</span>` +
      presets
        .map(p => {
          const text = SI.i18n ? SI.i18n.getPresetText(p) : { name: p.name, tag: p.tag };
          return `
          <button type="button" class="preset-chip" data-preset="${escapeHtml(p.id)}">
            <span>${escapeHtml(text.name)}</span>
            <span class="preset-tag">${escapeHtml(text.tag)}</span>
          </button>
        `;
        })
        .join('');
  }

  const ICO_AVAILABLE_SIZES = [16, 32, 48, 64, 128, 256];

  function renderIcoSizeChips() {
    if (!dom.icoSizesGroup) return;
    const selected = new Set(SI.store.getIcoSizesArray(SI.store.state.settings.icoSizes));

    dom.icoSizesGroup.innerHTML = ICO_AVAILABLE_SIZES.map(size => {
      const active = selected.has(size);
      return `
        <button type="button" class="ico-size-chip ${active ? 'active' : ''}" data-ico-size="${size}" aria-pressed="${active}">
          <span class="ico-check-box" aria-hidden="true">
            <img class="ui-icon ico-check-icon" src="./assets/icons/check.svg" alt="" width="10" height="10" />
          </span>
          <span>${size}px</span>
        </button>
      `;
    }).join('');

    if (dom.icoSelectedCount) {
      dom.icoSelectedCount.textContent = t('quick.icoCount', { n: selected.size });
    }

    const activeKey = [...selected].sort((a, b) => a - b).join(',');
    dom.icoPresetGroup?.querySelectorAll('[data-ico-preset]').forEach(btn => {
      const match = btn.dataset.icoPreset === activeKey;
      btn.classList.toggle('active', match);
      btn.setAttribute('aria-pressed', String(match));
    });
  }

  function populateExtraSelects() {
    const { escapeHtml } = SI.formatters;
    const svgOpts = SI.store.state.formatsConfig?.svgModeOptions || [];

    renderIcoSizeChips();

    dom.svgModeSelect.innerHTML = svgOpts
      .map(opt => {
        const label = SI.i18n ? SI.i18n.getSvgOptionLabel(opt) : opt.label;
        return `<option value="${escapeHtml(opt.value)}">${escapeHtml(label)}</option>`;
      })
      .join('');
    dom.svgModeSelect.value = SI.store.state.settings.svgMode;
  }

  function syncBgSwatches() {
    const color = (SI.store.state.settings.bgColor || '#ffffff').toLowerCase();
    dom.bgSwatches?.querySelectorAll('[data-bg-color]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bgColor.toLowerCase() === color);
    });
  }

  function syncControlsToFormat() {
    const settings = SI.store.state.settings;
    const fmt = SI.store.getFormat(settings.format);

    dom.formatSelector.querySelectorAll('.format-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.format === fmt.id);
    });

    if (dom.formatHint) {
      dom.formatHint.textContent = SI.i18n ? SI.i18n.getFormatDesc(fmt) : fmt.description;
    }
    const targetFmtEl = document.getElementById('emptyTargetFormat');
    if (targetFmtEl) {
      targetFmtEl.textContent = `.${fmt.ext}`;
    }

    // Quality slider inside basic drawer
    if (fmt.lossy) {
      dom.qualityRange.disabled = false;
      dom.qualityRange.value = String(settings.quality);
      dom.qualityValue.textContent = `${settings.quality}%`;
      dom.qualityValue.classList.remove('lossless');
      dom.qualityHint.textContent =
        fmt.id === 'avif' ? t('basic.qualityHintAvif') : t('basic.qualityHintDefault');
    } else {
      dom.qualityRange.disabled = true;
      dom.qualityValue.textContent = t('basic.qualityLossless');
      dom.qualityValue.classList.add('lossless');
      dom.qualityHint.textContent = t('basic.qualityLosslessHint', { label: fmt.label });
    }

    // Transparent background controls
    const needsQuickBg = !fmt.supportsAlpha;
    const showColorPicker = needsQuickBg || settings.bgMode === 'fill';

    if (needsQuickBg) {
      dom.bgModeSelect.value = 'fill';
      dom.bgModeSelect.disabled = true;
      dom.bgHint.textContent = t('basic.bgHintNoAlpha', { label: fmt.label });
    } else {
      dom.bgModeSelect.disabled = false;
      dom.bgModeSelect.value = settings.bgMode;
      dom.bgHint.textContent = t('basic.bgHintAlpha');
    }
    dom.bgColorInput.classList.toggle('hidden', !showColorPicker);
    dom.bgColorInput.value = settings.bgColor || '#ffffff';
    syncBgSwatches();

    // Context-aware quick bar right below format pills
    const showIco = fmt.id === 'ico';
    const showSvg = fmt.id === 'svg';
    const showSvgColors = showSvg && settings.svgMode === 'vector';
    const showQuickBar = needsQuickBg || showIco || showSvg;

    dom.contextQuickBar.classList.toggle('hidden', !showQuickBar);
    dom.quickBgGroup.classList.toggle('hidden', !needsQuickBg);
    dom.icoField.classList.toggle('hidden', !showIco);
    dom.svgModeField.classList.toggle('hidden', !showSvg);
    dom.svgColorsField.classList.toggle('hidden', !showSvgColors);

    SI.advancedTools?.updateRenamePreview();
    SI.advancedTools?.updateDockBadges();
  }

  function syncAllInputsFromStore() {
    const s = SI.store.state.settings;
    dom.sizeLimitSide.value = s.sizeLimitSide;
    dom.sizeLimitValue.value = s.sizeLimitValue || '';
    dom.bgColorInput.value = s.bgColor || '#ffffff';
    renderIcoSizeChips();
    dom.svgModeSelect.value = s.svgMode || 'embed';
    dom.svgColorsRange.value = String(s.svgColors || 16);
    dom.svgColorsValue.textContent = t('quick.colorsUnit', { n: s.svgColors || 16 });
    syncControlsToFormat();
  }

  function rerenderLocale() {
    renderFormatButtons();
    renderPresets();
    populateExtraSelects();
    syncAllInputsFromStore();
  }

  function selectFormat(formatId, triggerReconvert = true) {
    const fmt = SI.store.getFormat(formatId);
    const settings = SI.store.state.settings;
    settings.format = fmt.id;
    if (fmt.lossy && fmt.defaultQuality) {
      settings.quality = fmt.defaultQuality;
    }
    if (fmt.supportsAlpha && dom.bgModeSelect.disabled) {
      settings.bgMode = 'transparent';
    }
    SI.store.applyGlobalFormatToItems(fmt.id);
    syncControlsToFormat();
    if (triggerReconvert) scheduleReconvert();
  }

  function applyPreset(presetId) {
    const presets = SI.store.state.presetsConfig?.presets || [];
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    const s = SI.store.state.settings;
    const ps = preset.settings || {};

    s.activeTemplateId = '';
    s.resizeMode = 'contain';
    s.sizeLimitValue = 0;
    if (ps.format) s.format = ps.format;
    if (typeof ps.quality === 'number') s.quality = ps.quality;
    s.maxWidth = parseInt(ps.maxWidth, 10) || 0;
    s.maxHeight = parseInt(ps.maxHeight, 10) || 0;
    if (ps.bgMode) s.bgMode = ps.bgMode;
    if (ps.bgColor) s.bgColor = ps.bgColor;
    if (ps.icoSizes) {
      s.icoSizesKey = ps.icoSizes;
      s.icoSizes = SI.store.getIcoSizesArray(ps.icoSizes);
    }
    if (ps.svgMode) s.svgMode = ps.svgMode;
    if (ps.svgColors) s.svgColors = ps.svgColors;

    SI.store.applyGlobalFormatToItems(s.format);
    syncAllInputsFromStore();
    SI.advancedTools?.renderTemplates();
    const loc = SI.i18n ? SI.i18n.getPresetText(preset) : { name: preset.name, tag: preset.tag };
    SI.toast.show(t('toast.presetApplied', { name: loc.name, tag: loc.tag }));
    if (SI.store.state.items.length && callbacks.onReconvertAll) {
      callbacks.onReconvertAll(false);
    }
  }

  function init(refs, cbs) {
    dom = refs;
    callbacks = cbs || {};

    rerenderLocale();

    dom.formatExpand.addEventListener('click', () => {
      const expanded = dom.formatSelector.classList.toggle('expanded');
      const key = expanded ? 'step1.fewerFormats' : 'step1.moreFormats';
      dom.formatExpand.setAttribute('aria-expanded', String(expanded));
      dom.formatExpand.dataset.i18n = key;
      dom.formatExpand.textContent = t(key);
    });
    dom.formatSelector.addEventListener('click', e => {
      const btn = e.target.closest('[data-format]');
      if (!btn) return;
      selectFormat(btn.dataset.format, true);
    });

    dom.presetsBar.addEventListener('click', e => {
      const btn = e.target.closest('[data-preset]');
      if (!btn) return;
      applyPreset(btn.dataset.preset);
    });

    dom.qualityRange.addEventListener('input', () => {
      SI.store.state.settings.quality = Number(dom.qualityRange.value);
      dom.qualityValue.textContent = `${dom.qualityRange.value}%`;
      SI.advancedTools?.updateDockBadges();
    });
    dom.qualityRange.addEventListener('change', scheduleReconvert);

    function applySizeLimit() {
      const s = SI.store.state.settings;
      s.sizeLimitSide = dom.sizeLimitSide.value;
      s.sizeLimitValue = Math.max(0, Math.min(16383, Math.floor(dom.sizeLimitValue.valueAsNumber) || 0));
      dom.sizeLimitValue.value = s.sizeLimitValue || '';
      s.maxWidth = 0;
      s.maxHeight = 0;
      s.resizeMode = 'contain';
      s.activeTemplateId = '';
      SI.advancedTools?.renderTemplates();
      SI.advancedTools?.updateDockBadges();
      scheduleReconvert();
    }
    dom.sizeLimitValue.addEventListener('change', applySizeLimit);
    dom.sizeLimitSide.addEventListener('change', () => {
      SI.store.state.settings.sizeLimitSide = dom.sizeLimitSide.value;
      if (dom.sizeLimitValue.value) applySizeLimit();
    });

    dom.bgModeSelect.addEventListener('change', () => {
      SI.store.state.settings.bgMode = dom.bgModeSelect.value;
      syncControlsToFormat();
      scheduleReconvert();
    });

    dom.bgColorInput.addEventListener('change', () => {
      SI.store.state.settings.bgColor = dom.bgColorInput.value || '#ffffff';
      syncBgSwatches();
      scheduleReconvert();
    });

    dom.bgSwatches?.addEventListener('click', e => {
      const btn = e.target.closest('[data-bg-color]');
      if (!btn) return;
      SI.store.state.settings.bgColor = btn.dataset.bgColor;
      dom.bgColorInput.value = btn.dataset.bgColor;
      syncBgSwatches();
      scheduleReconvert();
    });

    dom.icoPresetGroup?.addEventListener('click', e => {
      const btn = e.target.closest('[data-ico-preset]');
      if (!btn) return;
      const sizes = btn.dataset.icoPreset
        .split(',')
        .map(n => Number(n))
        .filter(Boolean);
      if (!sizes.length) return;
      SI.store.state.settings.icoSizes = SI.store.getIcoSizesArray(sizes);
      renderIcoSizeChips();
      scheduleReconvert();
    });

    dom.icoSizesGroup?.addEventListener('click', e => {
      const chip = e.target.closest('[data-ico-size]');
      if (!chip) return;
      const size = Number(chip.dataset.icoSize);
      const current = new Set(SI.store.getIcoSizesArray(SI.store.state.settings.icoSizes));

      if (current.has(size)) {
        if (current.size <= 1) {
          SI.toast.show(t('toast.icoMinOne'));
          return;
        }
        current.delete(size);
      } else {
        current.add(size);
      }

      SI.store.state.settings.icoSizes = [...current].sort((a, b) => a - b);
      renderIcoSizeChips();
      scheduleReconvert();
    });

    dom.svgModeSelect.addEventListener('change', () => {
      SI.store.state.settings.svgMode = dom.svgModeSelect.value;
      syncControlsToFormat();
      scheduleReconvert();
    });

    dom.svgColorsRange.addEventListener('input', () => {
      SI.store.state.settings.svgColors = Number(dom.svgColorsRange.value);
      dom.svgColorsValue.textContent = t('quick.colorsUnit', { n: dom.svgColorsRange.value });
    });
    dom.svgColorsRange.addEventListener('change', scheduleReconvert);

    dom.reconvertBtn.addEventListener('click', () => {
      if (callbacks.onReconvertAll) callbacks.onReconvertAll(true);
    });
  }

  SI.settingsPanel = {
    init,
    selectFormat,
    syncControlsToFormat,
    syncAllInputsFromStore,
    rerenderLocale
  };
})(window);
