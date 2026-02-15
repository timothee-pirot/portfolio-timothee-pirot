import profileData from '../../data/profile.json';
import footer from '../components/Footer.js';
import i18n from '../utils/i18n.js';

class About {
  constructor() {
    this.profile = profileData;
  }

  render() {
    const documents = [
      {
        title: i18n.t('about.docRoboticsTitle'),
        description: i18n.t('about.docRoboticsDesc'),
        file: '/portfolio-timothee-pirot/documents/cv-robotique-timothee-pirot.pdf',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
      },
      {
        title: i18n.t('about.docDevTitle'),
        description: i18n.t('about.docDevDesc'),
        file: '/portfolio-timothee-pirot/documents/cv-dev-timothee-pirot.pdf',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>'
      }
    ];

    return `
      <div class="pt-20 container mx-auto px-6 py-16">
        <!-- Titre + intro -->
        <div class="max-w-3xl mx-auto mb-16">
          <p class="mb-2 font-mono text-sm tracking-wider text-primary">
            ${i18n.t('about.commentTag')}
          </p>
          <h1 class="text-4xl font-bold text-foreground mb-4">
            Timothée Pirot
          </h1>
          <p class="text-lg text-muted-foreground leading-relaxed">
            ${i18n.td(this.profile.headline)}<br>
            ${i18n.t('about.availability')} : ${i18n.td(this.profile.availability.startDate)}
          </p>
        </div>

        <!-- Section Documents -->
        <div class="max-w-3xl mx-auto mb-16">
          <h2 class="text-2xl font-bold text-foreground mb-6">
            ${i18n.t('about.documentsTitle')}
          </h2>
          <div class="grid gap-4 sm:grid-cols-2">
            ${documents.map(doc => `
              <div class="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <div class="flex items-center gap-3 text-primary">
                  ${doc.icon}
                  <h3 class="text-lg font-semibold text-foreground">${doc.title}</h3>
                </div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  ${doc.description}
                </p>
                <a href="${doc.file}" download
                  class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 self-start"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  ${i18n.t('about.download')}
                </a>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      ${footer.render()}
    `;
  }

  attachEvents() {}
}

export default new About();
