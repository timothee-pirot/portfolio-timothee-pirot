import projectCard from './ProjectCard.js';

class ProjectGrid {
  constructor() {
    this.activeCategory = 'all';
    this.activeSkill = '';
    this.sort = 'recent';
    this.search = '';
    this.projects = [];
    this.skills = [];
    this.categories = [];
  }

  async init() {
    // Charger les données avec la nouvelle structure
    const [projectsData, skillsData] = await Promise.all([
      fetch('/portfolio-timothee-pirot/src/data/projects.json').then(r => r.json()),
      fetch('/portfolio-timothee-pirot/src/data/skills.json').then(r => r.json())
    ]);
    
    // Extraire projects et categories
    this.projects = projectsData.projects;
    this.categories = projectsData.categories;
    this.skills = skillsData.skills;
  }

  render() {
    const uniqueSkills = Array.from(new Set(this.skills.map(s => s.name))).sort();
    
    return `
      <div class="pt-20 container mx-auto px-6 py-12">
        <div class="mb-12">
          <p class="mb-2 font-mono text-sm tracking-wider text-primary">
            // projets
          </p>
          <h1 class="text-balance text-3xl font-bold text-foreground md:text-4xl">
            Tous mes projets
          </h1>
        </div>

        <!-- Search & Sort row -->
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="relative flex-1 sm:max-w-xs">
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              id="project-search"
              placeholder="Rechercher un projet..."
              value="${this.search}"
              class="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div class="flex items-center gap-3">
            <label for="project-sort" class="text-xs text-muted-foreground">
              Trier par
            </label>
            <select
              id="project-sort"
              class="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="recent">Plus récents</option>
              <option value="name">Nom</option>
              <option value="duration">Durée</option>
            </select>
          </div>
        </div>

        <!-- Category filters -->
        <div class="mb-4 flex flex-wrap gap-2" id="category-filters">
          ${this.categories.map(cat => `
            <button
              type="button"
              data-category="${cat.value}"
              class="category-filter rounded-md px-3 py-1.5 text-sm transition-colors ${
                this.activeCategory === cat.value 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }"
            >
              ${cat.label}
            </button>
          `).join('')}
        </div>

        <!-- Skill filter -->
        <div class="mb-8 flex flex-wrap gap-2" id="skill-filters">
          ${this.activeSkill ? `
            <button
              type="button"
              id="clear-skill"
              class="inline-flex items-center gap-1 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
            >
              ${this.activeSkill}
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ` : `
            <div class="flex flex-wrap gap-1.5">
              ${uniqueSkills.map(skill => `
                <button
                  type="button"
                  data-skill="${skill}"
                  class="skill-filter rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  ${skill}
                </button>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Active filters summary -->
        <div id="filter-summary" class="mb-6"></div>

        <!-- Projects grid -->
        <div id="projects-container"></div>
      </div>
    `;
  }

  getFilteredProjects() {
    let result = [...this.projects];

    // Category filter
    if (this.activeCategory !== 'all') {
      result = result.filter(p => p.category === this.activeCategory);
    }

    // Skill filter
    if (this.activeSkill) {
      result = result.filter(p => p.skills.includes(this.activeSkill));
    }

    // Search
    if (this.search) {
      const q = this.search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.snippet.toLowerCase().includes(q) ||
        p.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (this.sort) {
      case 'recent':
        result.sort((a, b) => (b.dates?.year || b.year) - (a.dates?.year || a.year));
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'duration':
        result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
    }

    return result;
  }

  updateProjectsDisplay() {
    const filtered = this.getFilteredProjects();
    const container = document.getElementById('projects-container');
    const summary = document.getElementById('filter-summary');
    
    const hasActiveFilters = this.activeCategory !== 'all' || this.activeSkill !== '' || this.search !== '';

    // Update summary
    if (hasActiveFilters) {
      summary.innerHTML = `
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            ${filtered.length} projet${filtered.length !== 1 ? 's' : ''} trouvé${filtered.length !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            id="clear-filters"
            class="text-primary hover:underline"
          >
            Effacer les filtres
          </button>
        </div>
      `;
    } else {
      summary.innerHTML = '';
    }

    // Update projects
    if (filtered.length > 0) {
      container.innerHTML = `
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          ${filtered.map(project => projectCard.render(project)).join('')}
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <p class="text-lg font-medium text-foreground">
            Aucun projet trouvé
          </p>
          <p class="mt-1 text-sm text-muted-foreground">
            Essayez de modifier vos filtres
          </p>
          <button
            type="button"
            id="clear-filters-empty"
            class="mt-4 text-sm text-primary hover:underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      `;
    }

    this.attachFilterEvents();
  }

  attachEvents() {
    // Search
    const searchInput = document.getElementById('project-search');
    searchInput.addEventListener('input', (e) => {
      this.search = e.target.value;
      this.updateProjectsDisplay();
    });

    // Sort
    const sortSelect = document.getElementById('project-sort');
    sortSelect.addEventListener('change', (e) => {
      this.sort = e.target.value;
      this.updateProjectsDisplay();
    });

    // Category filters
    document.querySelectorAll('.category-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeCategory = e.target.dataset.category;
        
        // Update button styles
        document.querySelectorAll('.category-filter').forEach(b => {
          b.classList.remove('bg-primary', 'text-primary-foreground');
          b.classList.add('bg-secondary', 'text-secondary-foreground');
        });
        e.target.classList.remove('bg-secondary', 'text-secondary-foreground');
        e.target.classList.add('bg-primary', 'text-primary-foreground');
        
        this.updateProjectsDisplay();
      });
    });

    // Skill filters
    document.querySelectorAll('.skill-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeSkill = e.target.dataset.skill;
        this.updateProjectsDisplay();
        // Re-render skill filters
        const skillFiltersContainer = document.getElementById('skill-filters');
        skillFiltersContainer.innerHTML = `
          <button
            type="button"
            id="clear-skill"
            class="inline-flex items-center gap-1 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
          >
            ${this.activeSkill}
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        `;
        this.attachFilterEvents();
      });
    });

    this.attachFilterEvents();
  }

  attachFilterEvents() {
    // Clear skill filter
    const clearSkillBtn = document.getElementById('clear-skill');
    if (clearSkillBtn) {
      clearSkillBtn.addEventListener('click', () => {
        this.activeSkill = '';
        this.updateProjectsDisplay();
        // Re-render skill filters
        this.renderSkillFilters();
      });
    }

    // Clear all filters
    const clearFiltersBtn = document.getElementById('clear-filters');
    const clearFiltersEmptyBtn = document.getElementById('clear-filters-empty');
    
    [clearFiltersBtn, clearFiltersEmptyBtn].forEach(btn => {
      if (btn) {
        btn.addEventListener('click', () => {
          this.activeCategory = 'all';
          this.activeSkill = '';
          this.search = '';
          document.getElementById('project-search').value = '';
          
          // Reset category buttons
          document.querySelectorAll('.category-filter').forEach(b => {
            b.classList.remove('bg-primary', 'text-primary-foreground');
            b.classList.add('bg-secondary', 'text-secondary-foreground');
          });
          document.querySelector('[data-category="all"]').classList.remove('bg-secondary', 'text-secondary-foreground');
          document.querySelector('[data-category="all"]').classList.add('bg-primary', 'text-primary-foreground');
          
          this.updateProjectsDisplay();
          this.renderSkillFilters();
        });
      }
    });
  }

  renderSkillFilters() {
    const uniqueSkills = Array.from(new Set(this.skills.map(s => s.name))).sort();
    const skillFiltersContainer = document.getElementById('skill-filters');
    skillFiltersContainer.innerHTML = `
      <div class="flex flex-wrap gap-1.5">
        ${uniqueSkills.map(skill => `
          <button
            type="button"
            data-skill="${skill}"
            class="skill-filter rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            ${skill}
          </button>
        `).join('')}
      </div>
    `;
    
    // Re-attach skill filter events
    document.querySelectorAll('.skill-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeSkill = e.target.dataset.skill;
        this.updateProjectsDisplay();
        skillFiltersContainer.innerHTML = `
          <button
            type="button"
            id="clear-skill"
            class="inline-flex items-center gap-1 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
          >
            ${this.activeSkill}
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        `;
        this.attachFilterEvents();
      });
    });
  }
}

export default new ProjectGrid();