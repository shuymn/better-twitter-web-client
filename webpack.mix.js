const mix = require('laravel-mix');

mix.js('./src/js/content.js', './dist/js')
  .js('./src/js/background.js', './dist/js')
  .sass('src/css/content.scss', './dist/css')
  .copy('./src/static/**/*', './dist');

if (!mix.inProduction()) {
  mix.sourceMaps();
}
