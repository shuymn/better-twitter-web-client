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
 */
function resident(features) {
  chrome.runtime.onMessage.addListener(async (request) => {
    /**
     * @param {RegExp} pattern
     */
    function check(pattern) {
      return pattern.test(request.url);
    }

    await stop(features);

    features.forEach((feature) => {
      const patterns = feature.getPatterns();

      if (patterns.some(check)) {
        feature.run();
      }
    });
  });
}
