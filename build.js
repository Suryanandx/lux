const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const watch = process.argv.includes('--watch');

const CSS_CORE = [
  '00-base', '01-theme',
  'button', 'form', 'card', 'badge', 'alert',
  'table', 'dialog', 'tabs', 'progress', 'toast',
  'avatar', 'tooltip', 'nav', 'utilities',
  'animations',
];
const CSS_ORDER = [
  '00-base', '01-theme', '02-density',
  'button', 'form', 'card', 'badge', 'alert',
  'table', 'dialog', 'accordion', 'tabs',
  'progress', 'toast', 'dropdown',
  'avatar', 'tooltip', 'nav', 'cmdk',
  'components-extra', 'components-pro',
  'wiki',
  'animations', 'animations-pro', 'utilities',
];

async function buildCSS() {
  const { transform } = require('lightningcss');
  const compile = (order, basename) => {
    const combined = order.map(name => {
      const file = path.join(__dirname, 'src/css', `${name}.css`);
      return fs.readFileSync(file, 'utf8');
    }).join('\n');
    fs.writeFileSync(`dist/${basename}.css`, combined);
    const { code } = transform({
      filename: `${basename}.css`,
      code: Buffer.from(combined),
      minify: true,
      targets: { chrome: 120 << 16, firefox: 120 << 16, safari: 17 << 16 },
    });
    fs.writeFileSync(`dist/${basename}.min.css`, code);
    return code.length;
  };

  const full = compile(CSS_ORDER, 'lux');
  const core = compile(CSS_CORE,  'lux.core');
  return { full, core };
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
  const [{ full, core }, jsSize] = await Promise.all([buildCSS(), buildJS()]);
  const zlib = require('zlib');
  const fullGz = zlib.gzipSync(fs.readFileSync('dist/lux.min.css')).length;
  const coreGz = zlib.gzipSync(fs.readFileSync('dist/lux.core.min.css')).length;
  const jsGz   = zlib.gzipSync(fs.readFileSync('dist/lux.min.js')).length;
  console.log(`CSS full: ${(full/1024).toFixed(1)}KB raw  ${(fullGz/1024).toFixed(1)}KB gz`);
  console.log(`CSS core: ${(core/1024).toFixed(1)}KB raw  ${(coreGz/1024).toFixed(1)}KB gz`);
  console.log(`JS:       ${(jsSize/1024).toFixed(1)}KB raw  ${(jsGz/1024).toFixed(1)}KB gz`);
  console.log(`Total (full): ${((fullGz+jsGz)/1024).toFixed(1)}KB gz`);
  console.log(`Total (core): ${((coreGz+jsGz)/1024).toFixed(1)}KB gz`);

  fs.mkdirSync('docs/static', { recursive: true });
  fs.copyFileSync('dist/lux.min.css',      'docs/static/lux.min.css');
  fs.copyFileSync('dist/lux.core.min.css', 'docs/static/lux.core.min.css');
  fs.copyFileSync('dist/lux.min.js',       'docs/static/lux.min.js');
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
