import NewTweetLoader from './module/new-tweet-loader';
import TranslationButtonHider from './module/translation-button-hider';
import {
  once,
  resident,
} from './module/content-helper';

// "よろしくお願いしまぁぁぁすっ!!" -- Kenji Koiso(Summer Wars)

once([
  TranslationButtonHider,
]);

resident([
  [NewTweetLoader, {
    onTop: true,
  }],
]);
