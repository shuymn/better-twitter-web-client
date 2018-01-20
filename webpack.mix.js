const mix = require('laravel-mix'); // eslint-disable-line import/no-extraneous-dependencies

mix.js('./src/js/content.js', './dist/js')
  .js('./src/js/background.js', './dist/js')
  .js('./src/js/options.js', './dist/js')
  .standaloneSass('./src/css/module/translation-button-hider.scss', './dist/css')
  .standaloneSass('./src/css/options.scss', './dist/css')
  .copy('./src/static/**/*', './dist')
  .copy('./src/locale/en/messages.json', './dist/_locales/en')
  .copy('./src/locale/ja/messages.json', './dist/_locales/ja')
  .disableNotifications();

if (!mix.inProduction()) {
  mix.sourceMaps();
}
