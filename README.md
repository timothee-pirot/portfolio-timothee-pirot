# Portfolio - Timothée Pirot

Portfolio web présentant mes projets en dev, robotique, et autre

## 🚀 Aperçu

Site web moderne mettant en avant mes compétences techniques à travers des projets concrets en robotique, programmation embarquée et automatisation industrielle.


## 🛠️ Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique
- **TailwindCSS 3.4** - Framework CSS utility-first pour un design moderne et responsive
- **JavaScript (ES6+)** - Logique interactive et génération dynamique de contenu
- **Vite 5.4** - Build tool ultra-rapide avec Hot Module Replacement

### Build & Deployment
- **PostCSS** - Traitement CSS avec Autoprefixer
- **GitHub Pages** - Hébergement statique
- **Git** - Versioning

### Architecture
- **JSON** - Centralisation des données (projets, compétences, timeline)
- **Modules ES6** - Organisation du code en composants réutilisables

## 📁 Structure du projet
```
portfolio-timothee-pirot/
├── src/
│   ├── js/
│   │   ├── main.js
│   │   ├── components/       
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── ProjectCard.js
│   │   │   ├── ProjectGrid.js
│   │   │   ├── SkillCard.js
│   │   │   ├── Filter.js
│   │   │   └── Footer.js
│   │   └── utils/    (optionnel)
│   │       ├── dataLoader.js
│   │       └── helpers.js
│   ├── styles/
│   │   └── main.css
│   ├── data/
│   │   ├── projects.json
│   │   ├── skills.json
│   │   └── timeline.json
│   └── assets/
│       └── images/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🚀 Installation & Développement

### Prérequis
- Node.js 16+
- npm 7+

### Installation
```bash
# Cloner le repo
git clone https://github.com/timothee-pirot/portfolio-timothee-pirot.git
cd portfolio-timothee-pirot

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173/`

### Scripts disponibles
```bash
npm run dev      # Serveur de développement avec hot reload
npm run build    # Build de production dans /dist
npm run preview  # Prévisualiser le build de production
npm run deploy   # Build + déploiement sur GitHub Pages
```

## 🎨 Fonctionnalités

- ✅ **Design responsive** - Optimisé mobile, tablette, desktop
- ✅ **Navigation fluide** - Filtres par catégorie, tags cliquables
- ✅ **Projets détaillés** - Pages dédiées avec contexte, solution, résultats
- ✅ **Compétences interactives** - Lien bidirectionnel compétences ↔ projets
- ✅ **Performance optimisée** - Lazy loading, code splitting
- ✅ **SEO-friendly** - Meta tags, structure sémantique

## 📝 Personnalisation

### Modifier les couleurs

Éditer `tailwind.config.js` :
```javascript
theme: {
  extend: {
    colors: {
      primary: '#3B82F6',    // Couleur principale
      secondary: '#10B981',  // Couleur secondaire
    },
  },
}
```

### Ajouter un projet

Éditer `src/data/projects.json` :
```json
{
  "id": "nouveau-projet",
  "title": "Mon Projet",
  "category": "robotics",
  "tags": ["CATIA", "Arduino"],
}
```

## 📄 License

MIT License - Libre d'utilisation

## 📧 Contact

**Timothée Pirot**
- GitHub:
- LinkedIn: 
- Email:

