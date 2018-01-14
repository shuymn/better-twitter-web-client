const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

/**
 * Stop all features.
 * @param {Array<Function>} features
 * @return {Promise<any[]>}
 */
async function stop(features) {
  return Promise.all(features.map(feature => feature.stop()));
}

/**
 * @param {Array<Function>} fs - features
 * @return {Promise<Array>}
 */
async function run(fs) {
  return Promise.all(fs.map((f) => {
    /** @type {Array<RegExp>} */
    const patterns = f.getPatterns();

    if (patterns.some(pattern => pattern.test(window.location.href))) {
      return f.run();
    }

    return Promise.resolve();
  }));
}

/** @param {(Function|Array)} feature */
function filter(feature) {
  if (typeof feature === 'function') {
    return true;
  } else if (Array.isArray(feature) && typeof feature[0] === 'function' && feature[1] instanceof Object) {
    return true;
  }
  return false;
}

/** @param {(Function|Array)} feature */
function extract(feature) {
  return Array.isArray(feature) ? feature[0] : feature;
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
 * Execute features which is permanent.
 * @param {(Array<Function>|Array<Array>)} _features
 * @return {Promise}
 */
export function permanent(_features) {
  let features = _features.filter(filter);

  const featuresWithPermanent = features.filter((feature) => {
    if (!Array.isArray(feature)) {
      return true;
    } else if (Object.keys(feature[1]).length === 0) {
      return true;
    }

    return false;
  }).map(extract);

  const featuresWithOnTop = features.filter((feature) => {
    if (Array.isArray(feature) && Object.prototype.hasOwnProperty.call(feature[1], 'onTop') && feature[1].onTop) {
      return true;
    }

    return false;
  }).map(extract);

  features = features.map(extract);

  browser.runtime.onMessage.addListener(async () => {
    await stop(features);
    run(featuresWithPermanent);
  });

  ((fs) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const offset = entry.boundingClientRect.top;

        if (offset === 0) {
          run(fs);
        } else if (offset < 0) {
          stop(fs);
        }
      });
    });

    browser.runtime.onMessage.addListener(() => {
      const {
        id,
      } = browser.runtime;
      let element = document.getElementById(id);

      if (element === null) {
        element = document.createElement('div');
        element.style = 'height: 1px;';
        element.id = id;

        const target = document.getElementById('page-outer');
        target.parentNode.insertBefore(element, target);
      }

      observer.disconnect();
      observer.observe(element);
    });
  })(featuresWithOnTop);
}
