import projectGrid from '../components/ProjectGrid.js';
import footer from '../components/Footer.js';

class Projects {
  async init() {
    await projectGrid.init();
  }

  render() {
    return `
      ${projectGrid.render()}
      ${footer.render()}
    `;
  }

  attachEvents() {
    projectGrid.attachEvents();
    projectGrid.updateProjectsDisplay();
  }
}

export default new Projects();