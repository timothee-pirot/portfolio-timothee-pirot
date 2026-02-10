import projectCard from './ProjectCard.js';

class FeaturedProjects {
  constructor() {
    this.projects = [];
  }

  async init() {
    const response = await fetch('portfolio-timothee-pirot/src/data/projects.json');
    this.projects = await response.json();
  }

  render() {
    const featuredProjects = this.projects.slice(0, 4);
    
    if (featuredProjects.length === 0) {
      return '';
    }

    return `
      <section id="featured-projects" class="px-6 py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mb-12 flex items-end justify-between">
            <div>
              <p class="mb-2 font-mono text-sm tracking-wider text-primary">
                // projets
              </p>
              <h2 class="text-3xl font-bold text-foreground md:text-4xl">
                Projets mis en avant
              </h2>
            </div>
            
              href="#/projects"
              class="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary md:flex"
            >
              Voir tous les projets
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <!-- Featured grid: first project large, rest in grid -->
          <div class="flex flex-col gap-6">
            <!-- Hero project -->
            ${projectCard.render(featuredProjects[0], true)}

            <!-- Grid of remaining -->
            ${featuredProjects.length > 1 ? `
              <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                ${featuredProjects.slice(1).map(project => projectCard.render(project)).join('')}
              </div>
            ` : ''}
          </div>

          <div class="mt-8 flex justify-center md:hidden">
            
              href="#/projects"
              class="inline-flex items-center gap-1 rounded-lg border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Voir tous les projets
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    `;
  }
}

export default new FeaturedProjects();