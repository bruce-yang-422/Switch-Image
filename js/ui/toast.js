/**
 * Toast Notification Helper
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  let toastEl = null;
  let timer = null;

  function init(element) {
    toastEl = element;
  }

  function show(message, duration = 2600) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  SI.toast = { init, show };
})(window);
