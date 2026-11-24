/**
 * Batch Filename Renamer
 * Supports prefix, suffix, optional base-name replacement, and zero-padded sequential numbering.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function sanitizeSegment(str) {
    return String(str || '')
      .replace(/[\\/:*?"<>|]/g, '_')
      .trim();
  }

  function stripExtension(filename) {
    const dot = (filename || '').lastIndexOf('.');
    return dot > 0 ? filename.slice(0, dot) : filename || 'image';
  }

  /**
   * Builds the final output filename according to rename settings.
   * @param {string} origName - Original filename (e.g. "IMG_001.HEIC")
   * @param {string} newExt - Target extension without dot (e.g. "webp")
   * @param {object} renameCfg - { prefix, suffix, customBase, addSequence, seqStart, seqPad }
   * @param {number} index - 0-based position in the batch
   */
  function buildOutputFilename(origName, newExt, renameCfg, index = 0) {
    const cfg = renameCfg || {};
    const cleanExt = String(newExt || 'webp').replace(/^\./, '').toLowerCase();

    const prefix = sanitizeSegment(cfg.prefix);
    const suffix = sanitizeSegment(cfg.suffix);
    const customBase = sanitizeSegment(cfg.customBase);
    const base = customBase || stripExtension(origName);

    let seqPart = '';
    if (cfg.addSequence) {
      const start = Number.isFinite(Number(cfg.seqStart)) ? Number(cfg.seqStart) : 1;
      const pad = Math.min(6, Math.max(1, Number(cfg.seqPad) || 2));
      const num = Math.max(0, start + index);
      seqPart = `_${String(num).padStart(pad, '0')}`;
    }

    const stem = `${prefix}${base}${suffix}${seqPart}` || 'image';
    return `${stem}.${cleanExt}`;
  }

  SI.renamer = {
    sanitizeSegment,
    buildOutputFilename
  };
})(window);
