const mix = require('laravel-mix'); // eslint-disable-line import/no-extraneous-dependencies

mix.js('./src/js/content.js', './dist/js')
  .js('./src/js/background.js', './dist/js')
  .copy('./src/static/**/*', './dist');
  .standaloneSass('./src/css/module/translation-button-hider.scss', './dist/css')

if (!mix.inProduction()) {
  mix.sourceMaps();
}
