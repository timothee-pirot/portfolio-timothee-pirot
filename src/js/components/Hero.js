class Hero {
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
            // portfolio
          </p>
          <h1 class="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Timothée Krieger
          </h1>
          <p class="mt-3 text-lg font-medium text-muted-foreground md:text-xl">
            Ingénieur Robotique & Systèmes Embarqués
          </p>
          <p class="mt-4 text-pretty leading-relaxed text-muted-foreground md:text-lg">
            Étudiant PRE-MSc IoT | Disponible alternance Jan-Fev 2026
          </p>

          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            
              href="#/projects"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Découvrir mes projets
            </a>
            
              href="#/skills"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Voir les compétences
            </a>
          </div>
        </div>

        
          href="#featured-projects"
          class="absolute bottom-8 animate-bounce text-muted-foreground transition-colors hover:text-primary scroll-link"
          aria-label="Scroll vers les projets"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </section>
    `;
  }

  attachEvents() {
    // Smooth scroll pour le lien de scroll
    const scrollLinks = document.querySelectorAll('.scroll-link');
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
}

export default new Hero();