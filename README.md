# 🚀 CodeAlpha Portfolio

A highly interactive, modern, and visually striking personal portfolio website for **Anik Das**. Built to showcase skills, projects, certifications, and GitHub activity dynamically.

## 🌟 Live Demo

The portfolio is deployed and accessible at:
- **Firebase Hosting:** [codealpha-portfolio.web.app](https://codealpha-portfolio.web.app)
- **GitHub Pages:** [anik-da.github.io/CodeAlpha_Portfolio](https://anik-da.github.io/CodeAlpha_Portfolio/)

## ✨ Key Features

- **Modern UI/UX:** Dark-themed aesthetic with vibrant neon purple and cyan gradients, smooth scroll-reveal animations, and glassmorphism elements.
- **Dynamic GitHub Integration:** Automatically fetches and displays public repositories directly from the GitHub API, allowing for instant updates without editing HTML.
- **Live Project Fallbacks:** Intelligently maps "Live Demo" links for featured projects even if GitHub repository metadata is incomplete.
- **Interactive Particle Background:** A custom-built HTML5 Canvas particle system that reacts to mouse movements for a premium feel.
- **Dynamic Statistics:** Accurate counting logic that fetches live GitHub commit history and reads DOM elements to display correct metrics.
- **Hidden Admin Portal:** Features a secret admin command center to view messages securely.
- **Automated PDF Resume:** Uses `html2pdf.js` to dynamically generate a clean, text-selectable PDF resume directly from the live site data.

## 🛠️ Technology Stack

- **Core:** HTML5, Vanilla JavaScript (ES6+), CSS3
- **Styling:** Custom CSS with advanced selectors, pseudo-elements, grid/flexbox layouts, and keyframe animations.
- **Icons:** FontAwesome (v6)
- **PDF Generation:** html2pdf.js (via CDN)
- **Backend & Hosting:** Firebase Hosting, GitHub Pages (via Actions), Firebase Realtime Database (for the contact form)
- **APIs:** GitHub REST API (Users & Repos endpoints)

## 📂 Project Structure

```text
📁 c:\Portfolio
├── 📄 index.html      # Main HTML structure and layout
├── 🎨 style.css       # Core styling, animations, and responsive design
├── ⚙️ script.js       # Dynamic logic, API fetching, and canvas effects
├── 🖼️ profile_hero.png  # Hero section profile image
├── 🖼️ profile_about.png # About section profile image
├── 🔥 firebase.json   # Firebase configuration rules
└── ⚙️ .firebaserc     # Firebase project association
```

## 🚀 Running Locally

To run the portfolio on your local machine for development:

1. Clone this repository:
   ```bash
   git clone https://github.com/Anik-da/CodeAlpha_Portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd CodeAlpha_Portfolio
   ```
3. Start a local server. You can use an extension like VS Code "Live Server" or Python:
   ```bash
   # Using Python 3
   python -m http.server 8000
   ```
4. Open your browser and navigate to `http://localhost:8000`.

## 📦 Deployment

This project uses dual-deployment for high availability:

### 1. GitHub Pages (Automated)
The repository uses a GitHub Actions workflow (`.github/workflows/static.yml`) to automatically build and deploy to GitHub Pages every time code is pushed to the `main` branch. 
*Note: Ensure "GitHub Actions" is selected as the Source under Settings > Pages.*

### 2. Firebase Hosting (Manual)
To deploy manually to Firebase via the CLI:
```bash
firebase deploy --only hosting
```

---

*Designed and developed by Anik Das.*
