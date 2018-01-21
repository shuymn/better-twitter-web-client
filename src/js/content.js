import NewTweetLoader from './module/new-tweet-loader';
import TranslationButtonHider from './module/translation-button-hider';
import {
  once,
  permanent,
  getFeatures,
} from './module/content-helper';

const features = new Map([
  [TranslationButtonHider, 'once'],
  [NewTweetLoader, 'onTop'],
]);

(async () => {
  const [featuresWithOnce, featuresWithPermanent] = await getFeatures(features);

  // "よろしくお願いしまぁぁぁすっ!!" -- Kenji Koiso(Summer Wars)
  once(featuresWithOnce);
  permanent(featuresWithPermanent);
})();
