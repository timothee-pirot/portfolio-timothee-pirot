import i18n from '../utils/i18n.js';

class SkillsSection {
  constructor() {
    this.skills = [];
    this.categories = [];
    this.activeCategory = "all";
    this.totalProjects = 0;

    this.originIcons = {
      school:
        '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>',
      personal:
        '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      association:
        '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
      work: '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    };
  }

  get originLabels() {
    return {
      school: i18n.t('skills.legendSchool'),
      personal: i18n.t('skills.legendPersonal'),
      association: i18n.t('skills.legendAssociation'),
      work: i18n.t('skills.legendWork'),
    };
  }

  async init() {
    const [skillsResponse, projectsResponse] = await Promise.all([
      fetch(i18n.getDataPath('skills.json')),
      fetch(i18n.getDataPath('projects.json')),
    ]);
    const skillsData = await skillsResponse.json();
    const projectsData = await projectsResponse.json();
    this.skills = skillsData.skills;
    this.categories = skillsData.categories;
    this.totalProjects = projectsData.projects.length;
  }

  getProjectCount(skill) {
    if (skill.projectSlugs.includes("all")) {
      return this.totalProjects;
    }
    return skill.projectSlugs.length;
  }

  renderSkillRow(skill) {
    const isEmpty = skill.projectSlugs.length === 0;
    const isComingSoon = skill.status === "coming-soon";
    const projectCount = this.getProjectCount(skill);

    const tag = isEmpty ? "div" : "a";
    const href = isEmpty ? "" : `href="#/projects?skill=${encodeURIComponent(skill.name)}"`;
    const cursorClass = isEmpty ? "cursor-default opacity-70" : "";

    return `
    <${tag}
      ${href}
      class="group flex items-center justify-between gap-3 rounded-full border border-border bg-secondary/30 px-4 py-2.5 transition-all ${isEmpty ? "" : "hover:border-primary hover:bg-secondary/50 hover:shadow-sm"} ${cursorClass}"
    >
      <!-- Skill name -->
      <span class="font-medium text-foreground transition-colors ${isEmpty ? "" : "group-hover:text-primary"} text-sm flex items-center gap-1.5">
        ${skill.name}
        ${isComingSoon ? `<span title="${i18n.t('skills.dataComingSoon')}" class="text-amber-500 text-xs">&#128679;</span>` : ""}
      </span>

      <div class="flex items-center gap-2 ml-auto">
        <!-- Origins -->
        <div class="flex items-center gap-1 text-muted-foreground">
          ${skill.origin
            .map(
              (o) => `
            <span title="${this.originLabels[o]}">
              ${this.originIcons[o]}
            </span>
          `,
            )
            .join("")}
        </div>

        <!-- Project count -->
        <div class="flex items-center gap-1 text-muted-foreground">
          ${isEmpty
            ? '<span class="font-mono text-xs">—</span>'
            : `<span class="font-mono text-xs">${projectCount}</span>
               <svg class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7m0 0H7m10 0v10" />
               </svg>`
          }
        </div>
      </div>
    </${tag}>
  `;
  }

  formatType(type) {
    const map = {
      language: 'skills.typeLanguage',
      tool: 'skills.typeTool',
      framework: 'skills.typeFramework',
      software: 'skills.typeSoftware',
      'soft-skill': 'skills.typeSoftSkill',
    };
    return map[type] ? i18n.t(map[type]) : type;
  }

  renderCategoryCard(category, categorySkills) {
    const sorted = [...categorySkills].sort(
      (a, b) => b.projectSlugs.length - a.projectSlugs.length,
    );

    return `
      <div class="rounded-xl border border-border bg-card p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            ${category.label}
          </h3>
          <span class="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
            ${categorySkills.length}
          </span>
        </div>
        <div class="flex flex-col gap-3">
          ${sorted.map((skill) => this.renderSkillRow(skill)).join("")}
        </div>
      </div>
    `;
  }

  render() {
    // Group skills by category
    const grouped = this.categories
      .filter((cat) => cat.value !== "all")
      .map((cat) => ({
        ...cat,
        skills:
          this.activeCategory === "all" || this.activeCategory === cat.value
            ? this.skills.filter((s) => s.category === cat.value)
            : [],
      }))
      .filter((cat) => cat.skills.length > 0);

    return `
      <section id="competences" class="px-6 py-24">
        <div class="mx-auto max-w-6xl">
          <!-- Header -->
          <div class="mb-12">
            <p class="mb-2 font-mono text-sm tracking-wider text-primary">
              ${i18n.t('skills.commentTag')}
            </p>
            <h2 class="text-balance text-3xl font-bold text-foreground md:text-4xl">
              ${i18n.t('skills.title')}
            </h2>
            <p class="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              ${i18n.t('skills.subtitle')}
            </p>
          </div>

          <!-- Category filters -->
          <div class="mb-8 flex flex-wrap gap-2" id="skills-category-filters">
            ${this.categories
              .map(
                (cat) => `
              <button
                type="button"
                data-category="${cat.value}"
                class="skills-category-filter rounded-md px-3 py-1.5 text-sm transition-colors ${
                  this.activeCategory === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }"
              >
                ${cat.label}
              </button>
            `,
              )
              .join("")}
          </div>

          <!-- Category cards -->
          <div class="grid gap-6 md:grid-cols-2" id="skills-cards-container">
            ${grouped.map((cat) => this.renderCategoryCard(cat, cat.skills)).join("")}
          </div>

          <!-- Legend -->
          <div class="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-xs text-muted-foreground">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1.5">
                ${this.originIcons.school}
                <span>${i18n.t('skills.legendSchool')}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${this.originIcons.personal}
                <span>${i18n.t('skills.legendPersonal')}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${this.originIcons.association}
                <span>${i18n.t('skills.legendAssociation')}</span>
              </div>
                <div class="flex items-center gap-1.5">
                ${this.originIcons.work}
                <span>${i18n.t('skills.legendWork')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  attachEvents() {
    // Category filter buttons
    document.querySelectorAll(".skills-category-filter").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.activeCategory = e.target.dataset.category;

        // Update button styles
        document.querySelectorAll(".skills-category-filter").forEach((b) => {
          b.classList.remove("bg-primary", "text-primary-foreground");
          b.classList.add("bg-secondary", "text-secondary-foreground");
        });
        e.target.classList.remove("bg-secondary", "text-secondary-foreground");
        e.target.classList.add("bg-primary", "text-primary-foreground");

        // Re-render cards
        this.updateCardsDisplay();
      });
    });
  }

  updateCardsDisplay() {
    const grouped = this.categories
      .filter((cat) => cat.value !== "all")
      .map((cat) => ({
        ...cat,
        skills:
          this.activeCategory === "all" || this.activeCategory === cat.value
            ? this.skills.filter((s) => s.category === cat.value)
            : [],
      }))
      .filter((cat) => cat.skills.length > 0);

    const container = document.getElementById("skills-cards-container");
    container.innerHTML = grouped
      .map((cat) => this.renderCategoryCard(cat, cat.skills))
      .join("");
  }
}

export default new SkillsSection();
