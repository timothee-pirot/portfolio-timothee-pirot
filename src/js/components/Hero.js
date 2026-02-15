import profileData from "../../data/profile.json";
import i18n from "../utils/i18n.js";

class Hero {
  constructor() {
    this.profile = profileData;
  }

  render() {
    return `
      <section class="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <!-- Subtle grid background -->
        <div
          class="pointer-events-none absolute inset-0 opacity-[0.03]"
          style="
            background-image: linear-gradient(hsl(174 60% 51%) 1px, transparent 1px), linear-gradient(90deg, hsl(174 60% 51%) 1px, transparent 1px);
            background-size: 60px 60px;
          "
        ></div>

        <div class="relative z-10 mx-auto max-w-3xl">
          <p class="mb-4 font-mono text-sm tracking-wider text-primary">
            ${i18n.t('hero.commentTag')}
          </p>
          <h1 class="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Timothée Pirot
          </h1>
          <p class="mt-3 text-lg font-medium text-muted-foreground md:text-xl">
            ${i18n.td(this.profile.presentation)}
          </p>
          <div class="mt-4 rounded-lg bg-muted/50 border-l-4 border-primary p-4">
            <p class="text-pretty leading-relaxed text-foreground md:text-xl font-medium">
              ${i18n.td(this.profile.headline)} <br>
              ${i18n.td(this.profile.mobility)} <br>
              ${i18n.t('hero.availability')} : ${i18n.td(this.profile.availability.startDate)}
            </p>
          </div>

          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

              <a href="#/projects"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              ${i18n.t('hero.discoverProjects')}
            </a>
            <button
              id="scroll-to-skills"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              ${i18n.t('hero.seeSkills')}
            </button>
          </div>
        </div>

        <button
          id="scroll-to-featured"
          class="absolute bottom-8 animate-bounce text-muted-foreground transition-colors hover:text-primary"
          aria-label="${i18n.t('hero.scrollAriaLabel')}"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>
    `;
  }

  attachEvents() {
    // Scroll to featured projects
    const scrollToFeatured = document.getElementById("scroll-to-featured");
    if (scrollToFeatured) {
      scrollToFeatured.addEventListener("click", (e) => {
        e.preventDefault();
        const targetElement = document.getElementById("featured-projects");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Scroll to skills section
    const scrollToSkills = document.getElementById("scroll-to-skills");
    if (scrollToSkills) {
      scrollToSkills.addEventListener("click", (e) => {
        e.preventDefault();
        const targetElement = document.getElementById("competences");
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }
}

export default new Hero();
