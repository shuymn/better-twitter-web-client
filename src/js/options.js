import {
  setTextContent,
  setCheckbox,
} from './module/options-helper';

const contents = {
  'head > title': 'extName',
  '#header-title': 'extName',
  '#about-title': 'optAboutTitle',
  '#setting-title': 'optSettingTitle',
  '#about-description': 'extDesc',
  '#setting-description': 'optSettingDesc',
};

Object.keys(contents)
  .map(key => setTextContent(contents[key], key))
  .reduce((chain, contentPromise) => chain.then(() => contentPromise), Promise.resolve());

const checkboxes = {
  NewTweetLoader: 'optSettingLabelOfNewTweetLoader',
  TranslationButtonHider: 'optSettingLabelOfTranslationButtonHider',
};

Object.keys(checkboxes)
  .map(key => setCheckbox(checkboxes[key], key))
  .reduce((chain, checkboxPromise) => chain.then(() => checkboxPromise), Promise.resolve());
