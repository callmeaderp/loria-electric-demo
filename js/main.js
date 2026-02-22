document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation ---
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('nav-overlay');
  const navOverlayClose = document.getElementById('nav-overlay-close');

  function openNav() {
    if (hamburger) hamburger.classList.add('active');
    if (navOverlay) navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    if (hamburger) hamburger.classList.remove('active');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navOverlay && navOverlay.classList.contains('active') ? closeNav() : openNav();
    });
  }

  if (navOverlayClose) {
    navOverlayClose.addEventListener('click', closeNav);
  }

  if (navOverlay) {
    navOverlay.addEventListener('click', (e) => {
      if (e.target === navOverlay) closeNav();
    });
  }

  document.querySelectorAll('.nav-overlay-links a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // --- Header Scroll Effect ---
  const header = document.getElementById('site-header');

  function handleScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Scroll Animations ---
  const fadeElements = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window && fadeElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeElements.forEach(el => observer.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // --- Contact Form (Demo) ---
  const form = document.querySelector('.contact-form');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn) return;
      const originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Message Sent!';
      submitBtn.style.background = '#22c55e';
      submitBtn.style.borderColor = '#22c55e';
      submitBtn.style.color = '#fff';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.style.background = '';
        submitBtn.style.borderColor = '';
        submitBtn.style.color = '';
        submitBtn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Current Year in Footer ---
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

});
