(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal, .stagger').forEach(function (el) { observer.observe(el); });

  document.querySelectorAll('.paw-divider, .zoom-streaks').forEach(function (el) {
    var motionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) el.classList.add(el.classList.contains('zoom-streaks') ? 'run' : 'in-view');
      });
    }, { threshold: 0.3 });
    motionObserver.observe(el);
  });

  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });
})();
