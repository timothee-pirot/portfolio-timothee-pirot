// Système de routing avec hash pour SPA
class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    
    // Écouter les changements de hash
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  // Enregistrer une route
  addRoute(path, handler) {
    this.routes[path] = handler;
  }

  // Gérer le changement de route
  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const route = this.routes[hash] || this.routes['/'];
    
    if (route) {
      this.currentRoute = hash;
      route();
    }
  }

  // Naviguer vers une route
  navigate(path) {
    window.location.hash = path;
  }

  // Obtenir la route actuelle
  getCurrentRoute() {
    return window.location.hash.slice(1) || '/';
  }
}

export default new Router();