import NewTweetLoader from './module/new-tweet-loader';
import TranslationButtonHider from './module/translation-button-hider';
import {
  once,
  permanent,
} from './module/content-helper';

const browser = (typeof browser === 'undefined') ? chrome : browser; // eslint-disable-line no-use-before-define

const featuresWithOnce = [];
const featuresWithPermanent = [];

const defaults = {
  NewTweetLoader: true,
  TranslationButtonHider: true,
};

browser.storage.sync.get(defaults, (items) => {
  if (items.NewTweetLoader) {
    featuresWithPermanent.push([NewTweetLoader, {
      onTop: true,
    }]);
  }

  if (items.TranslationButtonHider) {
    featuresWithOnce.push(TranslationButtonHider);
  }

  once(featuresWithOnce);
  permanent(featuresWithPermanent);
});


// "よろしくお願いしまぁぁぁすっ!!" -- Kenji Koiso(Summer Wars)

// once(featuresWithOnce);
// permanent(featuresWithPermanent);

// [NewTweetLoader, {
//   onTop: true,
// }],
