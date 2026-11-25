/**
 * Application State Store
 * Manages JSON configs, global conversion settings, batch rename rules, watermark config, and file queue.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let nextId = 1;

  const store = {
    formatsConfig: null,
    presetsConfig: null,
    ecommerceTemplatesConfig: null,
    formatsMap: new Map(),
    outputFormats: [],
    items: [],
    settings: {
      format: 'webp',
      quality: 85,
      maxWidth: 0,
      maxHeight: 0,
      sizeLimitSide: 'longest',
      sizeLimitValue: 0,
      resizeMode: 'contain', // 'contain' | 'pad' | 'cover'
      bgMode: 'transparent',
      bgColor: '#ffffff',
      icoSizesKey: 'multi',
      icoSizes: [16, 32, 48, 256],
      svgMode: 'embed',
      svgColors: 16,
      activeTemplateId: '',
      templateSuffix: { name: true, size: false, digits: 0 }
    },
    rename: {
      prefix: '',
      suffix: '',
      customBase: '',
      addSequence: false,
      seqStart: 1,
      seqPad: 2
    },
    watermark: {
      enabled: false,
      type: 'text', // 'text' | 'image'
      text: '© SwitchImage',
      fontSizePct: 4.5,
      color: '#ffffff',
      opacity: 50,
      position: 'bottom-right', // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center' | 'tile'
      angle: 0,
      logoScalePct: 18,
      logoImage: null,
      logoUrl: null,
      logoName: ''
    }
  };

  function setConfigs(formatsConfig, presetsConfig, ecommerceTemplatesConfig) {
    store.formatsConfig = formatsConfig;
    store.presetsConfig = presetsConfig;
    store.ecommerceTemplatesConfig = ecommerceTemplatesConfig;
    store.formatsMap.clear();
    store.outputFormats = [];

    for (const fmt of formatsConfig.formats || []) {
      store.formatsMap.set(fmt.id, fmt);
      if (fmt.canWrite) {
        store.outputFormats.push(fmt);
      }
    }

    if (formatsConfig.defaultOutput && store.formatsMap.has(formatsConfig.defaultOutput)) {
      store.settings.format = formatsConfig.defaultOutput;
    }
  }

  function getFormat(id) {
    return store.formatsMap.get(id) || store.outputFormats[0];
  }

  function getIcoSizesArray(input) {
    if (Array.isArray(input) && input.length) {
      const cleaned = [...new Set(input.map(n => Number(n)).filter(n => n >= 16 && n <= 256))].sort(
        (a, b) => a - b
      );
      if (cleaned.length) return cleaned;
    }
    if (typeof input === 'string') {
      const opts = store.formatsConfig?.icoSizeOptions || [];
      const found = opts.find(o => o.value === input);
      if (found?.sizes?.length) return [...found.sizes];
    }
    return [16, 32, 48, 256];
  }

  function computeItemOutName(item, indexHint) {
    const fmt = getFormat(item.targetFormat);
    const idx = typeof indexHint === 'number' ? indexHint : Math.max(0, store.items.indexOf(item));
    const template = store.ecommerceTemplatesConfig?.templates?.find(tpl => tpl.id === store.settings.activeTemplateId);
    const options = store.settings.templateSuffix;
    let rename = store.rename;
    if (template) {
      const { platform, name } = SI.i18n.getTemplateDisplay(template, 'en');
      const parts = [
        options.name ? SI.renamer.toSnakeCase(`${platform} ${name}`) || SI.renamer.toSnakeCase(template.id) : '',
        options.size ? `${template.width}x${template.height}` : ''
      ].filter(Boolean);
      rename = {
        ...rename,
        suffix: (rename.suffix || '') + (parts.length ? `_${parts.join('_')}` : ''),
        ...(options.digits ? { addSequence: true, seqStart: 1, seqPad: options.digits } : {})
      };
    }
    return SI.renamer.buildOutputFilename(item.origName, fmt.ext, rename, idx);
  }

  function refreshAllOutputNames() {
    for (let i = 0; i < store.items.length; i++) {
      store.items[i].outName = computeItemOutName(store.items[i], i);
    }
  }

  function addFiles(files) {
    const { detectSourceFormatLabel } = SI.formatters;
    const defaultFmt = getFormat(store.settings.format);

    const created = files.map(file => {
      const origName = file.name || `image-${Date.now()}.png`;
      const origUrl = URL.createObjectURL(file);
      const item = {
        id: nextId++,
        file,
        origName,
        sourceFormatLabel: detectSourceFormatLabel(file),
        targetFormat: defaultFmt.id,
        useGlobalFormat: true,
        outName: '',
        origSize: file.size,
        origUrl,
        previewOrigUrl: origUrl,
        decodedBlob: null,
        origWidth: 0,
        origHeight: 0,
        outWidth: 0,
        outHeight: 0,
        outBlob: null,
        outUrl: null,
        outPreviewUrl: null,
        status: 'queued',
        error: ''
      };
      store.items.push(item);
      item.outName = computeItemOutName(item, store.items.length - 1);
      return item;
    });

    return created;
  }

  function revokeItemUrls(item) {
    if (item.origUrl) URL.revokeObjectURL(item.origUrl);
    if (item.previewOrigUrl && item.previewOrigUrl !== item.origUrl) {
      URL.revokeObjectURL(item.previewOrigUrl);
    }
    if (item.outUrl) URL.revokeObjectURL(item.outUrl);
    if (item.outPreviewUrl) URL.revokeObjectURL(item.outPreviewUrl);
  }

  function removeItemById(id) {
    const idx = store.items.findIndex(i => i.id === id);
    if (idx === -1) return false;
    revokeItemUrls(store.items[idx]);
    store.items.splice(idx, 1);
    refreshAllOutputNames();
    return true;
  }

  function clearAllItems() {
    for (const item of store.items) {
      revokeItemUrls(item);
    }
    store.items.length = 0;
  }

  function getItemById(id) {
    return store.items.find(i => i.id === id) || null;
  }

  function applyGlobalFormatToItems(formatId) {
    const fmt = getFormat(formatId);
    for (let i = 0; i < store.items.length; i++) {
      const item = store.items[i];
      if (item.useGlobalFormat) {
        item.targetFormat = fmt.id;
        item.outName = computeItemOutName(item, i);
      }
    }
  }

  function setItemFormat(item, formatId) {
    const fmt = getFormat(formatId);
    item.targetFormat = fmt.id;
    item.useGlobalFormat = fmt.id === store.settings.format;
    item.outName = computeItemOutName(item);
  }

  SI.store = {
    state: store,
    setConfigs,
    getFormat,
    getIcoSizesArray,
    computeItemOutName,
    refreshAllOutputNames,
    addFiles,
    removeItemById,
    clearAllItems,
    getItemById,
    applyGlobalFormatToItems,
    setItemFormat
  };
})(window);
