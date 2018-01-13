import NewTweetLoader from './module/new-tweet-loader';
import TranslationButtonHider from './module/translation-button-hider';
import {
  once,
  resident,
} from './module/content-helper';

// fire

once([
  TranslationButtonHider,
]);

resident([
  NewTweetLoader,
]);
