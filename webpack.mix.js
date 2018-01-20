const mix = require('laravel-mix'); // eslint-disable-line import/no-extraneous-dependencies

mix.js('./src/js/content.js', './dist/js')
  .js('./src/js/background.js', './dist/js')
  .js('./src/js/options.js', './dist/js')
  .standaloneSass('./src/css/module/translation-button-hider.scss', './dist/css')
  .standaloneSass('./src/css/options.scss', './dist/css')
  .copy('./src/static/**/*', './dist')
  .disableNotifications();

if (!mix.inProduction()) {
  mix.sourceMaps();
}
