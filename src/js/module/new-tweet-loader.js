/**
 * Click button.
 * @param {Node} node
 */
function click(node) {
  if (node.nodeName === 'BUTTON') {
    node.click();
  }
}

/** @type {MutationObserver} */
const observer = new MutationObserver((records) => {
  records.forEach(record => record.addedNodes.forEach(click));
});

/** @type {MutationObserverInit} */
const options = {
  childList: true,
};

const selector = '.js-new-items-bar-container';

export default class NewTweetLoader {
  /**
   * Observe the new tems bar.
   * @returns {Promise}
   */
  static run() {
    try {
      const target = document.body.querySelector(selector);

      if (target !== null) {
        observer.observe(target, options);
      }

      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * Stop observe.
   * @returns {Promise}
   */
  static stop() {
    try {
      observer.disconnect();
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  /**
   * List of sites to execute.
   * @returns {Array<RegExp>}
   */
  static getPatterns() {
    return [
      /^https:\/\/twitter.com\/$/,
      /^https:\/\/twitter.com\/\w+/,
      /^https:\/\/twitter.com\/\w+\/status\/\d+/,
    ];
  }
}
