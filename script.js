/* ================= Premium Luxury JS =================
   - Smooth scroll with header offset
   - Mobile nav toggle
   - Scroll reveal (stagger)
   - Hero parallax subtle movement
   - Property card tilt on mousemove
   ================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navLinks = document.querySelectorAll('.nav-links a');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const revealElements = document.querySelectorAll('.reveal, .property-card, .mv-panel, .hero-card, .earth-card');
  const heroVideo = document.querySelector('.background-video');
  const hero = document.querySelector('.hero');

  /* ---------- Smooth scroll with header offset ---------- */
  function scrollToIdWithOffset(id) {
    const target = document.getElementById(id);
    if (!target) return;
    const headerHeight = Math.min(100, document.querySelector('header')?.offsetHeight || 90);
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = href.slice(1);
        scrollToIdWithOffset(id);
        // close mobile nav if open
        if (nav.classList.contains('active')) nav.classList.remove('active');
      });
    }
  });

  /* ---------- Mobile menu toggle ---------- */
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }

  /* ---------- Scroll reveal with stagger ---------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // delay for nicer stagger effect on groups
        entry.target.style.transitionDelay = `${(entry.target.dataset.delay || 0) * 0.12}s`;
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  // initialize observer on desired elements
  document.querySelectorAll('.reveal, .property-card, .mv-panel, .earth-card').forEach((el, index) => {
    // use data-delay attribute if present, otherwise auto incremental
    if (!el.dataset.delay) el.dataset.delay = index % 6;
    revealObserver.observe(el);
  });

  /* ---------- Active nav highlight ---------- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  function highlightNav() {
    const scrollPos = window.scrollY + (document.querySelector('header')?.offsetHeight || 90) + 16;
    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (scrollPos >= sec.offsetTop) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-links a[href="#${sec.id}"]`);
        if (link) link.classList.add('active');
        break;
      }
    }
  }
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive:true });

  /* ---------- Hero parallax (subtle) ---------- */
  if (hero && heroVideo) {
    // subtle movement on mouse move for desktop
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      // small translate for video
      const tx = px * 8; // tune intensity
      const ty = py * 6;
      heroVideo.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.02)`;
    });
    // reset on leave
    hero.addEventListener('mouseleave', () => {
      heroVideo.style.transform = `translate(-50%,-50%) scale(1)`;
    });
  }

  /* ---------- 3D tilt on property cards ---------- */
  function enableTilt(cardSelector = '.property-card') {
    document.querySelectorAll(cardSelector).forEach(card => {
      card.addEventListener('mousemove', (ev) => {
        const rect = card.getBoundingClientRect();
        const x = ((ev.clientX - rect.left) / rect.width - 0.5) * 14; // tilt range
        const y = ((ev.clientY - rect.top) / rect.height - 0.5) * -10;
        card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateZ(8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  enableTilt();

  /* ---------- Performance: reduce heavy effects on small screens ---------- */
  function reduceEffectsOnMobile() {
    if (window.innerWidth < 760) {
      // remove mousemove-based parallax/tilt on mobile
      if (hero) hero.replaceWith(hero.cloneNode(true));
      document.querySelectorAll('.property-card').forEach(c => c.replaceWith(c.cloneNode(true)));
    }
  }
  reduceEffectsOnMobile();
  window.addEventListener('resize', reduceEffectsOnMobile);

}); // DOMContentLoaded end
