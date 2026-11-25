/**
 * Switch Image Service Worker for app v0.1.1
 * Enables full offline image conversion with stale-while-revalidate caching
 * using relative paths (compatible with root domains and GitHub Pages subpaths).
 */
const CACHE_NAME = 'switchimage-static-v0.1.10';

const CORE_ASSETS = [
  './',
  './index.html',
  './404.html',
  './manifest.json',
  './css/tokens.css',
  './css/base.css',
  './css/hero.css',
  './css/layout.css',
  './css/components.css',
  './css/error.css',
  './data/formats.json',
  './data/presets.json',
  './data/ecommerce-templates.json',
  './js/config/defaults.js',
  './js/core/i18n.js',
  './js/core/capabilities.js',
  './js/core/watermark.js',
  './js/core/store.js',
  './js/core/converter.js',
  './js/utils/formatters.js',
  './js/utils/renamer.js',
  './js/utils/folder-reader.js',
  './js/utils/download.js',
  './js/utils/zip-builder.js',
  './js/decoders/heic-decoder.js',
  './js/decoders/image-decoder.js',
  './js/decoders/pro-image-worker.js',
  './js/encoders/canvas-encoder.js',
  './js/encoders/gif-encoder.js',
  './js/encoders/ico-encoder.js',
  './js/encoders/svg-encoder.js',
  './js/encoders/bmp-encoder.js',
  './js/ui/theme.js',
  './js/ui/toast.js',
  './js/ui/settings-panel.js',
  './js/ui/advanced-tools.js',
  './js/ui/file-list.js',
  './js/ui/compare-modal.js',
  './js/ui/format-matrix.js',
  './js/ui/site-info-modal.js',
  './js/ui/pwa-install.js',
  './js/ui/error-page.js',
  './js/app.js',
  './assets/brand/logo.svg',
  './assets/brand/icon-512.png',
  './assets/brand/og-cover.png',
  './assets/brand/readme-banner.png',
  './assets/favicon/favicon.ico',
  './assets/favicon/apple-touch-icon.png',
  './assets/illustrations/dropzone-hero.svg',
  './assets/illustrations/not-found.svg',
  './assets/icons/alert.svg',
  './assets/icons/arrow-left.svg',
  './assets/icons/bolt.svg',
  './assets/icons/check.svg',
  './assets/icons/chevron-down.svg',
  './assets/icons/close.svg',
  './assets/icons/download.svg',
  './assets/icons/folder.svg',
  './assets/icons/globe.svg',
  './assets/icons/grid.svg',
  './assets/icons/home.svg',
  './assets/icons/image.svg',
  './assets/icons/info.svg',
  './assets/icons/install-app.svg',
  './assets/icons/layers.svg',
  './assets/icons/monitor.svg',
  './assets/icons/moon.svg',
  './assets/icons/plus.svg',
  './assets/icons/refresh.svg',
  './assets/icons/search.svg',
  './assets/icons/shield.svg',
  './assets/icons/sliders.svg',
  './assets/icons/sparkles.svg',
  './assets/icons/stamp.svg',
  './assets/icons/sun.svg',
  './assets/icons/swap.svg',
  './assets/icons/tag.svg',
  './assets/icons/trash.svg',
  './assets/icons/unlock.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CORE_ASSETS.map(url => cache.add(url)))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key.startsWith('switchimage-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(cached => {
      const networkFetch = fetch(req)
        .then(res => {
          if (res && res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
