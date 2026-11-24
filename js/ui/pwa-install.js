/**
 * PWA Service Worker Registration & Platform-Tailored Install Experience
 * - Detects OS & browser (Windows, macOS Chromium, macOS Safari, iOS/iPadOS, Android, Linux)
 * - Prompts gently ONCE on first visit with OS-native terminology
 * - Provides low-key persistent install triggers inside About/Settings and desktop footer
 * - Automatically hides all install UI when already running as a standalone PWA
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  const SEEN_KEY = 'switchimage-pwa-first-prompt-seen';
  let deferredPrompt = null;
  let platform = 'desktop';
  let dom = {};
  let bannerTimer = null;

  const t = (key, params) => (SI.i18n ? SI.i18n.t(key, params) : key);

  function isStandalone() {
    return (
      Boolean(window.matchMedia?.('(display-mode: standalone)').matches) ||
      window.navigator.standalone === true
    );
  }

  function detectPlatform() {
    const ua = navigator.userAgent || '';
    const plat = navigator.platform || '';
    const isTouchMac = plat === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (/iphone|ipad|ipod/i.test(ua) || isTouchMac) return 'ios';
    if (/android/i.test(ua)) return 'android';
    if (/mac/i.test(plat) || /macintosh|mac os x/i.test(ua)) {
      const isSafari = /safari/i.test(ua) && !/chrome|crios|edg|opr|firefox|fxios/i.test(ua);
      return isSafari ? 'macos-safari' : 'macos';
    }
    if (/win/i.test(plat) || /windows/i.test(ua)) return 'windows';
    if (/linux/i.test(plat) || /linux/i.test(ua)) return 'linux';
    return 'desktop';
  }

  function isManualGuidePlatform() {
    return platform === 'ios' || platform === 'macos-safari';
  }

  function hasSeenFirstPrompt() {
    try {
      return localStorage.getItem(SEEN_KEY) === '1';
    } catch {
      return true;
    }
  }

  function markFirstPromptSeen() {
    try {
      localStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Ignore storage errors
    }
  }

  function getCopyForPlatform() {
    const keyMap = {
      windows: {
        title: 'pwa.win.title',
        desc: 'pwa.win.desc',
        cta: 'pwa.cta.install',
        entry: 'pwa.entry.windows'
      },
      macos: {
        title: 'pwa.mac.title',
        desc: 'pwa.mac.desc',
        cta: 'pwa.cta.install',
        entry: 'pwa.entry.macos'
      },
      'macos-safari': {
        title: 'pwa.macSafari.title',
        desc: 'pwa.macSafari.desc',
        cta: 'pwa.cta.gotIt',
        entry: 'pwa.entry.macSafari'
      },
      ios: {
        title: 'pwa.ios.title',
        desc: 'pwa.ios.desc',
        cta: 'pwa.cta.gotIt',
        entry: 'pwa.entry.ios'
      },
      android: {
        title: 'pwa.android.title',
        desc: 'pwa.android.desc',
        cta: 'pwa.cta.installMobile',
        entry: 'pwa.entry.android'
      },
      linux: {
        title: 'pwa.linux.title',
        desc: 'pwa.linux.desc',
        cta: 'pwa.cta.install',
        entry: 'pwa.entry.desktop'
      },
      desktop: {
        title: 'pwa.desktop.title',
        desc: 'pwa.desktop.desc',
        cta: 'pwa.cta.install',
        entry: 'pwa.entry.desktop'
      }
    };
    const keys = keyMap[platform] || keyMap.desktop;
    return {
      title: t(keys.title),
      desc: t(keys.desc),
      cta: t(keys.cta),
      entry: t(keys.entry),
      later: t('pwa.cta.later')
    };
  }

  function syncText() {
    const copy = getCopyForPlatform();
    if (dom.pwaBannerTitle) dom.pwaBannerTitle.textContent = copy.title;
    if (dom.pwaBannerDesc) dom.pwaBannerDesc.textContent = copy.desc;
    if (dom.pwaBannerAction) dom.pwaBannerAction.textContent = copy.cta;
    if (dom.pwaBannerDismiss) dom.pwaBannerDismiss.textContent = copy.later;
    document.querySelectorAll('[data-pwa-entry-label]').forEach(el => {
      el.textContent = copy.entry;
    });
  }

  function setInstallEntriesVisible(visible) {
    document.querySelectorAll('[data-pwa-install-entry]').forEach(el => {
      el.classList.toggle('hidden', !visible);
    });
  }

  function showBanner() {
    if (!dom.pwaBanner || isStandalone()) return;
    syncText();
    dom.pwaBanner.classList.remove('hidden');
    requestAnimationFrame(() => dom.pwaBanner.classList.add('show'));
  }

  function hideBanner(markSeen = true) {
    if (markSeen) markFirstPromptSeen();
    if (!dom.pwaBanner) return;
    dom.pwaBanner.classList.remove('show');
    setTimeout(() => {
      if (!dom.pwaBanner.classList.contains('show')) {
        dom.pwaBanner.classList.add('hidden');
      }
    }, 220);
  }

  async function triggerInstall() {
    markFirstPromptSeen();

    if (deferredPrompt) {
      const promptEvent = deferredPrompt;
      deferredPrompt = null;
      hideBanner(true);
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice?.outcome === 'accepted') {
          setInstallEntriesVisible(false);
        }
      } catch {
        // User dismissed or browser declined prompt
      }
      return;
    }

    if (isManualGuidePlatform()) {
      SI.siteInfoModal?.close();
      showBanner();
    }
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    const isSecure =
      window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';
    if (!isSecure) return;

    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js', { scope: './' }).catch(() => {
        // Silently ignore SW registration failure in restricted environments
      });
    });
  }

  function init(refs) {
    dom = refs || {};
    platform = detectPlatform();
    registerServiceWorker();

    if (isStandalone()) {
      setInstallEntriesVisible(false);
      return;
    }

    syncText();

    // Native Chromium / Edge / Android installability event
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      deferredPrompt = e;
      setInstallEntriesVisible(true);

      if (!hasSeenFirstPrompt()) {
        clearTimeout(bannerTimer);
        bannerTimer = setTimeout(() => {
          if (deferredPrompt && !hasSeenFirstPrompt()) {
            showBanner();
            markFirstPromptSeen();
          }
        }, 1600);
      }
    });

    // iOS / macOS Safari manual install guidance
    if (isManualGuidePlatform() && window.location.protocol !== 'file:') {
      setInstallEntriesVisible(true);
      if (!hasSeenFirstPrompt()) {
        bannerTimer = setTimeout(() => {
          if (!hasSeenFirstPrompt() && !isStandalone()) {
            showBanner();
            markFirstPromptSeen();
          }
        }, 2200);
      }
    }

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      hideBanner(true);
      setInstallEntriesVisible(false);
      SI.toast?.show(t('pwa.toastInstalled'));
    });

    dom.pwaBannerAction?.addEventListener('click', () => {
      if (deferredPrompt) {
        triggerInstall();
      } else {
        hideBanner(true);
      }
    });

    dom.pwaBannerDismiss?.addEventListener('click', () => hideBanner(true));
    dom.pwaBannerClose?.addEventListener('click', () => hideBanner(true));

    document.addEventListener('click', e => {
      const trigger = e.target.closest('[data-pwa-install-trigger]');
      if (!trigger) return;
      triggerInstall();
    });

    SI.i18n?.onChange(syncText);
  }

  SI.pwaInstall = { init, triggerInstall, syncText };
})(window);
