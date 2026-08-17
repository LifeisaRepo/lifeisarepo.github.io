// Shared header behavior — runs on every layout (header.html is included everywhere,
// but main.js with the rest of the homepage logic is home.html-only).
(function () {
  // ---- mobile nav toggle ----
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () { navLinks.classList.toggle('open'); });
    navLinks.addEventListener('click', function (e) { if (e.target.tagName === 'A') navLinks.classList.remove('open'); });
  }

  // ---- brand typewriter ----
  (function () {
    var txt = document.querySelector('.brand-txt');
    if (!txt) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var strings = ['life is a repo', 'Sanjyot Dahale'];
    var cur = 0, phase = 'wait', idx = strings[0].length;
    var TYPE_MS = 55, DEL_MS = 35, WAIT_MS = 5000, PAUSE_MS = 320;
    function tick() {
      var s = strings[cur];
      if (phase === 'wait') { phase = 'delete'; setTimeout(tick, WAIT_MS); }
      else if (phase === 'delete') {
        if (idx > 0) { idx--; txt.textContent = s.slice(0, idx); setTimeout(tick, DEL_MS); }
        else { cur = (cur + 1) % strings.length; phase = 'type'; setTimeout(tick, PAUSE_MS); }
      } else {
        var ns = strings[cur];
        if (idx < ns.length) { idx++; txt.textContent = ns.slice(0, idx); setTimeout(tick, TYPE_MS); }
        else { phase = 'wait'; setTimeout(tick, WAIT_MS); }
      }
    }
    setTimeout(tick, WAIT_MS);
  })();
})();
