// Rebrand source copy and prepare optimized versions of the supplied logo.
import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('../.tools/node_modules/sharp');
const brand='Brahmagiri Aqua';
const source='C:/Users/gumma/Downloads/WhatsApp Image 2026-10-06 at 11.24.19 PM.jpeg';
fs.mkdirSync('assets/images/brand',{recursive:true});
fs.copyFileSync(source,'assets/images/brand/brahmagiri-aqua-logo-original.jpeg');
await sharp(source).resize(360,240).webp({quality:90}).toFile('assets/images/brand/brahmagiri-aqua-logo.webp');
await sharp(source).resize(192,192,{fit:'contain',background:'#ffffff'}).png().toFile('assets/icons/favicon-192.png');
await sharp(source).resize(512,512,{fit:'contain',background:'#ffffff'}).png().toFile('assets/icons/favicon-512.png');
fs.writeFileSync('assets/icons/favicon.svg',`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><title>Brahmagiri Aqua</title><image width="192" height="192" href="data:image/png;base64,${fs.readFileSync('assets/icons/favicon-192.png').toString('base64')}"/></svg>`);
for(const file of ['scripts/build.mjs','scripts/serve.mjs','README.md']){
 let text=fs.readFileSync(file,'utf8').replaceAll('AquaPure',brand);
 if(file==='scripts/build.mjs'){
  text=text.replaceAll('assets/icons/favicon.svg','assets/icons/favicon-192.png').replace('rel="icon" type="image/svg+xml"','rel="icon" type="image/png"');
  text=text.replace("icons:[{src:'assets/icons/favicon-192.png',sizes:'any',type:'image/svg+xml',purpose:'any'}]","icons:[{src:'assets/icons/favicon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'assets/icons/favicon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]");
  text=text.replace('${esc(c.name)} is a sample brand built around a simple idea','${esc(c.name)} represents a simple idea').replace('SAMPLE BRAND & BUSINESS CONTENT','ILLUSTRATIVE BUSINESS INFORMATION');
 }
 if(file==='README.md'){
  text=text.replace('Brahmagiri Aqua is a **sample brand**.','The company name and logo were supplied by the owner.');
  text=text.replace('│   │   └── favicon.svg','│   │   ├── favicon.svg (SVG version of supplied logo)\n│   │   ├── favicon-192.png\n│   │   └── favicon-512.png');
  text=text.replace('│       ├── hero/','│       ├── brand/\n│       │   ├── brahmagiri-aqua-logo-original.jpeg\n│       │   └── brahmagiri-aqua-logo.webp\n│       ├── hero/');
 }
 fs.writeFileSync(file,text);
}
console.log('Updated company copy and prepared supplied logo and branded favicon assets.');
