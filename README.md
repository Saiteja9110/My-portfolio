# Adicherla Saiteja — Personal Portfolio

A clean, professional, and fully responsive personal portfolio website built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools, no npm required.

**Live Site:** [https://saiteja9110.github.io/My-portfolio/](https://saiteja9110.github.io/My-portfolio/)

---

## 📁 Project Structure

```
portfolio/
├── index.html            ← Main HTML file (semantic, accessible entry point)
├── style.css             ← Professional dark theme stylesheet & responsive design
├── script.js             ← Vanilla JavaScript (state, dialogs, dynamic rendering)
├── robots.txt            ← Search engine crawling directives
├── sitemap.xml           ← XML sitemap for SEO
├── README.md             ← Documentation and maintenance guide
├── .gitignore            ← Git ignore rules
└── assets/
    ├── favicon.svg       ← SVG website icon
    ├── profile.jpg       ← Profile photo (640px wide)
    ├── resume.pdf        ← Resume PDF
    ├── resume.html       ← Resume HTML snapshot
    └── certificates/     ← Place certificate images or PDFs here
        └── README.txt    ← Certificate placement guide
```

---

## 🚀 How to Run Locally

1. Open the project folder in your terminal or file explorer.
2. Open `index.html` directly in any web browser (or serve with a lightweight local server like Python `python -m http.server` or VS Code Live Server).
3. No build steps, dependencies, or compilers required.

---

## 🎨 Design & Theme

- **Color Theme:** Dark Navy & Slate (`#0a0e1a` base, `#0f1421` surface, `#141929` elevated cards).
- **Accents:** Restrained Blue (`#3b82f6`, `#60a5fa`) and Teal (`#14b8a6`) for core hardware strengths.
- **Typography:** Inter (Body) & Space Grotesk (Headings) via Google Fonts.
- **Accessibility:** Skip-to-content link, keyboard focus trapping within modal dialogs, `:focus-visible` styling, screen-reader `aria-*` attributes, and `@media (prefers-reduced-motion: reduce)` support.

---

## ⚙️ Configuration in `script.js`

All dynamic data and content settings are managed directly in `script.js`.

### 1. Resume Configuration (`RESUME`)

```javascript
const RESUME = {
  path: './assets/resume.pdf',
};
```

- On page load, `script.js` executes a lightweight `fetch` HEAD request to check whether `./assets/resume.pdf` exists.
- If missing, all resume buttons across the site gracefully switch to a disabled state displaying **"Resume coming soon"** (preventing 404 errors or failed downloads).
- Once you drop your actual PDF into `assets/resume.pdf`, all buttons automatically reactivate with "View Resume" and "Download Resume".

### 2. Certifications Configuration (`CERTIFICATES`)

Certificates are rendered dynamically from the `CERTIFICATES` array in `script.js`:

```javascript
const CERTIFICATES = [
  {
    id: 'epit-cert',
    title: 'Internship Certificate',
    issuer: 'EPIT Research Labs Pvt. Ltd.',
    description: 'Certificate of completion for a 3-month IoT, Embedded & Drone Technology Internship...',
    badge: 'EP',
    badgeClass: 'epit-c',
    file: null, // Path under assets/certificates/, e.g. './assets/certificates/epit-cert.pdf'
    link: null, // Verification URL if available
  },
  // ...
];
```

#### How to Add a Certificate:
1. Place your certificate image (`.jpg`, `.png`, `.webp`) or document (`.pdf`) in the `assets/certificates/` folder.
2. In `script.js`, find the corresponding certificate entry in `CERTIFICATES`.
3. Set `file: './assets/certificates/your-certificate-file.pdf'` (or `.jpg`).
4. If an external credential URL exists, set `link: 'https://...'`.
5. Save the file. The card will now show "View certificate" and display the file inside the modal viewer.

### 3. Projects Configuration (`PROJECTS`)

Projects are organized into groups (`Hardware and embedded`, `Web`) and rendered dynamically:

```javascript
const PROJECTS = [
  {
    id: 'embedded-kit',
    group: 'Hardware and embedded',
    title: 'Embedded & IIoT Kit',
    category: 'IoT / Embedded Systems',
    categoryClass: 'cat-embedded', // 'cat-embedded' | 'cat-hardware' | 'cat-web'
    desc: '...',
    tech: ['Embedded C', 'Arduino', 'IoT Protocols', 'LCD/TFT Displays', 'Sensors', 'Hardware'],
    highlights: [ ... ],
    github: null, // null displays "Repository Coming Soon"
    demo: null,   // Optional live URL (displays "Live Demo" button when set)
    image: null,  // Optional path under assets/projects/ (16:9 ratio)
  },
  // ...
];
```

- Each card displays the first 3 technology tags to stay clean, while the interactive detail dialog shows the full technology list and all key highlights.
- If `image` is provided, a 16:9 preview image is shown on the card and inside the modal.
- If `demo` is provided, an interactive "Live Demo" link appears in the modal actions.

---

## ☁️ How to Deploy on GitHub Pages

1. Add your `resume.pdf` to `assets/` and any certificates to `assets/certificates/`.
2. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Update portfolio with accessible dark theme"
   git push origin main
   ```
3. In GitHub: go to **Settings** → **Pages** → Source: `Deploy from a branch` → Select `main` / `/(root)`.
4. Your site will be live at `https://saiteja9110.github.io/My-portfolio/`.
