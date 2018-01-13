/**
 * Stop all features.
 * @param {Array<Function>} features
 * @return {Promise<any[]>}
 */
async function stop(features) {
  return Promise.all(features.map(feature => feature.stop()));
}

/**
 * Execute features which are executed only once.
 * @param {Array<Function>} features
 * @return {Promise<Array>}
 */
export async function once(features) {
  return Promise.all(features.map(feature => feature.run()));
}

/**
 * Execute features which reside.
 * @param {(Array<Function>|Array<Array>)} _features
 * @return {register}
 */
export function resident(_features) {
  /** @param {Object} request */
  async function listener(request) {
    /** @param {Array<Function>} features */
    async function run(features) {
      return Promise.all(features.map((feature) => {
        /** @type {Array<RegExp>} */
        const patterns = feature.getPatterns();

        if (patterns.some(pattern => pattern.test(request.url))) {
          return feature.run();
        }

        return Promise.reject();
      }));
    }

    /** @param {Array<Function>} features */
    function onTop(features) {
      /** @param {Array<IntersectionObserverEntry>} entries */
      function callback(entries) {
        entries.forEach((entry) => {
          const offset = entry.boundingClientRect.top;

          if (offset === 0) {
            run(features);
          } else if (offset < 0) {
            stop(features);
          }
        });
      }

      const element = document.createElement('div');
      element.style = 'height: 1px;';

      const target = document.getElementById('page-outer');
      target.parentNode.insertBefore(element, target);

      (new IntersectionObserver(callback)).observe(element);
    }

    /** @param {(Function|Array)} feature */
    function featureFilter(feature) {
      if (typeof feature === 'function') {
        return true;
      } else if (Array.isArray(feature) && typeof feature[0] === 'function' && feature[1] instanceof Object) {
        return true;
      }
      return false;
    }

    /** @param {(Function|Array)} feature */
    function extractFeature(feature) {
      return Array.isArray(feature) ? feature[0] : feature;
    }

    /** @type {Array} */
    const collectFeatures = _features.filter(featureFilter);

    /** @type {Array<Function>} */
    const allFeatures = collectFeatures.map(extractFeature);

    /** @type {Array<Function>} */
    const featuresWithResident = collectFeatures.filter((feature) => {
      if (!Array.isArray(feature)) {
        return true;
      } else if (Object.keys(feature[1]).length === 0) {
        return true;
      }

      return false;
    }).map(extractFeature);

    /** @type {Array<Function>} */
    const featuresWithOnTop = collectFeatures.filter((feature) => {
      if (Array.isArray(feature) && Object.prototype.hasOwnProperty.call(feature[1], 'onTop') && feature[1].onTop) {
        return true;
      }

      return false;
    }).map(extractFeature);

    await stop(allFeatures);
    run(featuresWithResident);
    onTop(featuresWithOnTop);
  }

  chrome.runtime.onMessage.addListener(listener);

  return Promise.resolve();
}
