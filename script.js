/* =====================================================
   ADICHERLA SAITEJA – PORTFOLIO JAVASCRIPT
   Pure Vanilla JS — No frameworks, no build step
   ===================================================== */

'use strict';

// ---- UTILITY HELPERS ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Focus trapping helper for modals
function trapFocus(modalElement, e) {
  if (e.key !== 'Tab') return;
  const focusables = modalElement.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusables.length) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.shiftKey) {
    if (document.activeElement === first) {
      last.focus();
      e.preventDefault();
    }
  } else {
    if (document.activeElement === last) {
      first.focus();
      e.preventDefault();
    }
  }
}

// =====================================================
// 1. HERO: TYPING EFFECT
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
    'IIoT Projects'
  ];

  let wi = 0, ci = 0, deleting = false;
  const SPEED_TYPE = 80, SPEED_DEL = 45, PAUSE = 1600;

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
// 2. HERO: STAT COUNTERS
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
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
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
// 3. NAVBAR — scroll shadow & active link highlight
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
    if (navbar) navbar.classList.toggle('scrolled', scrollY > 10);

    let current = 'home';
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) continue;
      if (scrollY >= section.offsetTop - 140) current = id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// =====================================================
// 4. MOBILE HAMBURGER MENU
// =====================================================
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const navMenu   = $('#nav-menu');
  const navLinks  = $$('.nav-link');

  if (!hamburger || !navMenu) return;

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
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });
})();

// =====================================================
// 5. SMOOTH SCROLL for anchor links
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
// 6. SCROLL-TO-TOP BUTTON
// =====================================================
(function initScrollTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/>
    </svg>
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// =====================================================
// 7. FADE-IN ANIMATION on scroll (IntersectionObserver)
// =====================================================
(function initFadeIn() {
  const targets = [
    '.timeline-card', '.skill-category-card', '.internship-card',
    '.proj-card', '.cert-card', '.strength-card',
    '.workshop-card', '.about-info-card', '.contact-card', '.contact-cta'
  ];

  targets.forEach(selector => {
    $$(selector).forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${(i % 4) * 0.08}s`;
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
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  $$('.fade-in').forEach(el => observer.observe(el));
})();

// =====================================================
// 8. PROFILE IMAGE — graceful fallback
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
// 9. CURRENT YEAR in footer copyright
// =====================================================
(function initFooterYear() {
  const copy = $('.footer-copy');
  if (!copy) return;
  copy.innerHTML = copy.innerHTML.replace(/\d{4}/, new Date().getFullYear());
})();

// =====================================================
// 10. PROJECTS: MODAL VIEWER SYSTEM
// =====================================================
(function initProjectModal() {
  const GITHUB_SVG = '<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>';

  const PROJECTS = {
    1: {
      title: 'To-Do List Application',
      category: 'Web App',
      icon: '<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>',
      desc: 'Developed a fully interactive task management web application from scratch using pure HTML, CSS, and JavaScript. The app allows users to add, edit, mark as complete, and delete tasks with a clean and intuitive interface.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
      highlights: [
        'Add, edit, complete, and delete tasks with smooth feedback',
        'Tasks persist across sessions using browser LocalStorage',
        'Responsive layout works seamlessly on all device screen sizes',
        'Clean, minimal user interface designed for daily productivity'
      ],
      github: 'https://github.com/Saiteja9110/To-do-list'
    },
    2: {
      title: 'User-Friendly Web Pages',
      category: 'Web Design',
      icon: '<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
      desc: 'Designed and developed multiple responsive, user-friendly web pages as part of internship tasks at Cognifyz Technologies. Focused on creating clean layouts, easy navigation, and optimal user experience across devices.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      highlights: [
        'Built responsive layouts using modern CSS Flexbox and Grid',
        'Focused on accessibility, visual hierarchy, and cross-browser reliability',
        'Implemented clean navigation and intuitive UI patterns',
        'Optimized design for fast loading on desktop and mobile'
      ],
      github: 'https://github.com/Saiteja9110/User-Friendly-web-page'
    },
    3: {
      title: 'Embedded & IIoT Kit',
      category: 'IoT / Embedded Systems',
      icon: '<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>',
      desc: 'Developed a comprehensive educational hardware kit featuring 52 sensor modules, LCD, and TFT displays designed to give students hands-on learning experience in embedded systems and Industrial IoT (IIoT) concepts during the EPIT Research Labs internship.',
      tech: ['Embedded C', 'Arduino', 'IoT Protocols', 'LCD/TFT Displays', 'Sensors', 'Hardware'],
      highlights: [
        'Integrated 52 different sensor types for diverse industrial scenarios',
        'LCD and TFT display integration for real-time telemetry visualization',
        'Designed specifically for educational training to teach IIoT fundamentals',
        'Hands-on circuit wiring, breadboarding, and hardware troubleshooting'
      ],
      github: null
    },
    4: {
      title: 'Drone Construction',
      category: 'Hardware / UAV',
      icon: '<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>',
      desc: 'Gained comprehensive practical knowledge of UAV (Unmanned Aerial Vehicle) construction through hands-on workshops and internship training at EPIT Research Labs. Covered the full pipeline from hardware assembly to understanding flight dynamics.',
      tech: ['Hardware Assembly', 'Electronics', 'Flight Controllers', 'ESCs & Motors', 'Propulsion Systems'],
      highlights: [
        'Assembled carbon-fiber frame, brushless motors, ESCs, and flight controller',
        'Mastered flight mechanics: lift, thrust, drag, and torque equilibrium',
        'Integrated telemetry modules and calibrated electronic speed controllers',
        'Participated in intensive 3-day drone workshops across engineering colleges'
      ],
      github: 'https://github.com/Saiteja9110/Drone-Construction'
    },
    5: {
      title: 'Netflix Clone',
      category: 'Frontend Clone',
      icon: '<svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.89L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
      desc: "Built a pixel-perfect, fully responsive Netflix-inspired streaming website featuring a modern dark UI, dynamic movie category rows, hero banner, and mobile-friendly navigation that closely replicates the original platform's visual experience.",
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Flexbox', 'Responsive Design'],
      highlights: [
        "Pixel-perfect dark UI matching modern streaming design patterns",
        'Dynamic content rows with horizontal scrolling categories',
        'Hero banner section with prominent title overlay',
        'Fully responsive design that adapts smoothly across screen sizes'
      ],
      github: 'https://github.com/Saiteja9110/Telugu-Movie-Clone'
    }
  };

  const overlay  = $('#projModal');
  const modalBox = $('#projModalBox');
  const closeBtn = $('#projModalClose');
  const iconEl   = $('#projModalIcon');
  const catEl    = $('#projModalCategory');
  const titleEl  = $('#modalTitle');
  const descEl   = $('#projModalDesc');
  const techEl   = $('#projModalTech');
  const hlWrap   = $('#projModalHighlightsWrap');
  const hlList   = $('#projModalHighlights');
  const actions  = $('#projModalActions');

  let lastActiveElement = null;

  if (!overlay) return;

  function openModal(id) {
    const p = PROJECTS[id];
    if (!p) return;

    lastActiveElement = document.activeElement;

    iconEl.innerHTML = p.icon;
    catEl.textContent = p.category;
    titleEl.textContent = p.title;
    descEl.textContent = p.desc;
    techEl.innerHTML = p.tech.map(t => `<span class="tech-badge">${t}</span>`).join('');

    if (p.highlights && p.highlights.length) {
      hlWrap.style.display = '';
      hlList.innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');
    } else {
      hlWrap.style.display = 'none';
    }

    const closeSecondary = `<button class="btn-modal-secondary" id="modalCloseBtn" type="button">Close</button>`;

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
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          Repository Coming Soon
        </span>
        ${closeSecondary}
      `;
    }

    const closeSecBtn = $('#modalCloseBtn');
    if (closeSecBtn) closeSecBtn.addEventListener('click', closeModal);

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn.focus(), 50);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (lastActiveElement) lastActiveElement.focus();
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
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (overlay.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      trapFocus(modalBox, e);
    }
  });
})();

// =====================================================
// 11. CERTIFICATIONS: GALLERY & MODAL VIEWER SYSTEM
// =====================================================
const CERTIFICATES = [
  {
    id: 'epit',
    title: 'Internship Certificate',
    issuer: 'EPIT Research Labs Pvt. Ltd.',
    date: '2024',
    category: 'internship',
    categoryLabel: 'Internship',
    iconLabel: 'EP',
    iconClass: 'epit-c',
    description: 'Certificate of completion for a 3-month IoT, Embedded & Drone Technology Internship. Gained practical experience in hardware, sensors, embedded systems, and drone integration.',
    thumbnail: null,   // path like './assets/certs/epit.jpg' when available
    file: null,        // path like './assets/certs/epit.pdf' when available
    verificationUrl: null
  },
  {
    id: 'cognifyz',
    title: 'Internship Certificate',
    issuer: 'Cognifyz Technologies',
    date: '2024',
    category: 'internship',
    categoryLabel: 'Internship',
    iconLabel: 'CF',
    iconClass: 'cog-c',
    description: 'Certificate of completion for a 2-month Frontend Development Internship. Gained experience building user-friendly websites using React and Tailwind CSS.',
    thumbnail: null,
    file: null,
    verificationUrl: null
  },
  {
    id: 'aws',
    title: 'AWS Cloud Certification',
    issuer: 'Amazon Web Services',
    date: '2024',
    category: 'cloud',
    categoryLabel: 'Cloud',
    iconLabel: 'AWS',
    iconClass: 'aws-c',
    description: 'Certification demonstrating foundational knowledge of AWS cloud services, infrastructure, and core cloud computing concepts.',
    thumbnail: null,
    file: null,
    verificationUrl: null
  },
  {
    id: 'avazya',
    title: 'Training Certificate',
    issuer: 'Avazya',
    date: '2024',
    category: 'training',
    categoryLabel: 'Training',
    iconLabel: 'AV',
    iconClass: 'avz-c',
    description: 'Certificate of achievement awarded by Avazya in recognition of skills and participation in training programs.',
    thumbnail: null,
    file: null,
    verificationUrl: null
  }
];

(function initCertifications() {
  const gallery = document.getElementById('certGallery');
  const certModal = document.getElementById('certModal');
  const certModalBox = document.getElementById('certModalBox');
  const certModalClose = document.getElementById('certModalClose');
  const certModalIcon = document.getElementById('certModalIcon');
  const certModalCategory = document.getElementById('certModalCategory');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalIssuer = document.getElementById('certModalIssuer');
  const certModalPreview = document.getElementById('certModalPreview');
  const certModalDesc = document.getElementById('certModalDesc');
  const certModalActions = document.getElementById('certModalActions');
  const filterBtns = $$('.cert-filter-btn');

  let certLastActiveElement = null;

  if (!gallery || !certModal) return;

  // Render cards
  function renderCertCards() {
    gallery.innerHTML = CERTIFICATES.map(cert => `
      <div class="cert-card" data-id="${cert.id}" data-category="${cert.category}" tabindex="0" role="button" aria-label="View ${cert.title} from ${cert.issuer}">
        <div class="cert-card-preview">
          ${cert.thumbnail ? `
            <img src="${cert.thumbnail}" alt="${cert.title}" loading="lazy">
          ` : `
            <div class="cert-thumb-placeholder">
              <div class="cert-thumb-icon ${cert.iconClass}">${cert.iconLabel}</div>
              <p>Certificate Preview</p>
            </div>
          `}
        </div>
        <div class="cert-card-body">
          <span class="cert-category-pill ${cert.category}">${cert.categoryLabel}</span>
          <h3 class="cert-card-title">${cert.title}</h3>
          <p class="cert-card-issuer">${cert.issuer}</p>
          <p class="cert-card-date">${cert.date}</p>
        </div>
        <div class="cert-card-footer">
          <button class="cert-view-btn" data-id="${cert.id}" type="button">View Certificate</button>
        </div>
      </div>
    `).join('');

    // Attach listeners to cards and buttons
    $$('.cert-card', gallery).forEach(card => {
      const id = card.dataset.id;
      card.addEventListener('click', () => openCertModal(id));
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCertModal(id);
        }
      });
    });

    $$('.cert-view-btn', gallery).forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openCertModal(btn.dataset.id);
      });
    });
  }

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      const cards = $$('.cert-card', gallery);

      cards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open Modal
  function openCertModal(id) {
    const cert = CERTIFICATES.find(c => c.id === id);
    if (!cert) return;

    certLastActiveElement = document.activeElement;

    certModalIcon.className = `cert-modal-icon ${cert.iconClass}`;
    certModalIcon.textContent = cert.iconLabel;
    certModalCategory.textContent = cert.categoryLabel;
    certModalTitle.textContent = cert.title;
    certModalIssuer.textContent = `${cert.issuer} • ${cert.date}`;
    certModalDesc.textContent = cert.description;

    // Preview logic
    if (cert.thumbnail) {
      certModalPreview.innerHTML = `
        <img src="${cert.thumbnail}" alt="${cert.title}" style="max-width:100%; max-height:360px; object-fit:contain; border-radius:8px;">
      `;
    } else if (cert.file && cert.file.toLowerCase().endsWith('.pdf')) {
      certModalPreview.innerHTML = `
        <iframe src="${cert.file}" width="100%" height="320px" style="border:none; border-radius:8px;" title="${cert.title}"></iframe>
      `;
    } else {
      certModalPreview.innerHTML = `
        <div class="cert-modal-empty">
          <svg width="42" height="42" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.6" style="color:#64748b; margin-bottom:0.75rem;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p style="color:#94a3b8; font-size:0.95rem; font-weight:600;">Certificate file not yet added</p>
          <p style="color:#64748b; font-size:0.82rem; margin-top:0.35rem;">Place document in <code style="background:#141929; padding:2px 6px; border-radius:4px; color:#60a5fa;">assets/certs/</code> to display</p>
        </div>
      `;
    }

    // Actions
    let actionsHtml = '';
    if (cert.file) {
      actionsHtml += `<a href="${cert.file}" class="btn btn-primary" download target="_blank" rel="noopener noreferrer">Download Certificate</a>`;
    }
    if (cert.verificationUrl) {
      actionsHtml += `<a href="${cert.verificationUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">Verify Certificate</a>`;
    }
    actionsHtml += `<button class="btn btn-outline" id="certModalSecondaryClose" type="button">Close</button>`;
    certModalActions.innerHTML = actionsHtml;

    const secClose = document.getElementById('certModalSecondaryClose');
    if (secClose) secClose.addEventListener('click', closeCertModal);

    certModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => certModalClose.focus(), 50);
  }

  function closeCertModal() {
    certModal.classList.remove('open');
    document.body.style.overflow = '';
    if (certLastActiveElement) certLastActiveElement.focus();
  }

  certModalClose.addEventListener('click', closeCertModal);
  certModal.addEventListener('click', e => {
    if (e.target === certModal) closeCertModal();
  });

  document.addEventListener('keydown', e => {
    if (certModal.classList.contains('open')) {
      if (e.key === 'Escape') closeCertModal();
      trapFocus(certModalBox, e);
    }
  });

  renderCertCards();
})();
