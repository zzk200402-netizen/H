'use strict';
(() => {
  const endpoint = 'https://zzk200402.goatcounter.com/count';
  const local = /^(localhost|127(?:\.\d+){3}|\[?::1\]?)$/.test(location.hostname);
  let pending = null, lastPath = '', loading = false;
  window.goatcounter = {no_onload: true, no_events: true};

  function send() {
    const gc = window.goatcounter;
    if (!pending || !navigator.onLine || typeof gc?.count !== 'function') return;
    if (typeof gc.filter === 'function' && gc.filter()) {
      pending = null;
      return;
    }
    const event = pending;
    pending = null;
    try { gc.count(event); } catch { /* Reading continues if statistics fail. */ }
  }

  window.buhuanAnalytics = {
    page(route, title) {
      if (local || !['http:', 'https:'].includes(location.protocol) || !navigator.onLine) return;
      const normalized = route.split('?')[0] || 'home';
      if (!/^(home|toc|read\/(c\d{3}|preface|afterword))$/.test(normalized)) return;
      const path = location.pathname + '#' + normalized;
      if (path === lastPath) return;
      lastPath = path;
      pending = {path, title};
      if (typeof window.goatcounter?.count === 'function') {
        send();
        return;
      }
      if (loading) return;
      loading = true;
      const script = document.createElement('script');
      script.src = 'https://gc.zgo.at/count.js';
      script.async = true;
      script.dataset.goatcounter = endpoint;
      script.onload = send;
      script.onerror = () => {
        pending = null;
        loading = false;
        lastPath = '';
        script.remove();
      };
      document.head.append(script);
    }
  };
})();
