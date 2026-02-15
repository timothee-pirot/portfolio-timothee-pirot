# Portfolio - Timothée Pirot

> Multilingual web portfolio showcasing my projects in software development, robotics, and embedded systems.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://timothee-pirot.github.io/portfolio-timothee-pirot/#/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 🌐 Available Languages

- 🇬🇧 English (default)
- 🇫🇷 Français
- 🇩🇪 Deutsch *(coming soon)*

## ✨ Features

- **🌍 Multilingual** - i18n system with localStorage persistence and slug-based navigation
- **📱 Responsive** - Mobile-first design optimized with TailwindCSS
- **🔗 Smart Navigation** - Bidirectional links between skills ↔ projects
- **⚡ Performance** - Ultra-fast SPA with Vite and lazy loading
- **🎯 SEO-friendly** - Semantic structure and optimized meta tags
- **🎨 Dark theme** - Modern interface with teal accent

## 🛠️ Tech Stack

### Core
- **Vite 5.4** - Build tool & dev server with HMR
- **TailwindCSS 3.4** - Utility-first CSS framework
- **Vanilla JavaScript (ES6+)** - Component-based modular architecture

### Architecture
- **SPA Router** - Client-side navigation without page reload
- **i18n System** - Manual translation with localized JSON data
- **Component-based** - Reusable modular structure
- **Centralized Data** - JSON for projects, skills, and UI

## 📁 Project Structure
```
.
├── README.md
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   │       ├── autres/
│   │       └── projets/
│   └── documents/
│       ├── cv-dev-timothee-pirot.pdf
│       └── cv-robotique-timothee-pirot.pdf
└── src/
    ├── data/
    │   ├── en/                    # English data
    │   │   ├── projects.json
    │   │   ├── skills.json
    │   │   └── ui.json
    │   ├── fr/                    # French data
    │   │   ├── projects.json
    │   │   ├── skills.json
    │   │   └── ui.json
    │   ├── navigation.json
    │   └── profile.json
    ├── js/
    │   ├── components/            # Reusable UI components
    │   │   ├── FeaturedProjects.js
    │   │   ├── Footer.js
    │   │   ├── Header.js
    │   │   ├── Hero.js
    │   │   ├── ProjectCard.js
    │   │   ├── ProjectGrid.js
    │   │   └── SkillsSection.js
    │   ├── pages/                 # Application pages
    │   │   ├── About.js
    │   │   ├── Contact.js
    │   │   ├── Home.js
    │   │   ├── ProjectDetail.js
    │   │   └── Projects.js
    │   ├── utils/                 # Utilities
    │   │   ├── Router.js          # SPA routing
    │   │   └── i18n.js            # Translation system
    │   └── main.js                # Entry point
    └── styles/
        └── main.css
```

## 🚀 Installation & Development

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Installation
```bash
# Clone the repository
git clone https://github.com/timothee-pirot/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at **http://localhost:5173**

### Available Scripts
```bash
npm run dev      # Development server with HMR (port 5173)
npm run build    # Production build to /dist
npm run preview  # Preview production build
npm run deploy   # Build + automatic deployment to GitHub Pages
```

## 🎨 Customization

### Modify Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#14b8a6',  // Teal-500
        dark: '#0d9488',     // Teal-600
      },
    },
  },
}
```

### Add a Project

1. Add data to `src/data/en/projects.json` and `src/data/fr/projects.json`
2. Add images to `public/assets/images/projets/`
3. The project will automatically appear with slug-based navigation
```json
{
  "id": "my-project",
  "slug": {
    "en": "my-project",
    "fr": "mon-projet"
  },
  "title": "My New Project",
  "category": "robotics",
  "tags": ["ROS2", "Python", "URDF"]
}
```

### Add a Language

1. Create a folder `src/data/de/` (for German, for example)
2. Copy and translate `projects.json`, `skills.json`, `ui.json`
3. Add the language to `src/js/utils/i18n.js`
4. Update slugs in `navigation.json`

## 🎯 Project Goals

This portfolio serves as a technical showcase to:
- Demonstrate my skills in **modern web development**
- Present my projects in **robotics and embedded systems**
- Facilitate the search for a **24-month apprenticeship** starting September 2026
- Serve as a modern alternative to traditional CVs with focus on concrete achievements

## 📄 License

[MIT License](LICENSE) - Free to use and modify

## 📧 Contact

**Timothée Pirot** - Engineering Student (Bac+3) @ EPITECH Paris

- 🔗 [Live Portfolio](https://timothee-pirot.github.io/portfolio-timothee-pirot/#/)
- 💼 [LinkedIn](https://linkedin.com/in/timothee-pirot)
- 📧 [Email](mailto:timothee.pirot@epitech.eu)
- 🐙 [GitHub](https://github.com/timothee-pirot)

---

💡 **Looking for an apprenticeship** in software development or robotics/automation (24 months, starting Sept. 2026)