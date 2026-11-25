/**
 * SwitchImage Application Entry Point
 * Loads JSON configs, initializes i18n & theme, detects browser capabilities,
 * wires UI modules, drag-and-drop (files + nested folders), clipboard paste,
 * and smart download (single file = direct download, multiple files = ZIP).
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  async function loadJsonWithFallback(url, fallbackData) {
    if (window.location.protocol === 'file:') {
      return fallbackData;
    }
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch {
      return fallbackData;
    }
  }

  async function bootstrap() {
    // 1. Initialize i18n first so initial DOM renders in the user's language
    SI.i18n?.init();

    // 2. Load modular JSON configs (falls back gracefully when opened directly via file://)
    const [formatsConfig, presetsConfig, ecommerceTemplatesConfig] = await Promise.all([
      loadJsonWithFallback('./data/formats.json', SI.defaults.formatsConfig),
      loadJsonWithFallback('./data/presets.json', SI.defaults.presetsConfig),
      loadJsonWithFallback('./data/ecommerce-templates.json', SI.defaults.ecommerceTemplatesConfig)
    ]);
    SI.store.setConfigs(formatsConfig, presetsConfig, ecommerceTemplatesConfig);

    // 3. Cache DOM references
    const dom = {
      themeToggle: document.getElementById('themeToggle'),
      themeIcon: document.getElementById('themeIcon'),
      siteInfoBtn: document.getElementById('siteInfoBtn'),
      siteInfoModal: document.getElementById('siteInfoModal'),
      closeSiteInfoBtn: document.getElementById('closeSiteInfoBtn'),
      toast: document.getElementById('toast'),
      compatWarning: document.getElementById('compatWarning'),
      dropzone: document.getElementById('dropzone'),
      fileInput: document.getElementById('fileInput'),
      folderInput: document.getElementById('folderInput'),
      selectFilesBtn: document.getElementById('selectFilesBtn'),
      selectFolderBtn: document.getElementById('selectFolderBtn'),
      selectFilesBtnCompact: document.getElementById('selectFilesBtnCompact'),
      selectFolderBtnCompact: document.getElementById('selectFolderBtnCompact'),
      formatSelector: document.getElementById('formatSelector'),
      formatExpand: document.getElementById('formatExpand'),
      formatHint: document.getElementById('formatHint'),
      contextQuickBar: document.getElementById('contextQuickBar'),
      quickBgGroup: document.getElementById('quickBgGroup'),
      bgSwatches: document.getElementById('bgSwatches'),
      icoField: document.getElementById('icoField'),
      icoPresetGroup: document.getElementById('icoPresetGroup'),
      icoSizesGroup: document.getElementById('icoSizesGroup'),
      icoSelectedCount: document.getElementById('icoSelectedCount'),
      svgModeField: document.getElementById('svgModeField'),
      svgModeSelect: document.getElementById('svgModeSelect'),
      svgColorsField: document.getElementById('svgColorsField'),
      svgColorsRange: document.getElementById('svgColorsRange'),
      svgColorsValue: document.getElementById('svgColorsValue'),
      // Optional tools dock & drawer
      toolDockButtons: document.getElementById('toolDockButtons'),
      toolDrawer: document.getElementById('toolDrawer'),
      drawerPanels: Array.from(document.querySelectorAll('[data-drawer-panel]')),
      badgeBasic: document.getElementById('badgeBasic'),
      badgeEcommerce: document.getElementById('badgeEcommerce'),
      badgeRename: document.getElementById('badgeRename'),
      badgeWatermark: document.getElementById('badgeWatermark'),
      reconvertBtn: document.getElementById('reconvertBtn'),
      // Basic drawer controls
      presetsBar: document.getElementById('presetsBar'),
      qualityRange: document.getElementById('qualityRange'),
      qualityValue: document.getElementById('qualityValue'),
      qualityHint: document.getElementById('qualityHint'),
      sizeLimitSide: document.getElementById('sizeLimitSide'),
      sizeLimitValue: document.getElementById('sizeLimitValue'),
      bgModeSelect: document.getElementById('bgMode'),
      bgColorInput: document.getElementById('bgColor'),
      bgHint: document.getElementById('bgHint'),
      // E-commerce / Social / SEO / Niche templates drawer
      tplCategoryBar: document.getElementById('tplCategoryBar'),
      tplSearchInput: document.getElementById('tplSearchInput'),
      ecommerceGrid: document.getElementById('ecommerceGrid'),
      templateSuffixOptions: document.getElementById('templateSuffixOptions'),
      clearTemplateBtn: document.getElementById('clearTemplateBtn'),
      // Rename drawer
      renamePrefix: document.getElementById('renamePrefix'),
      renameSuffix: document.getElementById('renameSuffix'),
      renameBase: document.getElementById('renameBase'),
      renameSeqToggle: document.getElementById('renameSeqToggle'),
      renameSeqStart: document.getElementById('renameSeqStart'),
      renameSeqPad: document.getElementById('renameSeqPad'),
      renamePreview: document.getElementById('renamePreview'),
      resetRenameBtn: document.getElementById('resetRenameBtn'),
      // Watermark drawer
      wmEnabled: document.getElementById('wmEnabled'),
      wmControlsBody: document.getElementById('wmControlsBody'),
      wmType: document.getElementById('wmType'),
      wmTextFields: document.getElementById('wmTextFields'),
      wmImageFields: document.getElementById('wmImageFields'),
      wmText: document.getElementById('wmText'),
      wmColor: document.getElementById('wmColor'),
      wmPosition: document.getElementById('wmPosition'),
      wmFontSize: document.getElementById('wmFontSize'),
      wmFontSizeVal: document.getElementById('wmFontSizeVal'),
      wmOpacity: document.getElementById('wmOpacity'),
      wmOpacityVal: document.getElementById('wmOpacityVal'),
      wmAngle: document.getElementById('wmAngle'),
      wmAngleVal: document.getElementById('wmAngleVal'),
      wmLogoFile: document.getElementById('wmLogoFile'),
      wmLogoStatus: document.getElementById('wmLogoStatus'),
      wmLogoScale: document.getElementById('wmLogoScale'),
      wmLogoScaleVal: document.getElementById('wmLogoScaleVal'),
      // Results & list
      resultsSection: document.getElementById('resultsSection'),
      fileList: document.getElementById('fileList'),
      statsBar: document.getElementById('statsBar'),
      clearAllBtn: document.getElementById('clearAllBtn'),
      downloadAllBtn: document.getElementById('downloadAllBtn'),
      downloadZipBtn: document.getElementById('downloadZipBtn'),
      downloadPrimaryLabel: document.getElementById('downloadPrimaryLabel'),
      formatMatrixGrid: document.getElementById('formatMatrixGrid'),
      formatMatrixGridSheet: document.getElementById('formatMatrixGridSheet'),
      // Lightbox preview modal
      compareModal: document.getElementById('compareModal'),
      modalTitle: document.getElementById('modalTitle'),
      modalMeta: document.getElementById('modalMeta'),
      modalDownloadBtn: document.getElementById('modalDownloadBtn'),
      modalDownloadLabel: document.getElementById('modalDownloadLabel'),
      closeModalBtn: document.getElementById('closeModalBtn'),
      compareStage: document.getElementById('compareStage'),
      compareOutImg: document.getElementById('compareOutImg'),
      // PWA install banner
      pwaBanner: document.getElementById('pwaBanner'),
      pwaBannerTitle: document.getElementById('pwaBannerTitle'),
      pwaBannerDesc: document.getElementById('pwaBannerDesc'),
      pwaBannerAction: document.getElementById('pwaBannerAction'),
      pwaBannerDismiss: document.getElementById('pwaBannerDismiss'),
      pwaBannerClose: document.getElementById('pwaBannerClose')
    };

    // 4. Initialize core UI modules
    SI.theme.init(dom.themeToggle, dom.themeIcon);
    SI.toast.init(dom.toast);
    SI.compareModal.init(dom);
    SI.siteInfoModal?.init(dom);
    SI.pwaInstall?.init(dom);

    async function reconvertAll(showNotice = true) {
      const items = SI.store.state.items;
      if (!items.length) return;
      await SI.converter.convertBatch(items, item => SI.fileListUI.renderItem(item));
      if (showNotice) {
        SI.toast.show(t('toast.reconverted'));
      }
    }

    SI.settingsPanel.init(dom, {
      onReconvertAll: reconvertAll
    });

    SI.advancedTools.init(dom, {
      onReconvertAll: reconvertAll,
      onNamesUpdated: () => SI.fileListUI.renderAll()
    });

    SI.fileListUI.init(dom, {
      onPreview: item => SI.compareModal.open(item),
      onConvertSingle: item =>
        SI.converter.convertItem(item, updated => SI.fileListUI.renderItem(updated))
    });

    function renderCompatWarning() {
      const caps = SI.capabilities.state;
      if (caps.checked && !caps.webpEncode) {
        dom.compatWarning.innerHTML =
          '<img class="ui-icon" src="./assets/icons/alert.svg" alt="" width="18" height="18" aria-hidden="true" />' +
          `<span>${SI.formatters.escapeHtml(t('compat.noWebp'))}</span>`;
        dom.compatWarning.classList.add('show');
      }
    }

    function renderFormatMatrices() {
      SI.formatMatrixUI.render([dom.formatMatrixGrid, dom.formatMatrixGridSheet]);
    }

    // Re-render all dynamic components when language changes
    SI.i18n?.onChange(() => {
      SI.settingsPanel.rerenderLocale();
      SI.advancedTools.rerenderLocale();
      SI.fileListUI.renderAll();
      SI.compareModal.syncText();
      renderFormatMatrices();
      renderCompatWarning();
    });

    // 5. Detect browser capabilities & render format matrices
    await SI.capabilities.detectAll();
    renderCompatWarning();
    renderFormatMatrices();

    // 6. File ingestion handler
    async function handleFiles(fileListInput) {
      const files = Array.from(fileListInput || []);
      if (!files.length) return;

      const validFiles = [];
      let skipped = 0;

      for (const file of files) {
        if (SI.formatters.isSupportedImageFile(file)) {
          validFiles.push(file);
        } else {
          skipped++;
        }
      }

      if (skipped > 0) {
        SI.toast.show(t('toast.skipped', { added: validFiles.length, skipped }));
      }
      if (!validFiles.length) return;

      const newItems = SI.store.addFiles(validFiles);
      SI.fileListUI.renderAll();
      SI.advancedTools.updateRenamePreview();

      await SI.converter.convertBatch(newItems, item => SI.fileListUI.renderItem(item));
    }

    // Dropzone, file picker & folder picker bindings
    dom.dropzone.addEventListener('click', e => {
      if (e.target.closest('button')) return;
      dom.fileInput.click();
    });
    dom.dropzone.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dom.fileInput.click();
      }
    });

    [dom.selectFilesBtn, dom.selectFilesBtnCompact].forEach(btn => {
      btn?.addEventListener('click', e => {
        e.stopPropagation();
        dom.fileInput.click();
      });
    });

    [dom.selectFolderBtn, dom.selectFolderBtnCompact].forEach(btn => {
      btn?.addEventListener('click', e => {
        e.stopPropagation();
        dom.folderInput.click();
      });
    });

    dom.fileInput.addEventListener('change', e => {
      handleFiles(e.target.files);
      dom.fileInput.value = '';
    });

    dom.folderInput?.addEventListener('change', e => {
      handleFiles(e.target.files);
      dom.folderInput.value = '';
    });

    ['dragenter', 'dragover'].forEach(evt => {
      dom.dropzone.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
        dom.dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(evt => {
      dom.dropzone.addEventListener(evt, e => {
        e.preventDefault();
        e.stopPropagation();
        dom.dropzone.classList.remove('dragover');
      });
    });

    dom.dropzone.addEventListener('drop', async e => {
      const files = await SI.folderReader.extractFilesFromDataTransfer(e.dataTransfer);
      handleFiles(files);
    });

    // Clipboard paste support
    document.addEventListener('paste', e => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;

      const files = [];
      for (const item of e.clipboardData?.items || []) {
        if (item.kind === 'file') {
          const f = item.getAsFile();
          if (f && SI.formatters.isSupportedImageFile(f)) files.push(f);
        }
      }
      if (files.length) {
        handleFiles(files);
        SI.toast.show(t('toast.pasted', { n: files.length }));
      }
    });

    // Toolbar actions
    dom.clearAllBtn.addEventListener('click', () => {
      SI.store.clearAllItems();
      SI.fileListUI.renderAll();
      SI.advancedTools.updateRenamePreview();
    });

    dom.downloadAllBtn.addEventListener('click', async () => {
      const done = SI.store.state.items.filter(i => i.status === 'done' && i.outUrl);
      if (!done.length) return;
      await SI.download.downloadSequentially(
        done.map(i => ({ url: i.outUrl, name: i.outName }))
      );
      SI.toast.show(t('toast.downloadedSeq', { n: done.length }));
    });

    dom.downloadZipBtn.addEventListener('click', async () => {
      const done = SI.store.state.items.filter(i => i.status === 'done' && i.outBlob);
      if (!done.length) return;

      if (done.length === 1) {
        const single = done[0];
        SI.download.triggerDownload(single.outUrl || single.outBlob, single.outName);
        SI.toast.show(t('toast.downloadedOne', { name: single.outName }));
        return;
      }

      dom.downloadZipBtn.disabled = true;
      try {
        const zipBlob = await SI.zipBuilder.buildZipBlob(
          done.map(i => ({ name: i.outName, blob: i.outBlob }))
        );
        SI.download.triggerDownload(zipBlob, 'SwitchImage_Batch.zip');
        SI.toast.show(t('toast.zipDone', { n: done.length }));
      } catch (err) {
        SI.toast.show(t('toast.zipFail', { msg: err?.message || err }));
      } finally {
        dom.downloadZipBtn.disabled = false;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', bootstrap);
})(window);
