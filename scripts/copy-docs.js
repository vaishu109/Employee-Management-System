import fs from 'fs';
import path from 'path';

try {
  // 1. Copy dist to docs directory
  fs.cpSync('dist', 'docs', { recursive: true });

  // 2. Copy compiled dist/index.html to root ./index.html so GitHub Pages main root deployment serves production bundle
  fs.copyFileSync('dist/index.html', 'index.html');

  // 3. Copy dist/assets to root ./assets
  if (fs.existsSync('dist/assets')) {
    fs.cpSync('dist/assets', 'assets', { recursive: true });
  }

  // 4. Copy dist/.nojekyll to root ./.nojekyll
  if (fs.existsSync('dist/.nojekyll')) {
    fs.copyFileSync('dist/.nojekyll', '.nojekyll');
  }

  console.log('Successfully synced compiled production build to root index.html, assets/, and docs/ for GitHub Pages');
} catch (err) {
  console.error('Error during build sync:', err);
}
