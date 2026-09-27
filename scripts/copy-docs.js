import fs from 'fs';

try {
  fs.cpSync('dist', 'docs', { recursive: true });
  console.log('Successfully synced dist build output to docs/ directory for GitHub Pages deployment');
} catch (err) {
  console.error('Error copying dist to docs:', err);
}
