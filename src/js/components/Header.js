import navigationData from '../../data/navigation.json';
import router from '../utils/Router.js';
import i18n from '../utils/i18n.js';

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

  _renderInnerHTML() {
    return `
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <!-- Logo -->
        <a href="#/" class="font-mono text-sm font-semibold tracking-wider text-primary">
          ${this.navigationData.siteTitle}.
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 md:flex">
          <ul class="flex items-center gap-8" id="desktop-nav">
            ${this.renderNavLinks()}
          </ul>
          <button
            id="lang-toggle-desktop"
            class="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Switch language"
          >
            ${i18n.getLocale() === 'fr' ? 'EN' : 'FR'}
          </button>
        </div>

        <!-- Mobile: lang toggle + hamburger -->
        <div class="flex items-center gap-3 md:hidden">
          <button
            id="lang-toggle-mobile"
            class="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Switch language"
          >
            ${i18n.getLocale() === 'fr' ? 'EN' : 'FR'}
          </button>
          <button
            id="mobile-menu-toggle"
            class="flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span class="hamburger-line h-0.5 w-6 bg-foreground transition-transform duration-300"></span>
            <span class="hamburger-line h-0.5 w-6 bg-foreground transition-opacity duration-300"></span>
            <span class="hamburger-line h-0.5 w-6 bg-foreground transition-transform duration-300"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
        <ul class="flex flex-col gap-1 px-6 py-4">
          ${this.renderNavLinks(true)}
        </ul>
      </div>
    `;
  }

  render() {
    const header = document.createElement('header');
    header.className = 'fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md';
    header.id = 'main-header';
    header.innerHTML = this._renderInnerHTML();

    document.body.insertBefore(header, document.body.firstChild);
    this.headerElement = header;
  }

  reRender() {
    const header = document.getElementById('main-header');
    if (!header) return;
    header.innerHTML = this._renderInnerHTML();
    this.isMenuOpen = false;
    this.attachEvents();
    this.updateActiveLinks();
  }

  renderNavLinks(isMobile = false) {
    return this.navigationData.mainNav.map(item => {
      const isActive = router.getCurrentRoute() === item.path;
      const label = i18n.td(item.label);

      if (isMobile) {
        const activeClass = isActive ? 'text-primary' : 'text-muted-foreground';
        return `
          <li>
            <a
              href="#${item.path}"
              class="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${activeClass} nav-link"
              data-path="${item.path}"
            >
              ${label}
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
              ${label}
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
        mobileMenu.classList.remove('hidden');
        lines[0].style.transform = 'translateY(8px) rotate(45deg)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        mobileMenu.classList.add('hidden');
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

    // Language toggle
    const langDesktop = document.getElementById('lang-toggle-desktop');
    const langMobile = document.getElementById('lang-toggle-mobile');
    const handleLangToggle = () => i18n.toggleLocale();
    if (langDesktop) langDesktop.addEventListener('click', handleLangToggle);
    if (langMobile) langMobile.addEventListener('click', handleLangToggle);
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
