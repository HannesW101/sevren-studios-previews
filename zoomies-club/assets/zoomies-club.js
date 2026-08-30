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

  (function setActiveNavLink() {
    var links = document.querySelectorAll('.nav-links a, .mobile-menu-links a');
    var segments = window.location.pathname.split('/').filter(Boolean);
    var last = (segments[segments.length - 1] || '').replace(/\.html$/, '');
    var matched = false;
    links.forEach(function (a) {
      var hrefPage = (a.getAttribute('href') || '').replace(/\.html$/, '');
      if (hrefPage !== 'index' && hrefPage === last) {
        a.classList.add('active');
        matched = true;
      }
    });
    if (!matched) {
      links.forEach(function (a) {
        if ((a.getAttribute('href') || '').replace(/\.html$/, '') === 'index') a.classList.add('active');
      });
    }
  })();

  var siteHeader = document.querySelector('.site-header');
  var menuToggle = document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('.mobile-menu');
  if (siteHeader) {
    var setHeaderHeight = function () {
      document.documentElement.style.setProperty('--header-h', siteHeader.offsetHeight + 'px');
    };
    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);
  }
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      var open = menuToggle.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open', open);
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menuToggle.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
})();
