/**
 * Site Info & Settings Controller
 * - Desktop (> 640px): Anchored floating popover directly below the info icon button.
 * - Mobile (<= 640px): Full-width rounded bottom sheet.
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let modalEl = null;
  let triggerBtn = null;

  function positionPopover() {
    if (!modalEl || !triggerBtn) return;
    if (window.innerWidth <= 640) {
      modalEl.style.removeProperty('--popover-top');
      modalEl.style.removeProperty('--popover-right');
      return;
    }
    const rect = triggerBtn.getBoundingClientRect();
    const top = Math.max(12, Math.round(rect.bottom + 10));
    const right = Math.max(12, Math.round(window.innerWidth - rect.right));
    modalEl.style.setProperty('--popover-top', `${top}px`);
    modalEl.style.setProperty('--popover-right', `${right}px`);
  }

  function isOpen() {
    return Boolean(modalEl?.classList.contains('open'));
  }

  function open() {
    if (!modalEl) return;
    positionPopover();
    modalEl.classList.add('open');
    triggerBtn?.classList.add('active');
    triggerBtn?.setAttribute('aria-expanded', 'true');
  }

  function close() {
    if (!modalEl) return;
    modalEl.classList.remove('open');
    triggerBtn?.classList.remove('active');
    triggerBtn?.setAttribute('aria-expanded', 'false');
  }

  function toggle() {
    if (isOpen()) close();
    else open();
  }

  function init(refs) {
    modalEl = refs.siteInfoModal;
    triggerBtn = refs.siteInfoBtn;
    if (!modalEl) return;

    triggerBtn?.setAttribute('aria-expanded', 'false');
    triggerBtn?.addEventListener('click', e => {
      e.stopPropagation();
      toggle();
    });

    refs.closeSiteInfoBtn?.addEventListener('click', close);

    modalEl.addEventListener('click', e => {
      if (e.target === modalEl) close();
    });

    window.addEventListener('resize', () => {
      if (isOpen()) positionPopover();
    });

    window.addEventListener('scroll', () => {
      if (isOpen() && window.innerWidth > 640) positionPopover();
    }, { passive: true });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isOpen()) {
        close();
      }
    });
  }

  SI.siteInfoModal = { init, open, close, toggle };
})(window);
