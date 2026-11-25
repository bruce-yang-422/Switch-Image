/**
 * String, byte size, filename, and image format detection helpers.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  const IMAGE_EXT_REGEX = /\.(png|jpe?g|jfif|gif|bmp|webp|avif|svg|ico|heic|heif|tiff?|psd|jxl|tga|raw|dng|cr2|cr3|nef|arw)$/i;

  function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const val = bytes / Math.pow(1024, i);
    return `${val >= 100 || i === 0 ? val.toFixed(0) : val.toFixed(1)} ${units[i]}`;
  }

  function replaceExtension(filename, newExt) {
    const cleanExt = String(newExt || 'webp').replace(/^\./, '').toLowerCase();
    const dot = filename.lastIndexOf('.');
    const base = dot > 0 ? filename.slice(0, dot) : filename;
    return `${base}.${cleanExt}`;
  }

  function getFileExtension(filename) {
    const dot = (filename || '').lastIndexOf('.');
    if (dot <= 0) return '';
    return filename.slice(dot + 1).toLowerCase();
  }

  function detectSourceFormatLabel(file) {
    const ext = getFileExtension(file?.name || '');
    if (ext) {
      if (ext === 'jpeg' || ext === 'jfif') return 'JPG';
      return ext.toUpperCase();
    }
    const mime = (file?.type || '').toLowerCase();
    if (mime.includes('jpeg')) return 'JPG';
    if (mime.includes('svg')) return 'SVG';
    if (mime.includes('icon')) return 'ICO';
    if (mime.includes('heic')) return 'HEIC';
    if (mime.includes('heif')) return 'HEIF';
    if (mime.startsWith('image/')) return mime.slice(6).toUpperCase();
    return 'IMG';
  }

  function isSupportedImageFile(file) {
    if (!file) return false;
    const type = (file.type || '').toLowerCase();
    if (type.startsWith('image/')) return true;
    return IMAGE_EXT_REGEX.test(file.name || '');
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, ch => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[ch]));
  }

  SI.formatters = {
    formatBytes,
    replaceExtension,
    getFileExtension,
    detectSourceFormatLabel,
    isSupportedImageFile,
    escapeHtml
  };
})(window);
