const mix = require('laravel-mix'); // eslint-disable-line import/no-extraneous-dependencies

mix.js('./src/js/content.js', './build/js')
  .js('./src/js/background.js', './build/js')
  .js('./src/js/options.js', './build/js')
  .standaloneSass('./src/css/options.scss', './build/css')
  .standaloneSass('./src/css/module/translation-button-hider.scss', './build/css')
  .copyDirectory('./src/locale/en', './build/_locales/en')
  .copyDirectory('./src/locale/ja', './build/_locales/ja')
  .copy('./src/js/analytics.js', './build/js')
  .copy('./src/static/*.html', './build')
  .copyDirectory('./build', './dist/chrome')
  .copyDirectory('./build', './dist/firefox')
  .copy('./src/static/manifest.chrome.json', './dist/chrome/manifest.json')
  .copy('./src/static/manifest.firefox.json', './dist/firefox/manifest.json')
  .disableNotifications();

if (!mix.inProduction()) {
  mix.sourceMaps();
}
