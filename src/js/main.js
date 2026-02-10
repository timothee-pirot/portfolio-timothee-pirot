// Import du CSS
import '../styles/main.css';

// Import du Router et des composants
import router from './utils/Router.js';
import header from './components/Header.js';

// Import des pages
import homePage from './pages/Home.js';
import projectsPage from './pages/Projects.js';
import contactPage from './pages/Contact.js';

// Initialisation
console.log('Portfolio initialized! 🚀');

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM ready');
  
  // Initialiser le header
  await header.init();
  
  // Conteneur principal pour le contenu
  const appContainer = document.getElementById('app');
  
  // Définir les routes
  router.addRoute('/', () => {
    appContainer.innerHTML = homePage.render();
  });
  
  router.addRoute('/projects', () => {
    appContainer.innerHTML = projectsPage.render();
  });
  
  router.addRoute('/contact', () => {
    appContainer.innerHTML = contactPage.render();
  });
  
  // Déclencher la route initiale
  router.handleRoute();
});