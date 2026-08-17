(function () {
  var body = document.body;
  function motionOff() { return matchMedia('(prefers-reduced-motion: reduce)').matches || body.getAttribute('data-motion') === 'off'; }

  // ---- hero role type-on ----
  (function () {
    var el = document.querySelector('.role-type');
    if (!el || motionOff()) return;
    var full = el.textContent; el.textContent = '';
    var i = 0;
    (function tick() { if (i > full.length) return; el.textContent = full.slice(0, i); i++; setTimeout(tick, 45); })();
  })();

  // ---- live readout: real FPS + timecode ----
  (function () {
    var fpsEl = document.getElementById('roFps');
    var tcEl = document.getElementById('roTc');
    var resEl = document.getElementById('roRes');
    if (resEl) resEl.textContent = window.innerWidth + '×' + window.innerHeight;
    window.addEventListener('resize', function () { if (resEl) resEl.textContent = window.innerWidth + '×' + window.innerHeight; });
    if (motionOff()) { return; }
    var last = performance.now(), frames = 0, acc = 0;
    var start = performance.now();
    function pad(n, w) { n = String(n); while (n.length < w) n = '0' + n; return n; }
    function loop(now) {
      frames++; acc += now - last; last = now;
      if (acc >= 500) {
        if (fpsEl) fpsEl.textContent = Math.min(120, Math.round(frames * 1000 / acc));
        frames = 0; acc = 0;
        var t = (now - start) / 1000;
        var f = Math.floor((t % 1) * 24);
        var s = Math.floor(t) % 60, m = Math.floor(t / 60) % 60, h = Math.floor(t / 3600) % 24;
        if (tcEl) tcEl.textContent = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(f, 2);
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  // ---- client work: filters + collapse ----
  var grid = document.getElementById('projGrid');
  var moreBtn = document.getElementById('clientMore');
  var filtersEl = document.getElementById('filters');
  if (grid && moreBtn && filtersEl) {
    var cards = [].slice.call(grid.querySelectorAll('.card'));
    var curFilter = 'all', collapsed = true, DEFAULT = 4;
    function match(c) { return curFilter === 'all' || (c.getAttribute('data-tags') || '').split(' ').indexOf(curFilter) !== -1; }
    function render() {
      var matched = cards.filter(match), shown = 0;
      cards.forEach(function (c) {
        if (!match(c)) { c.classList.add('hide'); return; }
        shown++;
        c.classList.toggle('hide', collapsed && shown > DEFAULT);
      });
      if (matched.length > DEFAULT) {
        moreBtn.parentElement.style.display = '';
        moreBtn.textContent = collapsed ? ('show all (' + matched.length + ') →') : 'show less ↑';
      } else { moreBtn.parentElement.style.display = 'none'; }
    }
    filtersEl.addEventListener('click', function (e) {
      var b = e.target.closest('.filter'); if (!b) return;
      var a = filtersEl.querySelector('.active'); if (a) a.classList.remove('active');
      b.classList.add('active'); curFilter = b.getAttribute('data-filter'); collapsed = true; render();
    });
    moreBtn.addEventListener('click', function () { collapsed = !collapsed; render(); });
    render();
  }

  // ---- stagger reveals on grouped children ----
  [['#projGrid', '.card', 55], ['.sys-grid', '.sys', 65], ['.personal-grid', '.pcard', 90], ['.posts', '.post', 50]].forEach(function (cfg) {
    var g = document.querySelector(cfg[0]); if (!g) return;
    g.classList.remove('reveal');
    [].slice.call(g.children).forEach(function (el, i) { el.classList.add('reveal'); el.style.transitionDelay = (i % 8) * cfg[2] + 'ms'; });
  });

  // ---- scroll reveal ----
  var revealEls = [].slice.call(document.querySelectorAll('.reveal'));
  function startReveal() {
    var repo = document.getElementById('repo');
    if (!('IntersectionObserver' in window) || motionOff()) {
      revealEls.forEach(function (el) { el.classList.add('in'); });
      if (repo) repo.classList.add('in');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    if (repo) {
      var rio = new IntersectionObserver(function (entries) { entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rio.unobserve(en.target); } }); }, { threshold: 0.2 });
      rio.observe(repo);
    }
  }

  // ---- left rail + nav active state + scroll progress ----
  var sections = [].slice.call(document.querySelectorAll('section[id], header[id]'));
  var railTicks = [].slice.call(document.querySelectorAll('.rail-tick'));
  var navAnchors = [].slice.call(document.querySelectorAll('.nav-links a'));
  var railProg = document.getElementById('railProg');
  function railFor(id) { return railTicks.find(function (t) { return t.getAttribute('href') === '#' + id; }); }
  function navFor(id) { return navAnchors.find(function (a) { return a.getAttribute('href') === '#' + id; }); }
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          railTicks.forEach(function (t) { t.classList.remove('active'); });
          navAnchors.forEach(function (a) { a.classList.remove('active'); });
          var r = railFor(en.target.id); if (r) r.classList.add('active');
          var n = navFor(en.target.id); if (n) n.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }
  function onScroll() {
    var h = document.documentElement;
    var p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    if (railProg) railProg.style.height = Math.max(0, Math.min(1, p)) * 100 + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  startReveal();

  // ---- hero-tag role cycling (ht-v3) ----
  (function () {
    var tag = document.querySelector('.hero-tag[data-roles]');
    var word = document.querySelector('.hero-role-word');
    var caret = document.querySelector('.hero-tag-cur');
    if (!tag || !word || motionOff()) return;
    var roles;
    try { roles = JSON.parse(tag.getAttribute('data-roles')); } catch (e) { return; }
    if (!roles || roles.length < 2) return;
    var cur = 0, phase = 'wait', idx = roles[0].length;
    var TYPE_MS = 55, DEL_MS = 30, WAIT_MS = 3000, PAUSE_MS = 260;
    function tick() {
      var s = roles[cur];
      if (phase === 'wait') { phase = 'delete'; setTimeout(tick, WAIT_MS); }
      else if (phase === 'delete') {
        if (idx > 0) { idx--; word.textContent = s.slice(0, idx); setTimeout(tick, DEL_MS); }
        else { cur = (cur + 1) % roles.length; phase = 'type'; setTimeout(tick, PAUSE_MS); }
      } else {
        var ns = roles[cur];
        if (idx < ns.length) { idx++; word.textContent = ns.slice(0, idx); setTimeout(tick, TYPE_MS); }
        else { phase = 'wait'; idx = ns.length; setTimeout(tick, WAIT_MS); }
      }
    }
    setTimeout(tick, WAIT_MS);
  })();
})();
