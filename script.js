/* =====================================================
   ADICHERLA SAITEJA - PORTFOLIO JAVASCRIPT
   Vanilla JS only - no frameworks, no build step
   ===================================================== */

'use strict';

// =====================================================
// 1. CONFIGURATION: RESUME
// =====================================================
const RESUME = {
  path: './assets/resume.pdf',
};

// =====================================================
// 2. CONFIGURATION: CERTIFICATES
// =====================================================
const CERTIFICATES = [
  {
    id: 'epit-cert',
    title: 'Internship Certificate',
    issuer: 'EPIT Research Labs Pvt. Ltd.',
    description: 'Certificate of completion for a 3-month IoT, Embedded & Drone Technology Internship. Gained practical experience in hardware, sensors, embedded systems, and drone integration.',
    badge: 'EP',
    badgeClass: 'epit-c',
    file: null, // path under assets/certificates/, e.g. './assets/certificates/epit-cert.pdf'
    link: null, // verification URL if available
  },
  {
    id: 'cognifyz-cert',
    title: 'Internship Certificate',
    issuer: 'Cognifyz Technologies',
    description: 'Certificate of completion for a 2-month Frontend Development Internship. Gained experience building user-friendly websites using React and Tailwind CSS.',
    badge: 'CF',
    badgeClass: 'cog-c',
    file: null, // path under assets/certificates/
    link: null,
  },
  {
    id: 'aws-cert',
    title: 'AWS Certification',
    issuer: 'Amazon Web Services',
    description: 'Foundational knowledge of AWS cloud services, infrastructure, and core cloud computing concepts.',
    badge: 'AWS',
    badgeClass: 'aws-c',
    file: null,
    link: null,
  },
  {
    id: 'avazya-cert',
    title: 'Certificate',
    issuer: 'Avazya',
    description: 'Certificate of achievement awarded by Avazya in recognition of skills and participation.',
    badge: 'AV',
    badgeClass: 'avz-c',
    file: null,
    link: null,
  },
];

// =====================================================
// 3. CONFIGURATION: PROJECTS
// =====================================================
const PROJECTS = [
  {
    id: 'embedded-kit',
    group: 'Hardware and embedded',
    title: 'Embedded & IIoT Kit',
    category: 'IoT / Embedded Systems',
    categoryClass: 'cat-embedded',
    summary: 'Educational kit with 52 sensors and displays for hands-on IIoT learning.',
    desc: 'Developed a comprehensive educational hardware kit featuring 52 sensor modules, LCD, and TFT displays designed to give students hands-on learning experience in embedded systems and Industrial IoT (IIoT) concepts during the EPIT Research Labs internship.',
    tech: ['Embedded C', 'Arduino', 'IoT Protocols', 'LCD/TFT Displays', 'Sensors', 'Hardware'],
    highlights: [
      'Integrated 52 different sensor types for diverse learning scenarios',
      'LCD and TFT display integration for real-time data visualization',
      'Designed for educational use to explain IIoT fundamentals',
      'Hands-on circuit wiring, soldering, and hardware assembly',
    ],
    github: null, // Shows "Repository Coming Soon"
    demo: null,
    image: null,  // Optional path under assets/projects/
  },
  {
    id: 'drone-construction',
    group: 'Hardware and embedded',
    title: 'Drone Construction',
    category: 'Hardware / UAV',
    categoryClass: 'cat-hardware',
    activity: 'Workshop Activity',
    summary: 'Hands-on drone building covering structure, electronics and flight systems.',
    desc: 'Gained comprehensive practical knowledge of UAV (Unmanned Aerial Vehicle) construction through hands-on workshops and internship training at EPIT Research Labs. Covered the full pipeline from hardware assembly to understanding flight dynamics.',
    tech: ['Hardware Assembly', 'Electronics', 'Flight Controllers', 'ESCs & Motors', 'Propulsion Systems'],
    highlights: [
      'Assembled drone frame, motors, ESCs, and flight controller',
      'Learned flight principles: lift, thrust, drag, and torque balance',
      'Participated in two 3-day intensive drone workshops at colleges',
    ],
    github: 'https://github.com/Saiteja9110/Drone-Construction',
    demo: null,
    image: null,
  },
  {
    id: 'todo-list',
    group: 'Web',
    title: 'To-Do List Application',
    category: 'Web App',
    categoryClass: 'cat-web',
    summary: 'Task manager with add, edit, complete and delete features.',
    desc: 'Developed a fully interactive task management web application from scratch using pure HTML, CSS, and JavaScript. The app allows users to add, edit, mark as complete, and delete tasks with a clean and intuitive interface.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
    highlights: [
      'Add, edit, complete, and delete tasks with smooth animations',
      'Tasks persist across sessions using browser LocalStorage',
      'Responsive layout works seamlessly on all screen sizes',
      'Clean, minimal UI with intuitive user experience',
    ],
    github: 'https://github.com/Saiteja9110/To-do-list',
    demo: null,
    image: null,
  },
  {
    id: 'web-pages',
    group: 'Web',
    title: 'User-Friendly Web Pages',
    category: 'Web Design',
    categoryClass: 'cat-web',
    activity: 'Internship Project',
    summary: 'Responsive web pages with clean layouts and intuitive navigation.',
    desc: 'Designed and developed multiple responsive, user-friendly web pages as part of internship tasks at Cognifyz Technologies. Focused on creating clean layouts, easy navigation, and optimal user experience across devices.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    highlights: [
      'Built responsive layouts using modern CSS Flexbox and Grid',
      'Implemented clean navigation and intuitive UI patterns',
      'Optimized for both desktop and mobile experiences',
    ],
    github: 'https://github.com/Saiteja9110/User-Friendly-web-page',
    demo: null,
    image: null,
  },
  {
    id: 'netflix-clone',
    group: 'Web',
    title: 'Telugu-Movie-Clone',
    category: 'Frontend Clone',
    categoryClass: 'cat-web',
    summary: 'Responsive movie streaming web application with category rows and hero banner.',
    desc: 'A modern entertainment web portal inspired by streaming platforms, built with semantic HTML, modular CSS, and JavaScript. Features dynamically categorized movie rows with horizontal scrolling, a responsive hero spotlight banner, and an immersive dark interface optimized across mobile and desktop.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'Responsive Design'],
    highlights: [
      'Dynamic category rows with smooth horizontal scrolling',
      'Featured title showcase with responsive hero banner',
      'Mobile-first dark theme UI with seamless responsive layouts',
      'Clean vanilla code architecture without external frameworks',
    ],
    github: 'https://github.com/Saiteja9110/Telugu-Movie-Clone',
    demo: null,
    image: null,
  },
];

// Motion preference check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// GitHub SVG Icon helper
const GITHUB_SVG = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>';

// =====================================================
// 4. RESUME HEAD CHECK
// =====================================================
async function initResumeCheck() {
  const resumeLinks = document.querySelectorAll('[data-resume]');
  let available = true;

  if (location.protocol === 'file:') {
    available = true;
  } else {
    try {
      const response = await fetch(RESUME.path, { method: 'HEAD' });
      if (response.status === 404) {
        available = false;
      } else {
        available = true;
      }
    } catch (e) {
      // Treat network errors as available unless response is 404
      available = true;
    }
  }

  resumeLinks.forEach(link => {
    const labelSpan = link.querySelector('.resume-label');
    if (!available) {
      link.classList.add('resume-disabled');
      link.setAttribute('aria-disabled', 'true');
      link.setAttribute('tabindex', '-1');
      if (labelSpan) {
        labelSpan.textContent = 'Resume coming soon';
      } else {
        link.textContent = 'Resume coming soon';
      }
      link.addEventListener('click', e => {
        if (link.classList.contains('resume-disabled')) {
          e.preventDefault();
        }
      });
    } else {
      link.classList.remove('resume-disabled');
      link.removeAttribute('aria-disabled');
      link.removeAttribute('tabindex');
      const action = link.getAttribute('data-resume');
      if (labelSpan) {
        if (action === 'view') {
          labelSpan.textContent = 'View Resume';
        } else if (action === 'download') {
          labelSpan.textContent = 'Download Resume';
        } else {
          labelSpan.textContent = 'Resume';
        }
      }
    }
  });
}

// =====================================================
// 5. SHARED DIALOG MANAGER (Accessibility & Focus Trap)
// =====================================================
const DialogManager = (function() {
  let activeOverlay = null;
  let openerElement = null;

  function trapFocus(e) {
    if (!activeOverlay || e.key !== 'Tab') return;

    const focusables = Array.from(activeOverlay.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )).filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0);

    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first || !activeOverlay.contains(document.activeElement)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !activeOverlay.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function open(overlay, opener) {
    if (!overlay) return;
    activeOverlay = overlay;
    openerElement = opener || null;

    // Make outer sections inert for screen readers & tab order
    const header = document.querySelector('.header');
    const main = document.getElementById('main');
    const footer = document.querySelector('.footer');
    if (header) header.setAttribute('inert', '');
    if (main) main.setAttribute('inert', '');
    if (footer) footer.setAttribute('inert', '');

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus close button or first focusable
    const closeBtn = overlay.querySelector('.proj-modal-close');
    setTimeout(() => {
      if (closeBtn) {
        closeBtn.focus();
      } else {
        const focusable = overlay.querySelector('a, button, [tabindex="0"]');
        if (focusable) focusable.focus();
      }
    }, 60);

    document.addEventListener('keydown', trapFocus);
  }

  function close(overlay) {
    const target = overlay || activeOverlay;
    if (!target) return;

    document.removeEventListener('keydown', trapFocus);

    target.classList.remove('open');
    target.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    const header = document.querySelector('.header');
    const main = document.getElementById('main');
    const footer = document.querySelector('.footer');
    if (header) header.removeAttribute('inert');
    if (main) main.removeAttribute('inert');
    if (footer) footer.removeAttribute('inert');

    if (openerElement && typeof openerElement.focus === 'function') {
      openerElement.focus();
    }

    activeOverlay = null;
    openerElement = null;
  }

  // Global escape and backdrop listeners
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && activeOverlay && activeOverlay.classList.contains('open')) {
      close(activeOverlay);
    }
  });

  [document.getElementById('projModal'), document.getElementById('certModal')].forEach(overlay => {
    if (!overlay) return;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) {
        close(overlay);
      }
    });
    const closeBtn = overlay.querySelector('.proj-modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => close(overlay));
    }
  });

  return { open, close };
})();

// =====================================================
// 6. HERO: TYPING EFFECT
// =====================================================
(function initTypingEffect() {
  const el = document.getElementById('heroTyped');
  if (!el) return;

  if (prefersReducedMotion) {
    el.textContent = 'Embedded Systems & IoT Solutions';
    return;
  }

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
// 7. HERO: STAT COUNTERS
// =====================================================
(function initStatCounters() {
  const nums = Array.from(document.querySelectorAll('.stat-num'));
  if (!nums.length) return;

  if (prefersReducedMotion) {
    nums.forEach(num => {
      num.textContent = num.getAttribute('data-target') || num.textContent;
    });
    return;
  }

  let animated = false;

  function countUp(el) {
    const raw = el.getAttribute('data-target') || '0';
    const isFloat = raw.includes('.');
    const decimals = isFloat ? (raw.split('.')[1] || '').length : 0;
    const target = parseFloat(raw);
    const duration = 1600;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = ease * target;

      if (progress < 1) {
        el.textContent = isFloat
          ? current.toFixed(decimals)
          : Math.floor(current).toString();
        requestAnimationFrame(step);
      } else {
        el.textContent = raw;
      }
    }
    requestAnimationFrame(step);
  }

  const heroStats = document.querySelector('.hero-stats');
  if (!heroStats) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      nums.forEach(num => countUp(num));
      observer.disconnect();
    }
  }, { threshold: 0.4 });

  observer.observe(heroStats);
})();

// =====================================================
// 8. NAVBAR & ACTIVE NAVIGATION
// =====================================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const scrollPos = window.scrollY + 120;
    let currentId = '';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const match = href === '#' + currentId;
      if (match) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// =====================================================
// 9. MOBILE MENU TOGGLE
// =====================================================
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('nav-menu');
  const links = Array.from(document.querySelectorAll('.nav-link'));

  if (!hamburger || !menu) return;

  function toggleMenu() {
    const isOpen = menu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMenu() {
    menu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', toggleMenu);
  links.forEach(l => l.addEventListener('click', closeMenu));

  document.addEventListener('click', e => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
})();

// =====================================================
// 10. SCROLL TO TOP BUTTON
// =====================================================
(function initScrollTop() {
  let btn = document.getElementById('scrollTopBtn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll to top');
    btn.innerHTML = '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
    document.body.appendChild(btn);
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// =====================================================
// 11. FADE-IN ANIMATION ON SCROLL
// =====================================================
(function initFadeIn() {
  if (prefersReducedMotion) return;

  const targets = [
    '.skill-category-card',
    '.internship-card',
    '.timeline-card',
    '.workshop-card',
    '.strength-card',
    '.contact-card',
    '.about-info-card',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => el.classList.add('fade-in'));
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

// =====================================================
// 12. PROFILE IMAGE FALLBACK
// =====================================================
(function initProfileImageFallback() {
  const img = document.querySelector('.profile-photo');
  if (!img) return;

  img.addEventListener('error', () => {
    img.style.display = 'none';
    const initials = document.querySelector('.profile-initials');
    if (initials) initials.style.display = 'flex';
  });
})();

// =====================================================
// 13. PROJECTS RENDERING & MODAL
// =====================================================
(function initProjects() {
  const container = document.getElementById('projectsContainer');
  const modalOverlay = document.getElementById('projModal');
  const modalBox = document.getElementById('projModalBox');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('projModalCategory');
  const modalDesc = document.getElementById('projModalDesc');
  const modalTech = document.getElementById('projModalTech');
  const modalHighlightsWrap = document.getElementById('projModalHighlightsWrap');
  const modalHighlights = document.getElementById('projModalHighlights');
  const modalImageWrap = document.getElementById('projModalImageWrap');
  const modalActions = document.getElementById('projModalActions');

  if (!container || !modalOverlay) return;

  function getCategorySvg(category) {
    switch (category) {
      case 'IoT / Embedded Systems':
        return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>';
      case 'Hardware / UAV':
        return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
      case 'Web App':
        return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>';
      case 'Web Design':
        return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>';
      case 'Frontend Clone':
        return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
      default:
        return '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    }
  }

  // Group projects
  const groups = [
    { name: 'Hardware and embedded', items: [] },
    { name: 'Web', items: [] },
  ];

  PROJECTS.forEach(p => {
    const grp = groups.find(g => g.name === p.group);
    if (grp) grp.items.push(p);
  });

  // Render project groups into container using DOM nodes
  container.replaceChildren();

  groups.forEach(g => {
    if (!g.items.length) return;

    const groupTitle = document.createElement('h3');
    groupTitle.className = 'project-group-title';
    groupTitle.textContent = g.name;
    container.appendChild(groupTitle);

    const grid = document.createElement('div');
    grid.className = 'projects-grid';

    g.items.forEach(project => {
      const card = document.createElement('button');
      card.type = 'button';
      const isFeatured = (project.id === 'embedded-kit');
      card.className = 'proj-card' + (isFeatured ? ' featured-card' : '') + ' ' + project.categoryClass;
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('data-project-id', project.id);

      // 16:9 top media area
      const mediaWrap = document.createElement('div');
      mediaWrap.className = 'proj-media';
      if (project.image) {
        const img = document.createElement('img');
        img.className = 'proj-media-img';
        img.src = project.image;
        img.alt = project.title + ' preview';
        img.loading = 'lazy';
        img.width = 480;
        img.height = 270;
        mediaWrap.appendChild(img);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'proj-media-placeholder';
        placeholder.innerHTML = `
          <div class="proj-placeholder-icon">${getCategorySvg(project.category)}</div>
          <span class="proj-placeholder-label">${project.category}</span>
        `;
        mediaWrap.appendChild(placeholder);
      }
      card.appendChild(mediaWrap);

      // Content wrapper
      const content = document.createElement('div');
      content.className = 'proj-card-content';

      // Card body
      const body = document.createElement('div');
      body.className = 'proj-card-body';

      const tagsRow = document.createElement('div');
      tagsRow.className = 'proj-tags-row';

      const catTag = document.createElement('span');
      catTag.className = 'proj-category-tag ' + project.categoryClass;
      catTag.textContent = project.category;
      tagsRow.appendChild(catTag);

      if (project.activity) {
        const actTag = document.createElement('span');
        actTag.className = 'proj-activity-tag';
        actTag.textContent = project.activity;
        tagsRow.appendChild(actTag);
      }
      body.appendChild(tagsRow);

      const title = document.createElement('h3');
      title.className = 'proj-title';
      title.textContent = project.title;
      body.appendChild(title);

      const desc = document.createElement('p');
      desc.className = 'proj-short-desc';
      desc.textContent = project.summary;
      body.appendChild(desc);

      // Tech tags: pinned to bottom of body, show first 3 pills
      const techRow = document.createElement('div');
      techRow.className = 'proj-tech-row';
      project.tech.slice(0, 3).forEach(t => {
        const tag = document.createElement('span');
        tag.className = 'proj-tech';
        tag.textContent = t;
        techRow.appendChild(tag);
      });
      body.appendChild(techRow);
      content.appendChild(body);

      // Footer
      const footer = document.createElement('div');
      footer.className = 'proj-card-footer';
      const viewBtn = document.createElement('span');
      viewBtn.className = 'proj-view-btn';
      viewBtn.innerHTML = 'View Details <span aria-hidden="true">&rarr;</span>';
      footer.appendChild(viewBtn);
      content.appendChild(footer);

      card.appendChild(content);

      // Card click opens modal
      card.addEventListener('click', () => openProjectModal(project, card));

      grid.appendChild(card);
    });

    container.appendChild(grid);
  });

  function openProjectModal(project, opener) {
    // Title & Category
    modalTitle.textContent = project.title;
    modalCategory.textContent = project.activity ? `${project.category} • ${project.activity}` : project.category;

    // Optional modal image
    modalImageWrap.replaceChildren();
    if (project.image) {
      modalImageWrap.hidden = false;
      const img = document.createElement('img');
      img.className = 'proj-modal-image';
      img.src = project.image;
      img.alt = project.title + ' screenshot';
      modalImageWrap.appendChild(img);
    } else {
      modalImageWrap.hidden = true;
    }

    // Description
    modalDesc.textContent = project.desc;

    // Technologies used (full list)
    modalTech.replaceChildren();
    project.tech.forEach(t => {
      const badge = document.createElement('span');
      badge.className = 'tech-badge';
      badge.textContent = t;
      modalTech.appendChild(badge);
    });

    // Highlights
    modalHighlights.replaceChildren();
    if (project.highlights && project.highlights.length) {
      modalHighlightsWrap.style.display = '';
      project.highlights.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        modalHighlights.appendChild(li);
      });
    } else {
      modalHighlightsWrap.style.display = 'none';
    }

    // Modal Actions
    modalActions.replaceChildren();

    if (project.demo) {
      const demoBtn = document.createElement('a');
      demoBtn.href = project.demo;
      demoBtn.className = 'btn-modal-primary';
      demoBtn.target = '_blank';
      demoBtn.rel = 'noopener noreferrer';
      demoBtn.textContent = 'Live Demo';
      modalActions.appendChild(demoBtn);
    }

    if (project.github) {
      const ghBtn = document.createElement('a');
      ghBtn.href = project.github;
      ghBtn.className = 'btn-modal-primary';
      ghBtn.target = '_blank';
      ghBtn.rel = 'noopener noreferrer';
      ghBtn.innerHTML = GITHUB_SVG + ' View on GitHub';
      modalActions.appendChild(ghBtn);
    } else {
      const comingSpan = document.createElement('span');
      comingSpan.className = 'btn-modal-coming';
      comingSpan.textContent = 'Repository Coming Soon';
      modalActions.appendChild(comingSpan);
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-modal-secondary';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => DialogManager.close(modalOverlay));
    modalActions.appendChild(closeBtn);

    DialogManager.open(modalOverlay, opener);
  }
})();

// =====================================================
// 14. CERTIFICATES RENDERING & VIEWER MODAL
// =====================================================
(function initCertificates() {
  const grid = document.getElementById('certGrid');
  const modalOverlay = document.getElementById('certModal');
  const modalTitle = document.getElementById('certModalTitle');
  const modalIssuer = document.getElementById('certModalIssuer');
  const modalIcon = document.getElementById('certModalIcon');
  const modalPreview = document.getElementById('certModalPreview');
  const modalDesc = document.getElementById('certModalDesc');
  const modalActions = document.getElementById('certModalActions');

  if (!grid || !modalOverlay) return;

  grid.replaceChildren();

  CERTIFICATES.forEach(cert => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'cert-card';
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('data-cert-id', cert.id);

    const icon = document.createElement('div');
    icon.className = 'cert-icon-box ' + cert.badgeClass;
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = cert.badge;
    card.appendChild(icon);

    const info = document.createElement('div');
    info.className = 'cert-card-info';

    const title = document.createElement('h3');
    title.className = 'cert-card-title';
    title.textContent = cert.title;
    info.appendChild(title);

    const issuer = document.createElement('p');
    issuer.className = 'cert-card-issuer';
    issuer.textContent = cert.issuer;
    info.appendChild(issuer);

    const statusPill = document.createElement('span');
    statusPill.className = 'cert-status-pill ' + (cert.file || cert.link ? 'available' : 'coming');
    statusPill.textContent = (cert.file || cert.link) ? 'View certificate' : 'File coming soon';
    info.appendChild(statusPill);

    card.appendChild(info);

    card.addEventListener('click', () => openCertModal(cert, card));

    grid.appendChild(card);
  });

  function openCertModal(cert, opener) {
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = cert.issuer;

    // Icon in header
    modalIcon.replaceChildren();
    const icon = document.createElement('div');
    icon.className = 'cert-icon-box ' + cert.badgeClass;
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = cert.badge;
    modalIcon.appendChild(icon);

    // Description
    modalDesc.textContent = cert.description;

    // Preview
    modalPreview.replaceChildren();

    if (cert.file) {
      const isPdf = cert.file.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        const pdfLink = document.createElement('a');
        pdfLink.href = cert.file;
        pdfLink.target = '_blank';
        pdfLink.rel = 'noopener noreferrer';
        pdfLink.className = 'btn btn-outline';
        pdfLink.textContent = 'Open PDF Certificate';
        modalPreview.appendChild(pdfLink);
      } else {
        const img = document.createElement('img');
        img.src = cert.file;
        img.alt = cert.title + ' certificate preview';
        img.addEventListener('error', () => {
          modalPreview.replaceChildren();
          const err = document.createElement('p');
          err.className = 'cert-error-msg';
          err.textContent = 'Certificate file could not be loaded.';
          modalPreview.appendChild(err);
        });
        modalPreview.appendChild(img);
      }
    } else if (cert.link) {
      const credLink = document.createElement('a');
      credLink.href = cert.link;
      credLink.target = '_blank';
      credLink.rel = 'noopener noreferrer';
      credLink.className = 'btn btn-outline';
      credLink.textContent = 'View credential';
      modalPreview.appendChild(credLink);
    } else {
      const statusMsg = document.createElement('p');
      statusMsg.className = 'cert-status-msg';
      statusMsg.textContent = 'Certificate file will be added soon.';
      modalPreview.appendChild(statusMsg);
    }

    // Actions
    modalActions.replaceChildren();

    if (cert.link) {
      const verifyBtn = document.createElement('a');
      verifyBtn.href = cert.link;
      verifyBtn.target = '_blank';
      verifyBtn.rel = 'noopener noreferrer';
      verifyBtn.className = 'btn-modal-primary';
      verifyBtn.textContent = 'View Credential';
      modalActions.appendChild(verifyBtn);
    }

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn-modal-secondary';
    closeBtn.textContent = 'Close';
    closeBtn.addEventListener('click', () => DialogManager.close(modalOverlay));
    modalActions.appendChild(closeBtn);

    DialogManager.open(modalOverlay, opener);
  }
})();

// =====================================================
// 15. INITIALIZE ON DOM CONTENT LOADED
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  initResumeCheck();
});
