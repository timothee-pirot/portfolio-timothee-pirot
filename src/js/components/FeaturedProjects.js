import projectCard from './ProjectCard.js';
import i18n from '../utils/i18n.js';

class FeaturedProjects {
  constructor() {
    this.projects = [];
  }

  async init() {
    const response = await fetch(i18n.getDataPath('projects.json'));
    const data = await response.json();
    this.projects = data.projects;
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
                ${i18n.t('featured.commentTag')}
              </p>
              <h2 class="text-3xl font-bold text-foreground md:text-4xl">
                ${i18n.t('featured.title')}
              </h2>
            </div>

              <a href="#/projects"
              class="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary md:flex"
            >
              ${i18n.t('featured.viewAll')}
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
              <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
                ${featuredProjects.slice(1).map(project => projectCard.render(project)).join('')}
              </div>
            ` : ''}
          </div>

          <div class="mt-8 flex justify-center md:hidden">

              <a href="#/projects"
              class="inline-flex items-center gap-1 rounded-lg border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              ${i18n.t('featured.viewAll')}
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
