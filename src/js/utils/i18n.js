class I18n {
  constructor() {
    this.locale = localStorage.getItem('locale') || 'en';
    this.translations = {};
    this.listeners = [];
  }

  async init() {
    const base = import.meta.env.BASE_URL;
    const [fr, en] = await Promise.all([
      fetch(`${base}data/fr/ui.json`).then(r => r.json()),
      fetch(`${base}data/en/ui.json`).then(r => r.json())
    ]);
    this.translations = { fr, en };
    document.documentElement.lang = this.locale;
  }

  getLocale() {
    return this.locale;
  }

  // Translate a UI string key (dot-notation), e.g. t('hero.discoverProjects')
  t(key) {
    const keys = key.split('.');
    let value = this.translations[this.locale];
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    return value || key;
  }

  // Translate a data field with {fr: "...", en: "..."} structure
  // Falls back to 'fr' if current locale value is missing
  td(dataObj) {
    if (typeof dataObj === 'string') return dataObj;
    if (dataObj && typeof dataObj === 'object' && (dataObj.fr || dataObj.en)) {
      return dataObj[this.locale] || dataObj['fr'] || '';
    }
    return dataObj || '';
  }

  // Get locale-aware data path for fetch calls
  getDataPath(filename) {
    return `${import.meta.env.BASE_URL}data/${this.locale}/${filename}`;
  }

  setLocale(locale) {
    this.locale = locale;
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
    this.listeners.forEach(fn => fn(locale));
  }

  toggleLocale() {
    this.setLocale(this.locale === 'fr' ? 'en' : 'fr');
  }

  onLocaleChange(fn) {
    this.listeners.push(fn);
  }
}

export default new I18n();
