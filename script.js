/* =====================================================
   ADICHERLA SAITEJA – PORTFOLIO JAVASCRIPT
   Vanilla JS only — no frameworks, no build step
   ===================================================== */

'use strict';

// ---- UTILITY ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// =====================================================
// HERO: TYPING EFFECT
// =====================================================
(function initTypingEffect() {
  const el = document.getElementById('heroTyped');
  if (!el) return;

  const words = [
    'Embedded Systems',
    'IoT Solutions',
    'Circuit Designs',
    'Drone Technology',
    'Sensor Modules',
    'Soldering & Wiring',
    'Web Applications',
    'IIoT Projects',
  ];


  let wi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 85, SPEED_DEL = 45, PAUSE = 1600;

  function tick() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) {
        deleting = true;
        return setTimeout(tick, PAUSE);
      }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) {
        deleting = false;
        wi = (wi + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? SPEED_DEL : SPEED_TYPE);
  }
  setTimeout(tick, 600);
})();

// =====================================================
// HERO: STAT COUNTERS
// =====================================================
(function initStatCounters() {
  const nums = $$('.stat-num');
  if (!nums.length) return;

  let done = false;

  function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isFloat = String(target).includes('.');
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * ease;
      el.textContent = (isFloat ? value.toFixed(2) : Math.round(value)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !done) {
        done = true;
        nums.forEach(el => animateCount(el));
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
})();



// =====================================================
// 1. NAVBAR — scroll shadow + active link highlight
// =====================================================
(function initNavbar() {
  const navbar   = $('#navbar');
  const navLinks = $$('.nav-link');

  const sectionIds = [
    'home', 'about', 'education', 'skills',
    'internships', 'projects', 'certifications', 'workshops', 'contact'
  ];

  function onScroll() {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 10);

    let current = 'home';
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      if (scrollY >= section.offsetTop - 120) current = id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
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
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
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
  btn.innerHTML = '&#8679;';
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
  const targets = [
    '.timeline-card', '.skill-category-card', '.internship-card',
    '.proj-card', '.cert-card', '.strength-card',
    '.workshop-card', '.about-info-card', '.contact-card', '.contact-cta',
  ];

  targets.forEach(selector => {
    $$(selector).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${(i % 6) * 0.07}s`;
    });
  });

  if (!('IntersectionObserver' in window)) {
    $$('.fade-in').forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
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
// 7. CURRENT YEAR in footer copyright
// =====================================================
(function initFooterYear() {
  const copy = $('.footer-copy');
  if (!copy) return;
  copy.innerHTML = copy.innerHTML.replace(/\d{4}/, new Date().getFullYear());
})();


// =====================================================
// 8. SKILL TAG — micro-interaction
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
// 9. PROJECT MODAL — rich detail overlay
// =====================================================
(function initProjectModal() {

  const GITHUB_SVG = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>';

  const PROJECTS = {
    1: {
      title: 'To-Do List Application',
      category: 'Web App',
      gradient: 'linear-gradient(135deg, #5b48d9, #7c6ef0, #a78bfa)',
      icon: '<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      desc: 'Developed a fully interactive task management web application from scratch using pure HTML, CSS, and JavaScript. The app allows users to add, edit, mark as complete, and delete tasks with a clean and intuitive interface.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
      highlights: [
        'Add, edit, complete, and delete tasks with smooth animations',
        'Tasks persist across sessions using browser LocalStorage',
        'Responsive layout works seamlessly on all screen sizes',
        'Clean, minimal UI with intuitive user experience',
      ],
      github: 'https://github.com/Saiteja9110/To-do-list',
    },
    2: {
      title: 'User-Friendly Web Pages',
      category: 'Web Design',
      gradient: 'linear-gradient(135deg, #0779b2, #0ea5e9, #38bdf8)',
      icon: '<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
      desc: 'Designed and developed multiple responsive, user-friendly web pages as part of internship tasks at Cognifyz Technologies. Focused on creating clean layouts, easy navigation, and optimal user experience across devices.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      highlights: [
        'Built responsive layouts using modern CSS Flexbox and Grid',
        'Focused on accessibility and cross-browser compatibility',
        'Implemented clean navigation and intuitive UI patterns',
        'Optimized for both desktop and mobile experiences',
      ],
      github: 'https://github.com/Saiteja9110/User-Friendly-web-page',
    },
    3: {
      title: 'Embedded & IIoT Kit',
      category: 'IoT / Embedded Systems',
      gradient: 'linear-gradient(135deg, #059669, #10b981, #34d399)',
      icon: '<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>',
      desc: 'Developed a comprehensive educational hardware kit featuring 52 sensor modules, LCD, and TFT displays designed to give students hands-on learning experience in embedded systems and Industrial IoT (IIoT) concepts during the EPIT Research Labs internship.',
      tech: ['Embedded C', 'Arduino', 'IoT Protocols', 'LCD/TFT Displays', 'Sensors', 'Hardware'],
      highlights: [
        'Integrated 52 different sensor types for diverse learning scenarios',
        'LCD and TFT display integration for real-time data visualization',
        'Designed for educational use to explain IIoT fundamentals',
        'Hands-on circuit wiring, soldering, and hardware assembly',
      ],
      github: null,
    },
    4: {
      title: 'Drone Construction',
      category: 'Hardware / UAV',
      gradient: 'linear-gradient(135deg, #b45309, #d97706, #fbbf24)',
      icon: '<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>',
      desc: 'Gained comprehensive practical knowledge of UAV (Unmanned Aerial Vehicle) construction through hands-on workshops and internship training at EPIT Research Labs. Covered the full pipeline from hardware assembly to understanding flight dynamics.',
      tech: ['Hardware Assembly', 'Electronics', 'Flight Controllers', 'ESCs & Motors', 'Propulsion Systems'],
      highlights: [
        'Assembled drone frame, motors, ESCs, and flight controller',
        'Learned flight principles: lift, thrust, drag, and torque balance',
        'Integrated FPV camera and telemetry communication modules',
        'Participated in two 3-day intensive drone workshops at colleges',
      ],
      github: 'https://github.com/Saiteja9110/Drone-Construction',
    },
    5: {
      title: 'Netflix Clone',
      category: 'Frontend Clone',
      gradient: 'linear-gradient(135deg, #be123c, #e11d48, #fb7185)',
      icon: '<svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
      desc: "Built a pixel-perfect, fully responsive Netflix-inspired streaming website featuring a modern dark UI, dynamic movie category rows, hero banner, and mobile-friendly navigation that closely replicates the original platform's visual experience.",
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'Responsive Design'],
      highlights: [
        "Pixel-perfect dark UI matching Netflix's design language",
        'Dynamic content rows with horizontal scrolling categories',
        'Hero banner section with featured title overlay',
        'Fully responsive — adapts to all screen sizes',
      ],
      github: 'https://github.com/Saiteja9110/Telugu-Movie-Clone',
    },
  };

  const overlay  = $('#projModal');
  const modalBox = $('#projModalBox');
  const closeBtn = $('#projModalClose');
  const header   = $('#projModalHeader');
  const iconEl   = $('#projModalIcon');
  const catEl    = $('#projModalCategory');
  const titleEl  = $('#modalTitle');
  const descEl   = $('#projModalDesc');
  const techEl   = $('#projModalTech');
  const hlWrap   = $('#projModalHighlightsWrap');
  const hlList   = $('#projModalHighlights');
  const actions  = $('#projModalActions');

  if (!overlay) return;

  function openModal(id) {
    const p = PROJECTS[id];
    if (!p) return;

    // Header
    header.style.background = p.gradient;
    iconEl.innerHTML = p.icon;
    iconEl.style.cssText = 'background:rgba(255,255,255,0.15);border-radius:12px;padding:10px;';
    catEl.textContent = p.category;
    titleEl.textContent = p.title;

    // Body
    descEl.textContent = p.desc;
    techEl.innerHTML = p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

    if (p.highlights && p.highlights.length) {
      hlWrap.style.display = '';
      hlList.innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');
    } else {
      hlWrap.style.display = 'none';
    }

    const closeSecondary = `<button class="btn-modal-secondary" id="modalCloseBtn">Close</button>`;

    if (p.github) {
      actions.innerHTML = `
        <a href="${p.github}" class="btn-modal-primary" target="_blank" rel="noopener noreferrer">
          ${GITHUB_SVG} View on GitHub
        </a>
        ${closeSecondary}
      `;
    } else {
      actions.innerHTML = `
        <span class="btn-modal-coming">
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Repository Coming Soon
        </span>
        ${closeSecondary}
      `;
    }

    // Bind close button inside actions
    const closeSecBtn = $('#modalCloseBtn');
    if (closeSecBtn) closeSecBtn.addEventListener('click', closeModal);

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  $$('.proj-card').forEach(card => {
    card.addEventListener('click', () => openModal(parseInt(card.dataset.project, 10)));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(parseInt(card.dataset.project, 10));
      }
    });
  });

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
})();


// =====================================================
// ACCENT COLOR SWITCHER
// =====================================================
(function initAccentSwitcher() {

  const THEMES = [
    {
      name: 'Purple',
      color: '#7c6ef0',
      vars: {
        '--purple':        '#7c6ef0',
        '--purple-bright': '#9b8fff',
        '--purple-dim':    '#5a52c9',
        '--purple-pale':   'rgba(124,110,240,.12)',
        '--teal':          '#22d3ee',
        '--glow-purple':   '0 0 32px rgba(124,110,240,.3)',
      }
    },
    {
      name: 'Green',
      color: '#10b981',
      vars: {
        '--purple':        '#10b981',
        '--purple-bright': '#34d399',
        '--purple-dim':    '#059669',
        '--purple-pale':   'rgba(16,185,129,.12)',
        '--teal':          '#6ee7b7',
        '--glow-purple':   '0 0 32px rgba(16,185,129,.3)',
      }
    },
    {
      name: 'Rose',
      color: '#f43f5e',
      vars: {
        '--purple':        '#f43f5e',
        '--purple-bright': '#fb7185',
        '--purple-dim':    '#e11d48',
        '--purple-pale':   'rgba(244,63,94,.12)',
        '--teal':          '#fda4af',
        '--glow-purple':   '0 0 32px rgba(244,63,94,.3)',
      }
    },
    {
      name: 'Amber',
      color: '#f59e0b',
      vars: {
        '--purple':        '#f59e0b',
        '--purple-bright': '#fbbf24',
        '--purple-dim':    '#d97706',
        '--purple-pale':   'rgba(245,158,11,.12)',
        '--teal':          '#fde68a',
        '--glow-purple':   '0 0 32px rgba(245,158,11,.3)',
      }
    },
    {
      name: 'Sky',
      color: '#0ea5e9',
      vars: {
        '--purple':        '#0ea5e9',
        '--purple-bright': '#38bdf8',
        '--purple-dim':    '#0284c7',
        '--purple-pale':   'rgba(14,165,233,.12)',
        '--teal':          '#7dd3fc',
        '--glow-purple':   '0 0 32px rgba(14,165,233,.3)',
      }
    },
  ];

  function applyTheme(index) {
    const theme = THEMES[index];
    const root = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    document.querySelectorAll('.accent-swatch').forEach((sw, i) => {
      sw.classList.toggle('active', i === index);
    });
    try { localStorage.setItem('as-accent', index); } catch(e) {}
  }

  // Build the floating panel
  const panel = document.createElement('div');
  panel.className = 'accent-switcher';
  panel.innerHTML = `
    <span class="accent-label">ACCENT</span>
    <div class="accent-swatches"></div>
  `;

  const wrap = panel.querySelector('.accent-swatches');
  THEMES.forEach((t, i) => {
    const btn = document.createElement('button');
    btn.className = 'accent-swatch';
    btn.setAttribute('aria-label', t.name + ' theme');
    btn.title = t.name;
    btn.style.setProperty('--sw-color', t.color);
    btn.addEventListener('click', () => applyTheme(i));
    wrap.appendChild(btn);
  });

  document.body.appendChild(panel);

  // Restore saved or default to purple (index 0)
  try {
    const saved = parseInt(localStorage.getItem('as-accent') || '0', 10);
    applyTheme(isNaN(saved) ? 0 : Math.min(saved, THEMES.length - 1));
  } catch(e) { applyTheme(0); }
})();
