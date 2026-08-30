(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .stagger').forEach(function (el) { el.classList.add('in-view'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });

    document.querySelectorAll('.reveal, .stagger').forEach(function (el) { observer.observe(el); });

    // Safety net: force-reveal anything still hidden a few seconds after load
    // (covers edge cases like unusual viewport heights where an element is
    // already fully on-screen before the observer can register a transition).
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in-view), .stagger:not(.in-view)').forEach(function (el) {
        el.classList.add('in-view');
      });
    }, 2500);
  }

  var path = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });
})();
