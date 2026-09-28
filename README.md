# Adicherla Saiteja — Personal Portfolio

A clean, professional, and fully responsive personal portfolio website built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks, no build tools, no npm required.

**Live Site:** [https://saiteja9110.github.io/My-portfolio/](https://saiteja9110.github.io/My-portfolio/)

---

## 📁 Project Structure

```
portfolio/
├── index.html          ← Main HTML file (entry point)
├── style.css           ← All styles
├── script.js           ← Vanilla JavaScript
├── README.md           ← This file
├── .gitignore          ← Git ignore rules
└── assets/
    ├── profile.jpg     ← Your profile photo
    ├── resume.pdf      ← Your resume (add this file!)
    └── projects/       ← Project screenshots (optional)
```

---

## 🚀 How to Run Locally

1. **Clone or download** this repository
2. Open the `portfolio/` folder
3. Double-click `index.html` — it opens directly in your browser

No server, no npm, no build command needed.

---

## ☁️ How to Deploy on GitHub Pages

### Step 1 — Add your resume
Place your resume PDF at:
```
assets/resume.pdf
```

### Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/Saiteja9110/My-portfolio.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select branch `main` and folder `/ (root)`
4. Click **Save**

Your site will be live at:
```
https://saiteja9110.github.io/My-portfolio/
```

> ⚠️ GitHub Pages may take 1–3 minutes to go live after the first deploy.

---

## ✅ Portfolio Sections

| Section | Description |
|---|---|
| **Home** | Hero section with name, title, and CTA buttons |
| **About Me** | Personal introduction, languages, hobbies |
| **Education** | B.Tech, Intermediate, SSC timeline |
| **Skills** | Programming, Hardware, Tools, Database |
| **Internships** | Cognifyz Technologies & EPIT Research Labs |
| **Projects** | 5 project cards with tech stack |
| **Certifications** | EPIT, Cognifyz, AWS, Avazya |
| **Workshops & Training** | Drone Technology workshops |
| **Contact** | Email, phone, GitHub, location |

---

## 🎨 Design

- **Color Palette:** White background + Dark Navy / Purple accents
- **Fonts:** Inter + Space Grotesk (via Google Fonts)
- **Responsive:** Desktop · Tablet · Mobile
- **Features:** Smooth scroll, mobile hamburger menu, fade-in animations, scroll-to-top button, active nav highlight

---

## 🛠️ Customization

| What to change | Where |
|---|---|
| Personal info, text | `index.html` |
| Colors, fonts, layout | `style.css` — edit CSS variables at the top |
| Animations, menu behavior | `script.js` |
| Profile photo | Replace `assets/profile.jpg` |
| Resume | Replace `assets/resume.pdf` |

---

## 📝 Notes

- All file paths use **relative paths** (e.g., `./assets/profile.jpg`) for correct GitHub Pages compatibility
- If `assets/resume.pdf` doesn't exist, the Download button won't throw any errors — the browser handles it gracefully
- If `assets/profile.jpg` fails to load, the page shows initials ("AS") as a fallback — no broken image icon
