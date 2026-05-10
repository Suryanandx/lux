const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const watch = process.argv.includes('--watch');

const CSS_ORDER = [
  '00-base', '01-theme',
  'button', 'form', 'card', 'badge', 'alert',
  'table', 'dialog', 'accordion', 'tabs',
  'progress', 'toast', 'dropdown',
  'avatar', 'tooltip', 'nav', 'cmdk', 'components-extra', 'animations', 'utilities',
];

async function buildCSS() {
  const combined = CSS_ORDER.map(name => {
    const file = path.join(__dirname, 'src/css', `${name}.css`);
    return fs.readFileSync(file, 'utf8');
  }).join('\n');
  fs.writeFileSync('dist/lux.css', combined);

  const result = await esbuild.transform(combined, { loader: 'css', minify: true });
  fs.writeFileSync('dist/lux.min.css', result.code);
  return result.code.length;
}

async function buildJS() {
  const result = await esbuild.build({
    entryPoints: ['src/js/index.js'],
    bundle: true, minify: true, format: 'iife',
    globalName: '_lux',
    outfile: 'dist/lux.min.js',
    metafile: false,
  });
  return fs.statSync('dist/lux.min.js').size;
}

async function build() {
  fs.mkdirSync('dist', { recursive: true });
  const [cssSize, jsSize] = await Promise.all([buildCSS(), buildJS()]);
  const zlib = require('zlib');
  const cssGz = zlib.gzipSync(fs.readFileSync('dist/lux.min.css')).length;
  const jsGz  = zlib.gzipSync(fs.readFileSync('dist/lux.min.js')).length;
  console.log(`CSS: ${(cssSize/1024).toFixed(1)}KB raw  ${(cssGz/1024).toFixed(1)}KB gz`);
  console.log(`JS:  ${(jsSize/1024).toFixed(1)}KB raw  ${(jsGz/1024).toFixed(1)}KB gz`);
  console.log(`Total gz: ${((cssGz+jsGz)/1024).toFixed(1)}KB`);

  // Copy to docs
  fs.mkdirSync('docs/static', { recursive: true });
  fs.copyFileSync('dist/lux.min.css', 'docs/static/lux.min.css');
  fs.copyFileSync('dist/lux.min.js',  'docs/static/lux.min.js');
  console.log('Built → dist/ + docs/static/');
}

if (watch) {
  const chokidar = require('chokidar');
  console.log('Watching src/...');
  build();
  chokidar.watch('src').on('change', f => { console.log('Changed:', f); build(); });
} else {
  build().catch(e => { console.error(e); process.exit(1); });
}
