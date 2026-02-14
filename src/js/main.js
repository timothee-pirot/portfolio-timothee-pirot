// Import du CSS
import '../styles/main.css';

// Import du Router et des composants
import router from './utils/Router.js';
import header from './components/Header.js';

// Import des pages
import homePage from './pages/Home.js';
import projectsPage from './pages/Projects.js';
import contactPage from './pages/Contact.js';
import projectDetailPage from './pages/ProjectDetail.js';
import aboutPage from './pages/About.js';

document.addEventListener('DOMContentLoaded', async () => {
  
  // Initialiser le header
  await header.init();
  
  // Conteneur principal pour le contenu
  const appContainer = document.getElementById('app');
  
  // Définir les routes
  router.addRoute('/', async () => {
    await homePage.init();
    appContainer.innerHTML = homePage.render();
    homePage.attachEvents();
    window.scrollTo(0, 0);
  });
  
  router.addRoute('/projects', async () => {
    await projectsPage.init();
    appContainer.innerHTML = projectsPage.render();
    projectsPage.attachEvents();
    window.scrollTo(0, 0);
  });

   router.addRoute('/projects/:slug', async (params) => {
    await projectDetailPage.init(params.slug);
    appContainer.innerHTML = projectDetailPage.render();
    projectDetailPage.attachEvents();
    window.scrollTo(0, 0);
  });
  
  router.addRoute('/moi', () => {
    appContainer.innerHTML = aboutPage.render();
    window.scrollTo(0, 0);
  });

  router.addRoute('/contact', () => {
    appContainer.innerHTML = contactPage.render();
    window.scrollTo(0, 0);
  });
  
  // Déclencher la route initiale
  router.handleRoute();
});