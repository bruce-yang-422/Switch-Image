/**
 * 3-Mode Theme Controller (Light / Dark / System)
 * Syncs segmented icon controls, mobile cycle icon button, live OS preference listener,
 * and theme mode caption across index.html and 404.html.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});
  const STORAGE_KEY = 'switchimage-theme';
  const MODES = ['light', 'dark', 'system'];

  const ICONS = {
    light: './assets/icons/sun.svg',
    dark: './assets/icons/moon.svg',
    system: './assets/icons/monitor.svg'
  };

  let iconElRef = null;
  let currentMode = 'system';
  let mediaQuery = null;

  function resolveEffectiveTheme(mode) {
    if (mode === 'light' || mode === 'dark') return mode;
    return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
  }

  function updateModeLabel() {
    const keyMap = {
      light: 'sheet.themeLight',
      dark: 'sheet.themeDark',
      system: 'sheet.themeSystem'
    };
    const labelText = SI.i18n ? SI.i18n.t(keyMap[currentMode]) : currentMode;
    document.querySelectorAll('[data-theme-mode-label]').forEach(el => {
      el.textContent = labelText;
    });
  }

  function apply(mode) {
    const normalized = MODES.includes(mode) ? mode : 'system';
    currentMode = normalized;
    const effective = resolveEffectiveTheme(normalized);

    document.documentElement.setAttribute('data-theme', effective);
    document.documentElement.setAttribute('data-theme-mode', normalized);

    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch {
      // Ignore storage errors
    }

    if (iconElRef) {
      iconElRef.src = ICONS[normalized];
      iconElRef.classList.toggle('icon-adaptive', normalized !== 'light');
    }

    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      const active = btn.dataset.themeBtn === normalized;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    updateModeLabel();
  }

  function cycleMode() {
    const idx = MODES.indexOf(currentMode);
    const next = MODES[(idx + 1) % MODES.length];
    apply(next);
  }

  function init(toggleBtn, iconEl) {
    iconElRef = iconEl || null;
    mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    apply(MODES.includes(saved) ? saved : 'system');

    if (mediaQuery) {
      const onSystemChange = () => {
        if (currentMode === 'system') apply('system');
      };
      if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', onSystemChange);
      } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(onSystemChange);
      }
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', cycleMode);
    }

    document.addEventListener('click', e => {
      const btn = e.target.closest('[data-theme-btn]');
      if (!btn) return;
      apply(btn.dataset.themeBtn);
    });

    SI.i18n?.onChange(updateModeLabel);
  }

  SI.theme = { init, apply, cycleMode, getMode: () => currentMode };
})(window);
