// Runs automatically after `npm run build` (the npm "postbuild" hook).
//
// Why this exists: GitHub Pages only answers "200 OK" for files that exist.
// Our pages (/about, /coaches, ...) are routes inside one React app, so they
// used to fall through to 404.html. Visitors still saw the right page, but
// Google was told "404 Not Found" and left those pages out of search.
//
// What it does:
//   1. Copies index.html to 404.html, the fallback for /invite, /f/... links.
//   2. Writes a real HTML file for each page in PAGES. GitHub Pages serves
//      /about from about.html with a 200 and no redirect.
//   3. Writes sitemap.xml and robots.txt from the same list.
//   4. Copies CNAME so the custom domain keeps working.
//
// To publish a new page, add it to PAGES.

import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SITE_URL = 'https://perflection.ai';
const DIST = 'dist';

// Titles match what each page sets with document.title, so Google sees the
// same title whether or not it runs the page's JavaScript.
const PAGES = [
  { path: '/' }, // keeps the default title from index.html
  { path: '/students', title: 'For Golfers | SneakySwing' },
  { path: '/coaches', title: 'For Coaches | SneakySwing' },
  { path: '/about', title: 'About | SneakySwing' },
  { path: '/golfti', title: 'GolfTI | SneakySwing' },
  { path: '/leaderboard', title: 'Leaderboard | Sneaky Academy' },
  { path: '/contact', title: 'Contact | Sneaky Academy' },
  { path: '/legal/privacy', title: 'Privacy Policy | Perflection AI' },
  { path: '/legal/terms', title: 'Terms and Conditions | Perflection AI' },
];

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const indexFile = join(DIST, 'index.html');
const template = readFileSync(indexFile, 'utf8');

if (!/<title>[\s\S]*?<\/title>/.test(template) || !template.includes('</head>')) {
  throw new Error('postbuild: dist/index.html is missing <title> or </head>; cannot write page files.');
}

// 1. Fallback for links that are not real pages (invites, shared feedback).
//    Left identical to the build output, with no canonical tag.
writeFileSync(join(DIST, '404.html'), template);

// 2. One real file per page, each with its own title and canonical URL.
for (const page of PAGES) {
  let html = template;
  if (page.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(page.title)}</title>`);
  }
  html = html.replace('</head>', `  <link rel="canonical" href="${SITE_URL}${page.path}" />\n  </head>`);

  const file = page.path === '/' ? indexFile : join(DIST, `${page.path.slice(1)}.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

// 3. sitemap.xml and robots.txt
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PAGES.map((page) => `  <url><loc>${SITE_URL}${page.path}</loc></url>`),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

const robots = ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n');
writeFileSync(join(DIST, 'robots.txt'), robots);

// 4. Custom domain
if (existsSync('public/CNAME')) {
  copyFileSync('public/CNAME', join(DIST, 'CNAME'));
}

console.log(`postbuild: wrote 404.html, ${PAGES.length} page files, sitemap.xml and robots.txt`);
