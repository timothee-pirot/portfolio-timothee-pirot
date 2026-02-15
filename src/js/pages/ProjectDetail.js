import footer from "../components/Footer.js";
import i18n from '../utils/i18n.js';


class ProjectDetail {
  constructor() {
    this.project = null;

    this.contextIcons = {
      school:
        '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>',
      personal:
        '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      association:
        '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
      work: '<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    };
  }

  get contextLabels() {
    return {
      school: i18n.t('projectCard.contextSchool'),
      personal: i18n.t('projectCard.contextPersonal'),
      association: i18n.t('projectCard.contextAssociation'),
      work: i18n.t('projectCard.contextWork'),
    };
  }

  async init(slug) {
    const response = await fetch(i18n.getDataPath('projects.json'));
    const data = await response.json();
    this.project = data.projects.find((p) => p.slug === slug);

    if (!this.project) {
      console.error(`Project not found: ${slug}`);
    }
  }

  render() {
    if (!this.project) {
      return `
        <div class="pt-20 container mx-auto px-6 py-24 min-h-[60vh] flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-foreground mb-4">${i18n.t('projectDetail.notFoundTitle')}</h1>
            <p class="text-lg text-muted-foreground mb-8">${i18n.t('projectDetail.notFoundText')}</p>
            <a href="#/projects" class="inline-flex items-center gap-2 text-primary hover:underline">
              ← ${i18n.t('projectDetail.backToProjects')}
            </a>
          </div>
        </div>
        ${footer.render()}
      `;
    }

    const year = this.project.dates?.year || this.project.year || 2025;
    const statusClass = this.project.status === "in_progress" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground";
    const statusLabel = this.project.status === "in_progress" ? i18n.t('projectCard.statusInProgress') : i18n.t('projectCard.statusCompleted');

    // context peut être un string ou un array
    const contexts = Array.isArray(this.project.context) ? this.project.context : [this.project.context];

    // Filtrer les liens null
    const validLinks = (this.project.links || []).filter(link => link !== null && link?.url);

    return `
      <div class="pt-20 container mx-auto px-6 py-12">
        <!-- Back button -->
        <a href="#/projects" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          ${i18n.t('projectDetail.backToProjects')}
        </a>

        <!-- Project header -->
        <div class="mb-8">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              ${contexts.map(c => this.contextIcons[c.toLowerCase()]).join('')}
              ${contexts.map(c => this.contextLabels[c.toLowerCase()]).join(' / ')}
            </span>
            <span class="text-muted-foreground">•</span>
            <span class="text-sm text-muted-foreground">${year}</span>
            <span class="text-muted-foreground">•</span>
            <span class="text-sm text-muted-foreground">
              <svg class="h-3.5 w-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${this.project.duration}
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${statusClass}">
              ${statusLabel}
            </span>
          </div>

          <h1 class="text-4xl font-bold text-foreground mb-4">${this.project.title}</h1>
          <p class="text-xl text-muted-foreground max-w-3xl">${this.project.snippet}</p>
        </div>

        <!-- Main image -->
        ${this.project.thumbnail ? `
          <div class="mb-12 rounded-xl overflow-hidden border border-border">
            <img src="${this.project.thumbnail}" alt="${this.project.title}" class="w-full max-h-[500px] object-contain" />
          </div>
        ` : ""}

        <!-- Layout: Content + Sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main content (left, 2/3) -->
          <div class="lg:col-span-2">
            <!-- Description sections -->
            <div class="grid gap-8">
              ${this.renderSection("01", i18n.t('projectDetail.sectionContexte'), this.project.description.contexte)}
              ${this.renderSection("02", i18n.t('projectDetail.sectionChallenge'), this.project.description.challenge)}
              ${this.renderSection("03", i18n.t('projectDetail.sectionSolution'), this.project.description.solution)}
              ${this.renderSection("04", i18n.t('projectDetail.sectionResults'), this.project.description.results)}
              ${this.renderSection("05", i18n.t('projectDetail.sectionCompetences'), this.project.description.competences)}
            </div>

            <!-- Gallery -->
            ${this.project.gallery && this.project.gallery.length > 0 ? `
              <div class="mt-16">
                <h2 class="text-2xl font-bold text-foreground mb-6">${i18n.t('projectDetail.gallery')}</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  ${this.project.gallery.map((img, i) => `
                    <button type="button" data-gallery-index="${i}" class="gallery-thumb rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <img src="${img}" alt="${this.project.title}" class="w-full h-32 object-cover" />
                    </button>
                  `).join("")}
                </div>
              </div>
            ` : ""}
          </div>

          <!-- Sidebar (right, 1/3) -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 flex flex-col gap-6">
              <!-- Informations card -->
              <div class="rounded-xl border border-border bg-card p-5">
                <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  ${i18n.t('projectDetail.infoTitle')}
                </h3>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${i18n.t('projectDetail.infoStatus')}</span>
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${statusClass}">
                      ${statusLabel}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${i18n.t('projectDetail.infoContext')}</span>
                    <span class="inline-flex items-center gap-1.5 text-sm text-foreground">
                      ${contexts.map(c => this.contextIcons[c.toLowerCase()]).join('')}
                      ${contexts.map(c => this.contextLabels[c.toLowerCase()]).join(' / ')}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${i18n.t('projectDetail.infoYear')}</span>
                    <span class="text-sm text-foreground">${year}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${i18n.t('projectDetail.infoDuration')}</span>
                    <span class="text-sm text-foreground">${this.project.duration}</span>
                  </div>
                </div>
              </div>

              <!-- Skills card -->
              <div class="rounded-xl border border-border bg-card p-5">
                <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  ${i18n.t('projectDetail.skillsTitle')}
                </h3>
                <div class="flex flex-wrap gap-2">
                  ${this.project.skills.map(skill => `
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary text-xs text-foreground">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      ${skill}
                    </span>
                  `).join("")}
                </div>
              </div>

              <!-- Links card -->
              ${validLinks.length > 0 ? `
                <div class="rounded-xl border border-border bg-card p-5">
                  <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    ${i18n.t('projectDetail.linksTitle')}
                  </h3>
                  <div class="flex flex-col gap-2">
                    ${validLinks.map(link => `

                        <a href="${link.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        ${link.label}
                      </a>
                    `).join("")}
                  </div>
                </div>
              ` : ""}
            </div>
          </div>
        </div>

        <!-- Back to projects -->
        <div class="mt-16 pt-8 border-t border-border">
          <a href="#/projects" class="inline-flex items-center gap-2 text-primary hover:underline">
            ← ${i18n.t('projectDetail.viewAllProjects')}
          </a>
        </div>
      </div>

      <!-- Lightbox -->
      ${this.project.gallery && this.project.gallery.length > 0 ? `
        <div id="lightbox" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm">
          <!-- Close button -->
          <button type="button" id="lightbox-close" class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Prev button -->
          ${this.project.gallery.length > 1 ? `
            <button type="button" id="lightbox-prev" class="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ` : ''}

          <!-- Image -->
          <img id="lightbox-img" src="" alt="" class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain" />

          <!-- Next button -->
          ${this.project.gallery.length > 1 ? `
            <button type="button" id="lightbox-next" class="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ` : ''}

          <!-- Counter -->
          ${this.project.gallery.length > 1 ? `
            <div id="lightbox-counter" class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white"></div>
          ` : ''}
        </div>
      ` : ''}

      ${footer.render()}
    `;
  }

  attachEvents() {
    if (!this.project?.gallery?.length) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const counter = document.getElementById('lightbox-counter');
    const gallery = this.project.gallery;
    let current = 0;

    const show = (index) => {
      current = (index + gallery.length) % gallery.length;
      lightboxImg.src = gallery[current];
      lightboxImg.alt = `${this.project.title} - ${current + 1}`;
      if (counter) counter.textContent = `${current + 1} / ${gallery.length}`;
    };

    const open = (index) => {
      show(index);
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      document.body.style.overflow = '';
    };

    // Open on thumbnail click
    document.querySelectorAll('.gallery-thumb').forEach(btn => {
      btn.addEventListener('click', () => open(parseInt(btn.dataset.galleryIndex)));
    });

    // Close
    document.getElementById('lightbox-close')?.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    // Nav
    document.getElementById('lightbox-prev')?.addEventListener('click', (e) => {
      e.stopPropagation();
      show(current - 1);
    });
    document.getElementById('lightbox-next')?.addEventListener('click', (e) => {
      e.stopPropagation();
      show(current + 1);
    });

    // Keyboard
    this._keyHandler = (e) => {
      if (lightbox.classList.contains('hidden')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    };
    document.addEventListener('keydown', this._keyHandler);
  }

  renderSection(number, title, section) {
    if (!section || !section.show) {
      return "";
    }

    // content peut être un string ou un array de strings
    const contentHtml = Array.isArray(section.content)
      ? `<ul class="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">${section.content.map(item => `<li>${item}</li>`).join('')}</ul>`
      : `<p class="text-muted-foreground leading-relaxed">${section.content}</p>`;

    return `
      <div class="rounded-xl border border-border bg-card p-6">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-mono text-sm font-semibold">
            ${number}
          </span>
          <h2 class="text-xl font-semibold text-foreground">${title}</h2>
        </div>
        ${contentHtml}
      </div>
    `;
  }
}

export default new ProjectDetail();
