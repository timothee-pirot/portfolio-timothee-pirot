class ProjectCard {
  constructor() {
    this.contextIcons = {
      school: '<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>',
      personal: '<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',
      association: '<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',
      work: '<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    };
    
    this.contextLabels = {
      school: 'École',
      personal: 'Personnel',
      association: 'Association',
      work: "Professionnel",
    };
  }

  render(project, featured = false) {
    const statusClass = project.status === 'en-cours' 
      ? 'bg-primary/80 text-primary-foreground' 
      : 'bg-secondary/80 text-secondary-foreground';
    
    const statusLabel = project.status === 'en-cours' ? 'En cours' : 'Terminé';
    
    const containerClass = featured 
      ? 'group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_24px_-6px_hsl(174_60%_51%/0.15)] md:flex-row'
      : 'group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_24px_-6px_hsl(174_60%_51%/0.15)]';
    
    const imageClass = featured 
      ? 'relative overflow-hidden aspect-[16/10] md:aspect-auto md:w-1/2'
      : 'relative overflow-hidden aspect-[16/10]';
    
    const contentClass = featured 
      ? 'flex flex-1 flex-col p-5 md:p-6'
      : 'flex flex-1 flex-col p-5';
    
    const titleClass = featured 
      ? 'font-semibold text-foreground transition-colors group-hover:text-primary text-xl'
      : 'font-semibold text-foreground transition-colors group-hover:text-primary text-lg';
    
    const maxSkills = featured ? 6 : 4;
    const displayedSkills = project.skills.slice(0, maxSkills);
    const remainingSkills = project.skills.length - maxSkills;

    // Utiliser dates.year au lieu de year
    const year = project.dates?.year || project.year || 2025;

    return `
      
        <a href="#/projects/${project.slug}"
        class="${containerClass}"
        data-project-slug="${project.slug}"
      >
        <!-- Thumbnail -->
        <div class="${imageClass}">
          <img
            src="${project.thumbnail || '/placeholder.svg'}"
            alt="${project.title}"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Status overlay -->
          <div class="absolute right-3 top-3">
            <span class="border-none text-xs backdrop-blur-md px-2 py-1 rounded-md ${statusClass}">
              ${statusLabel}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="${contentClass}">
          <div class="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              ${this.contextIcons[project.context.toLowerCase()]}
              ${this.contextLabels[project.context.toLowerCase()]}
            </span>
            <span>/</span>
            <span class="flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${project.duration}
            </span>
            <span>/</span>
            <span>${year}</span>
          </div>

          <h3 class="${titleClass}">
            <span class="flex items-center gap-1">
              ${project.title}
              <svg class="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7m0 0H7m10 0v10" />
              </svg>
            </span>
          </h3>

          <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            ${project.snippet}
          </p>

          <!-- Skill tags -->
          <div class="mt-4 flex flex-wrap gap-1.5">
            ${displayedSkills.map(skill => `
              <span class="text-xs font-normal text-muted-foreground border border-border rounded-md px-2 py-1">
                ${skill}
              </span>
            `).join('')}
            ${remainingSkills > 0 ? `
              <span class="text-xs font-normal text-muted-foreground border border-border rounded-md px-2 py-1">
                +${remainingSkills}
              </span>
            ` : ''}
          </div>
        </div>
      </a>
    `;
  }
}

export default new ProjectCard();