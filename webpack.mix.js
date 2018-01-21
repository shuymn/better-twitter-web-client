const mix = require('laravel-mix'); // eslint-disable-line import/no-extraneous-dependencies

mix.js('./src/js/content.js', './dist/js')
  .js('./src/js/background.js', './dist/js')
  .js('./src/js/options.js', './dist/js')
  .standaloneSass('./src/css/options.scss', './dist/css')
  .standaloneSass('./src/css/module/translation-button-hider.scss', './dist/css')
  .copy('./src/static/**/*', './dist')
  .copy('./src/js/analytics.js', './dist/js')
  .copyDirectory('./src/locale/en', './dist/_locales/en')
  .copyDirectory('./src/locale/ja', './dist/_locales/ja')
  .disableNotifications();

if (!mix.inProduction()) {
  mix.sourceMaps();
}
