import NewTweetLoader from './module/new-tweet-loader';
import TranslationButtonHider from './module/translation-button-hider';

/**
 * Stop all features.
 * @param {Function[]} features
 * @return {Promise}
 */
function stop(features) {
  return Promise.all(features.map(feature => feature.stop()));
}

/**
 * Execute features which are executed only once.
 * @param {Function[]} features
 */
function once(features) {
  features.forEach((feature) => {
    feature.run();
  });
}

/**
 * Execute features which reside.
 * @param {Function[]} features
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

// fire

once([
  TranslationButtonHider,
]);

resident([
  NewTweetLoader,
]);
