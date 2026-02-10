class SkillsSection {
  constructor() {
    this.skills = [];
    this.activeCategory = 'all';
    this.skillCategories = [
      { value: 'all', label: 'Toutes' },
      { value: 'languages', label: 'Langages' },
      { value: 'tools', label: 'Outils' },
      { value: 'frameworks', label: 'Frameworks' },
      { value: 'software', label: 'Logiciels' },
      { value: 'soft-skills', label: 'Soft Skills' }
    ];
    
    this.originIcons = {
      school: '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" /></svg>',
      personal: '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      association: '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
    };
    
    this.originLabels = {
      school: 'École',
      personal: 'Personnel',
      association: 'Association'
    };
    
    this.levelPercent = {
      'Avancé': 90,
      'Intermédiaire': 55,
      'Notions': 25
    };
  }

  async init() {
    const response = await fetch('portfolio-timothee-pirot/src/data/skills.json');
    this.skills = await response.json();
  }

  renderSkillRow(skill) {
    const percent = this.levelPercent[skill.level] || 50;
    const levelClass = 
      skill.level === 'Avancé' ? 'bg-primary' :
      skill.level === 'Intermédiaire' ? 'bg-primary/50' :
      'bg-primary/25';

    return `
      
        href="#/projects?skill=${encodeURIComponent(skill.name)}"
        class="group flex items-center gap-4 rounded-lg border border-transparent px-3 py-3 transition-all hover:border-border hover:bg-secondary/50"
      >
        <!-- Skill name -->
        <div class="w-28 flex-shrink-0 md:w-36">
          <span class="font-medium text-foreground transition-colors group-hover:text-primary">
            ${skill.name}
          </span>
        </div>

        <!-- Progress bar -->
        <div class="flex flex-1 items-center gap-3">
          <div class="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
            <div
              class="${levelClass} h-full rounded-full transition-all duration-500"
              style="width: ${percent}%"
            ></div>
          </div>
          <span class="hidden w-24 text-right font-mono text-xs text-muted-foreground md:inline">
            ${skill.level}
          </span>
        </div>

        <!-- Origins -->
        <div class="hidden items-center gap-1.5 text-muted-foreground md:flex">
          ${skill.origin.map(o => `
            <span title="${this.originLabels[o]}">
              ${this.originIcons[o]}
            </span>
          `).join('')}
        </div>

        <!-- Project count -->
        <div class="flex w-10 items-center justify-end gap-1 text-muted-foreground">
          <span class="font-mono text-xs">${skill.projectSlugs.length}</span>
          <svg class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7m0 0H7m10 0v10" />
          </svg>
        </div>
      </a>
    `;
  }

  renderCategoryCard(label, categorySkills) {
    // Sort: Avancé first, then Intermédiaire, then Notions
    const sorted = [...categorySkills].sort((a, b) => {
      const order = { 'Avancé': 0, 'Intermédiaire': 1, 'Notions': 2 };
      return order[a.level] - order[b.level];
    });

    return `
      <div class="rounded-xl border border-border bg-card p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            ${label}
          </h3>
          <span class="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
            ${categorySkills.length}
          </span>
        </div>
        <div class="flex flex-col gap-0.5">
          ${sorted.map(skill => this.renderSkillRow(skill)).join('')}
        </div>
      </div>
    `;
  }

  render() {
    // Group skills by category
    const grouped = this.skillCategories
      .filter(cat => cat.value !== 'all')
      .map(cat => ({
        ...cat,
        skills: this.activeCategory === 'all' || this.activeCategory === cat.value
          ? this.skills.filter(s => s.category === cat.value)
          : []
      }))
      .filter(cat => cat.skills.length > 0);

    return `
      <section id="competences" class="px-6 py-24">
        <div class="mx-auto max-w-6xl">
          <!-- Header -->
          <div class="mb-12">
            <p class="mb-2 font-mono text-sm tracking-wider text-primary">
              // compétences
            </p>
            <h2 class="text-balance text-3xl font-bold text-foreground md:text-4xl">
              Compétences techniques
            </h2>
            <p class="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Chaque compétence est ancrée dans des projets concrets. Cliquez sur une ligne pour découvrir les projets associés.
            </p>
          </div>

          <!-- Category filters -->
          <div class="mb-8 flex flex-wrap gap-2" id="skills-category-filters">
            ${this.skillCategories.map(cat => `
              <button
                type="button"
                data-category="${cat.value}"
                class="skills-category-filter rounded-md px-3 py-1.5 text-sm transition-colors ${
                  this.activeCategory === cat.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }"
              >
                ${cat.label}
              </button>
            `).join('')}
          </div>

          <!-- Category cards -->
          <div class="grid gap-6 md:grid-cols-2" id="skills-cards-container">
            ${grouped.map(cat => this.renderCategoryCard(cat.label, cat.skills)).join('')}
          </div>

          <!-- Legend -->
          <div class="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-xs text-muted-foreground">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-6 rounded-full bg-primary"></div>
                <span>Avancé</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-6 rounded-full bg-primary/50"></div>
                <span>Intermédiaire</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-1.5 w-6 rounded-full bg-primary/25"></div>
                <span>Notions</span>
              </div>
            </div>
            <div class="h-3 w-px bg-border"></div>
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1.5">
                ${this.originIcons.school}
                <span>École</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${this.originIcons.personal}
                <span>Personnel</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${this.originIcons.association}
                <span>Association</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEvents() {
    // Category filter buttons
    document.querySelectorAll('.skills-category-filter').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeCategory = e.target.dataset.category;
        
        // Update button styles
        document.querySelectorAll('.skills-category-filter').forEach(b => {
          b.classList.remove('bg-primary', 'text-primary-foreground');
          b.classList.add('bg-secondary', 'text-secondary-foreground');
        });
        e.target.classList.remove('bg-secondary', 'text-secondary-foreground');
        e.target.classList.add('bg-primary', 'text-primary-foreground');
        
        // Re-render cards
        this.updateCardsDisplay();
      });
    });
  }

  updateCardsDisplay() {
    const grouped = this.skillCategories
      .filter(cat => cat.value !== 'all')
      .map(cat => ({
        ...cat,
        skills: this.activeCategory === 'all' || this.activeCategory === cat.value
          ? this.skills.filter(s => s.category === cat.value)
          : []
      }))
      .filter(cat => cat.skills.length > 0);

    const container = document.getElementById('skills-cards-container');
    container.innerHTML = grouped.map(cat => this.renderCategoryCard(cat.label, cat.skills)).join('');
  }
}

export default new SkillsSection();