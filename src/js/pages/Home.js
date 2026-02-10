import hero from '../components/Hero.js';
import featuredProjects from '../components/FeaturedProjects.js';
import skillsSection from '../components/SkillsSection.js';
import footer from '../components/Footer.js';

class Home {
  async init() {
    await Promise.all([
      featuredProjects.init(),
      skillsSection.init()
    ]);
  }

  render() {
    return `
      ${hero.render()}
      ${featuredProjects.render()}
      ${skillsSection.render()}
      ${footer.render()}
    `;
  }

  attachEvents() {
    hero.attachEvents();
    skillsSection.attachEvents();
  }
}

export default new Home();