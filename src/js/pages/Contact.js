import footer from '../components/Footer.js';

class Contact {
  render() {
    return `
      <div class="pt-20 container mx-auto px-6 py-24 min-h-[60vh] flex items-center justify-center">
        <div class="text-center max-w-2xl">
          <p class="mb-2 font-mono text-sm tracking-wider text-primary">
            // contact
          </p>
          <h1 class="text-4xl font-bold text-foreground mb-4">
            Contactez-moi
          </h1>
          <p class="text-lg text-muted-foreground mb-8">
            Pour toute question ou opportunité, n'hésitez pas à me contacter via le formulaire ci-dessous.
          </p>
          
            href="mailto:t.pirot@free.fr"
            class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            M'envoyer un email
          </a>
        </div>
      </div>
      ${footer.render()}
    `;
  }
}

export default new Contact();