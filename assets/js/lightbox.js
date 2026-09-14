// Shared lightbox widget — one .lightbox-overlay instance per page, reused by every
// gallery on the site (project doc-shots, devlog inline images, project carousels).
// Handles open/close/nav plus zoom: mouse wheel, pinch, double-click/double-tap, and
// drag-to-pan once zoomed. window.Lightbox.create() returns { open(items, index) }.
(function () {
  if (window.Lightbox) return;

  var MIN_SCALE = 1;
  var MAX_SCALE = 5;
  var DOUBLE_TAP_SCALE = 2.5;

  function create() {
    var el = document.createElement('div');
    el.className = 'lightbox-overlay';
    el.innerHTML =
      '<button class="lightbox-close" aria-label="Close">×</button>' +
      '<button class="lightbox-btn prev" aria-label="Previous image">❮</button>' +
      '<div class="lightbox-content">' +
      '<img src="" alt="" />' +
      '<div class="lightbox-caption"></div>' +
      '</div>' +
      '<button class="lightbox-btn next" aria-label="Next image">❯</button>';
    document.body.appendChild(el);

    var wrap = el.querySelector('.lightbox-content');
    var img = el.querySelector('img');
    var cap = el.querySelector('.lightbox-caption');
    var closeBtn = el.querySelector('.lightbox-close');
    var nextBtn = el.querySelector('.next');
    var prevBtn = el.querySelector('.prev');

    var items = [];
    var index = 0;

    // ---- zoom/pan state ----
    var scale = 1, panX = 0, panY = 0;

    function setTransform(withTransition) {
      img.style.transition = withTransition ? 'transform 0.18s ease' : 'none';
      img.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + scale + ')';
    }

    function clampPan() {
      // offsetWidth/Height reflect the image's laid-out (unscaled) box — the
      // CSS transform below doesn't affect them, unlike getBoundingClientRect().
      var maxX = Math.max(0, (img.offsetWidth * (scale - 1)) / 2);
      var maxY = Math.max(0, (img.offsetHeight * (scale - 1)) / 2);
      panX = Math.min(maxX, Math.max(-maxX, panX));
      panY = Math.min(maxY, Math.max(-maxY, panY));
    }

    function resetZoom(withTransition) {
      scale = 1; panX = 0; panY = 0;
      setTransform(withTransition);
      img.classList.remove('zoomed');
    }

    function zoomAt(newScale, clientX, clientY, withTransition) {
      newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, newScale));
      var rect = img.getBoundingClientRect();
      var originX = clientX - (rect.left + rect.width / 2);
      var originY = clientY - (rect.top + rect.height / 2);
      var ratio = newScale / scale;
      panX = originX - (originX - panX) * ratio;
      panY = originY - (originY - panY) * ratio;
      scale = newScale;
      clampPan();
      setTransform(withTransition);
      img.classList.toggle('zoomed', scale > 1.01);
    }

    // ---- wheel zoom (desktop) ----
    wrap.addEventListener('wheel', function (e) {
      if (!items.length) return;
      e.preventDefault();
      var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoomAt(scale * factor, e.clientX, e.clientY, false);
    }, { passive: false });

    // ---- drag to pan once zoomed (mouse) ----
    var dragging = false, dragStartX = 0, dragStartY = 0, panStartX = 0, panStartY = 0;
    img.addEventListener('mousedown', function (e) {
      if (scale <= 1) return;
      dragging = true;
      dragStartX = e.clientX; dragStartY = e.clientY;
      panStartX = panX; panStartY = panY;
      img.classList.add('dragging');
      e.preventDefault();
    });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      panX = panStartX + (e.clientX - dragStartX);
      panY = panStartY + (e.clientY - dragStartY);
      clampPan();
      setTransform(false);
    });
    window.addEventListener('mouseup', function () {
      if (!dragging) return;
      dragging = false;
      img.classList.remove('dragging');
    });

    // ---- double-click to toggle zoom ----
    img.addEventListener('dblclick', function (e) {
      if (scale > 1) resetZoom(true);
      else zoomAt(DOUBLE_TAP_SCALE, e.clientX, e.clientY, true);
    });

    // ---- touch: pinch zoom, one-finger pan when zoomed, swipe nav when not ----
    var pinch = null;
    var swipeX = null, swipeY = null;
    var lastTap = 0;

    function touchDist(t) {
      var dx = t[0].clientX - t[1].clientX;
      var dy = t[0].clientY - t[1].clientY;
      return Math.hypot(dx, dy);
    }
    function touchMid(t) {
      return { x: (t[0].clientX + t[1].clientX) / 2, y: (t[0].clientY + t[1].clientY) / 2 };
    }

    el.addEventListener('touchstart', function (e) {
      if (e.touches.length === 2) {
        pinch = { dist: touchDist(e.touches), scale: scale };
        swipeX = null;
      } else if (e.touches.length === 1) {
        if (scale > 1) {
          dragging = true;
          dragStartX = e.touches[0].clientX;
          dragStartY = e.touches[0].clientY;
          panStartX = panX; panStartY = panY;
        } else {
          swipeX = e.touches[0].clientX;
          swipeY = e.touches[0].clientY;
          var now = Date.now();
          if (now - lastTap < 300) {
            zoomAt(DOUBLE_TAP_SCALE, e.touches[0].clientX, e.touches[0].clientY, true);
            swipeX = null;
          }
          lastTap = now;
        }
      }
    }, { passive: true });

    el.addEventListener('touchmove', function (e) {
      if (e.touches.length === 2 && pinch) {
        e.preventDefault();
        var mid = touchMid(e.touches);
        var newScale = pinch.scale * (touchDist(e.touches) / pinch.dist);
        zoomAt(newScale, mid.x, mid.y, false);
      } else if (e.touches.length === 1 && dragging) {
        e.preventDefault();
        panX = panStartX + (e.touches[0].clientX - dragStartX);
        panY = panStartY + (e.touches[0].clientY - dragStartY);
        clampPan();
        setTransform(false);
      }
    }, { passive: false });

    el.addEventListener('touchend', function (e) {
      if (e.touches.length === 0) {
        dragging = false;
        if (swipeX !== null && scale <= 1 && e.changedTouches.length) {
          var dx = e.changedTouches[0].clientX - swipeX;
          var dy = e.changedTouches[0].clientY - swipeY;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) && items.length > 1) {
            if (dx < 0) next(); else prev();
          }
        }
        pinch = null;
        swipeX = null;
      } else if (e.touches.length === 1) {
        pinch = null;
      }
    }, { passive: true });

    // ---- gallery plumbing ----
    function render() {
      resetZoom(false);
      var it = items[index];
      img.src = it.src;
      img.alt = it.caption || it.alt || '';
      cap.textContent = it.caption || '';
      cap.style.display = it.caption ? 'block' : 'none';
      var many = items.length > 1;
      nextBtn.style.display = many ? 'block' : 'none';
      prevBtn.style.display = many ? 'block' : 'none';
    }

    function open(newItems, startIndex) {
      items = newItems;
      index = startIndex || 0;
      render();
      el.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      el.classList.remove('active');
      document.body.style.overflow = '';
      resetZoom(false);
    }

    function next() { index = (index + 1) % items.length; render(); }
    function prev() { index = (index - 1 + items.length) % items.length; render(); }

    closeBtn.addEventListener('click', close);
    el.addEventListener('click', function (e) { if (e.target === el) close(); });
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    document.addEventListener('keydown', function (e) {
      if (!el.classList.contains('active')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight' && scale <= 1) next();
      if (e.key === 'ArrowLeft' && scale <= 1) prev();
    });

    return { open: open, close: close, next: next, prev: prev };
  }

  window.Lightbox = { create: create };
})();
