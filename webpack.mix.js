const mix = require('laravel-mix'); // eslint-disable-line import/no-extraneous-dependencies

mix.js('./src/js/content.js', './dist/js')
  .js('./src/js/background.js', './dist/js')
  .sass('src/css/content.scss', './dist/css')
  .copy('./src/static/**/*', './dist');

if (!mix.inProduction()) {
  mix.sourceMaps();
}
