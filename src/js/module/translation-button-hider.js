const browser = (typeof browser === 'undefined') ? chrome : browser;

export default class TranslationButtonHider {
  /**
   * Inject a css.
   * @returns {Promise}
   */
  static run() {
    const link = document.createElement('link');
    link.href = browser.extension.getURL('css/content.css');
    link.type = 'text/css';
    link.rel = 'stylesheet';

    const target = document.querySelector('head');

    if (target === null) {
      return Promise.reject();
    }

    target.appendChild(link);

    return Promise.resolve();
  }

  /**
   * Do nothing.
   * @returns {Promise}
   */
  static stop() {
    return Promise.resolve();
  }
}
