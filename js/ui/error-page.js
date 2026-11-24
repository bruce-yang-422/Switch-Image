/**
 * 404 Error Page Controller
 * Initializes i18n and theme persistence, displays the requested missing path,
 * and ensures Home / Back navigation works across root domains, GitHub Pages subpaths, and file://.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function resolveHomeHref() {
    const { protocol, hostname, pathname } = window.location;
    if (protocol === 'file:') return './index.html';

    if (hostname.endsWith('.github.io')) {
      const segments = pathname.split('/').filter(Boolean);
      if (segments.length >= 1) {
        return `/${segments[0]}/`;
      }
    }
    return './index.html';
  }

  document.addEventListener('DOMContentLoaded', () => {
    SI.i18n?.init();

    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    SI.theme?.init(themeToggle, themeIcon);

    const homeHref = resolveHomeHref();
    const homeLink = document.getElementById('homeLink');
    const brandHomeLink = document.getElementById('brandHomeLink');
    if (homeLink) homeLink.setAttribute('href', homeHref);
    if (brandHomeLink) brandHomeLink.setAttribute('href', homeHref);

    const pathEl = document.getElementById('missingPath');
    const rawPath = window.location.pathname + window.location.search;
    function renderMissingPath() {
      if (!pathEl || window.location.protocol === 'file:') return;
      if (rawPath && !rawPath.endsWith('/404.html')) {
        pathEl.textContent = SI.i18n
          ? SI.i18n.t('err404.pathLabel', { path: rawPath })
          : `請求路徑：${rawPath}`;
        pathEl.classList.remove('hidden');
      }
    }
    renderMissingPath();
    SI.i18n?.onChange(renderMissingPath);

    const goBackBtn = document.getElementById('goBackBtn');
    if (goBackBtn) {
      goBackBtn.addEventListener('click', () => {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = homeHref;
        }
      });
    }
  });
})(window);
