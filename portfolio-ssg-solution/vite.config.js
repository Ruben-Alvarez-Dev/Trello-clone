import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteSSG } from 'vite-ssg/single-page';

export default defineConfig({
  plugins: [
    react(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    crittersOptions: {
      preload: 'swap',
      inlineFonts: true,
    },
    onFinished() {
      generateSitemap();
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.rubenalvarez.dev/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.rubenalvarez.dev/#about</loc>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://www.rubenalvarez.dev/#projects</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://www.rubenalvarez.dev/#experience</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.rubenalvarez.dev/#contact</loc>
    <priority>0.6</priority>
  </url>
</urlset>`;
  
  require('fs').writeFileSync('./dist/sitemap.xml', sitemap);
}