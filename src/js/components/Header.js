import navigationData from '../../data/navigation.json';
import router from '../utils/Router.js';

class Header {
  constructor() {
    this.isMenuOpen = false;
    this.isScrolled = false;
    this.navigationData = navigationData;
    this.headerElement = null;
  }

  async init() {
    this.render();
    this.attachEvents();
    window.addEventListener('hashchange', () => this.updateActiveLinks());
  }

  render() {
    const header = document.createElement('header');
    header.className = 'fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md';
    header.id = 'main-header';
    
    header.innerHTML = `
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <!-- Logo -->
        <a href="#/" class="font-mono text-sm font-semibold tracking-wider text-primary">
          ${navigationData.siteTitle}.
        </a>

        <!-- Desktop Navigation -->
        <ul class="hidden items-center gap-8 md:flex" id="desktop-nav">
          ${this.renderNavLinks()}
        </ul>

        <!-- Mobile Hamburger -->
        <button 
          id="mobile-menu-toggle"
          class="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span class="hamburger-line h-0.5 w-6 bg-foreground transition-transform duration-300"></span>
          <span class="hamburger-line h-0.5 w-6 bg-foreground transition-opacity duration-300"></span>
          <span class="hamburger-line h-0.5 w-6 bg-foreground transition-transform duration-300"></span>
        </button>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
        <ul class="flex flex-col gap-1 px-6 py-4">
          ${this.renderNavLinks(true)}
        </ul>
      </div>
    `;

    document.body.insertBefore(header, document.body.firstChild);
    this.headerElement = header;
  }

  renderNavLinks(isMobile = false) {
    return this.navigationData.mainNav.map(item => {
      const isActive = router.getCurrentRoute() === item.path;
      
      if (isMobile) {
        const activeClass = isActive ? 'text-primary' : 'text-muted-foreground';
        return `
          <li>
            <a 
              href="#${item.path}" 
              class="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${activeClass} nav-link"
              data-path="${item.path}"
            >
              ${item.label}
            </a>
          </li>
        `;
      } else {
        const activeClass = isActive ? 'text-primary' : 'text-muted-foreground';
        return `
          <li>
            <a 
              href="#${item.path}" 
              class="text-sm transition-colors hover:text-primary ${activeClass} nav-link"
              data-path="${item.path}"
            >
              ${item.label}
            </a>
          </li>
        `;
      }
    }).join('');
  }

  attachEvents() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const lines = toggleBtn.querySelectorAll('.hamburger-line');

    toggleBtn.addEventListener('click', () => {
      this.isMenuOpen = !this.isMenuOpen;
      
      if (this.isMenuOpen) {
        // Ouvrir le menu
        mobileMenu.classList.remove('hidden');
        
        // Animation hamburger -> X
        lines[0].style.transform = 'translateY(8px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        // Fermer le menu
        mobileMenu.classList.add('hidden');
        
        // Animation X -> hamburger
        lines[0].style.transform = '';
        lines[1].style.opacity = '1';
        lines[2].style.transform = '';
      }
    });

    // Fermer le menu lors du clic sur un lien
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link') && this.isMenuOpen) {
        this.isMenuOpen = false;
        mobileMenu.classList.add('hidden');
        lines[0].style.transform = '';
        lines[1].style.opacity = '1';
        lines[2].style.transform = '';
      }
    });
  }

  updateActiveLinks() {
    const currentPath = router.getCurrentRoute();
    const allLinks = document.querySelectorAll('.nav-link');
    
    allLinks.forEach(link => {
      const linkPath = link.getAttribute('data-path');
      const isActive = currentPath === linkPath;
      
      if (isActive) {
        link.classList.add('text-primary');
        link.classList.remove('text-muted-foreground');
      } else {
        link.classList.remove('text-primary');
        link.classList.add('text-muted-foreground');
      }
    });
  }
}

export default new Header();