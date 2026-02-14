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
    const fullHash = window.location.hash.slice(1) || '/';

    // Séparer le path des query params
    const [hash, queryString] = fullHash.split('?');
    this.queryParams = new URLSearchParams(queryString || '');

    // Chercher une route exacte
    if (this.routes[hash]) {
      this.currentRoute = hash;
      this.routes[hash]();
      return;
    }

    // Chercher une route avec paramètres
    for (const [path, handler] of Object.entries(this.routes)) {
      const params = this.matchRoute(path, hash);
      if (params) {
        this.currentRoute = hash;
        handler(params);
        return;
      }
    }

    // Route par défaut
    if (this.routes['/']) {
      this.currentRoute = '/';
      this.routes['/']();
    }
  }

  // Obtenir un query param (ex: router.getQueryParam('skill'))
  getQueryParam(key) {
    return this.queryParams ? this.queryParams.get(key) : null;
  }

  // Matcher une route avec paramètres (ex: /projects/:slug)
  matchRoute(pattern, path) {
    const patternParts = pattern.split('/');
    const pathParts = path.split('/');

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params = {};
    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(':')) {
        // C'est un paramètre
        const paramName = patternParts[i].slice(1);
        params[paramName] = pathParts[i];
      } else if (patternParts[i] !== pathParts[i]) {
        // Pas de match
        return null;
      }
    }

    return params;
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