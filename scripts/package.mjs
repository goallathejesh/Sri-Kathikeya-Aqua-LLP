import fs from 'node:fs';
import path from 'node:path';
fs.mkdirSync('dist', { recursive: true });
const files = ['index.html','about.html','products.html','services.html','custom-label.html','distributors.html','contact.html','404.html','robots.txt','sitemap.xml','site.webmanifest','_headers'];
for (const file of files) fs.copyFileSync(file,path.join('dist',file));
fs.cpSync('assets','dist/assets',{recursive:true});
console.log('Deployable static files copied to dist/. No build tools are included.');
