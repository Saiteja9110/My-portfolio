/* =====================================================
   ADICHERLA SAITEJA – PORTFOLIO JAVASCRIPT
   Vanilla JS only — no frameworks, no build step
   ===================================================== */

'use strict';

// ---- UTILITY ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// =====================================================
// 1. NAVBAR — scroll shadow + active link highlight
// =====================================================
(function initNavbar() {
  const navbar   = $('#navbar');
  const navLinks = $$('.nav-link');

  // Sections in order for active-link detection
  const sectionIds = [
    'home', 'about', 'education', 'skills',
    'internships', 'projects', 'certifications', 'workshops', 'contact'
  ];

  function onScroll() {
    const scrollY = window.scrollY;

    // Shadow when scrolled
    navbar.classList.toggle('scrolled', scrollY > 10);

    // Active link detection
    let current = 'home';
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      if (scrollY >= section.offsetTop - 120) {
        current = id;
      }
    }
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
})();


// =====================================================
// 2. MOBILE HAMBURGER MENU
// =====================================================
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navMenu   = $('#nav-menu');
  const navLinks  = $$('.nav-link');

  function closeMenu() {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    const isOpen = hamburger.classList.toggle('open');
    navMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close on nav link click
  navLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on outside click
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


// =====================================================
// 3. SMOOTH SCROLL for anchor links
// =====================================================
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


// =====================================================
// 4. SCROLL-TO-TOP BUTTON
// =====================================================
(function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = '&#8679;'; // ↑ arrow
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


// =====================================================
// 5. FADE-IN ANIMATION on scroll (IntersectionObserver)
// =====================================================
(function initFadeIn() {
  // Add fade-in class to target elements
  const targets = [
    '.timeline-card',
    '.skill-category-card',
    '.internship-card',
    '.project-card',
    '.cert-card',
    '.strength-card',
    '.workshop-card',
    '.about-info-card',
    '.contact-card',
    '.contact-cta',
  ];

  targets.forEach(selector => {
    $$(selector).forEach((el, i) => {
      el.classList.add('fade-in');
      // Stagger delay based on index within same parent group
      el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    });
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all immediately
    $$('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate only once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.fade-in').forEach(el => observer.observe(el));
})();


// =====================================================
// 6. PROFILE IMAGE — graceful fallback
// =====================================================
(function initProfileImageFallback() {
  const img = $('.profile-photo');
  if (!img) return;
  img.addEventListener('error', function () {
    this.style.display = 'none';
    const ring = this.closest('.profile-ring');
    if (ring) ring.classList.add('no-photo');
  });
})();


// =====================================================
// 7. CURRENT YEAR in footer copyright (future-proofing)
// =====================================================
(function initFooterYear() {
  const copy = $('.footer-copy');
  if (!copy) return;
  const year = new Date().getFullYear();
  copy.innerHTML = copy.innerHTML.replace(/\d{4}/, year);
})();


// =====================================================
// 8. SKILL TAG — micro-interaction (ripple on click)
// =====================================================
(function initSkillRipple() {
  $$('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => { this.style.transform = ''; }, 150);
    });
  });
})();


// =====================================================
// 9. PREVENT CONSOLE ERRORS — resume.pdf check
//    (just a no-op, the browser handles the 404 gracefully)
// =====================================================
// Nothing needed — <a href="./assets/resume.pdf" download>
// will simply show a 404 or download if file exists.
// No JS error is thrown.
