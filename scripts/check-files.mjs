import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const files=['index.html','about.html','products.html','services.html','custom-label.html','distributors.html','contact.html','404.html'];
const titles=new Set(),descriptions=new Set(),footers=new Set();let references=0;
for(const file of files){
  const html=fs.readFileSync(file,'utf8');
  const title=html.match(/<title>(.*?)<\/title>/)[1];const description=html.match(/<meta name="description" content="(.*?)">/)[1];
  assert(!titles.has(title),`Duplicate title: ${file}`);titles.add(title);assert(!descriptions.has(description),`Duplicate description: ${file}`);descriptions.add(description);
  footers.add(html.match(/<footer.*?<\/footer>/s)[0]);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,`Duplicate IDs: ${file}`);
  for(const [,attribute,value]of html.matchAll(/\b(href|src)="([^"]+)"/g)){
    if(value.startsWith('https:')||value.startsWith('data:')||value==='#'||value.startsWith('mailto:')||value.startsWith('tel:'))continue;
    if(value.startsWith('#')){if(!['#privacy','#terms'].includes(value))assert(ids.includes(value.slice(1)),`Missing anchor ${value} in ${file}`);continue;}
    const target=value.split(/[?#]/)[0];assert(fs.existsSync(path.resolve(target)),`Broken ${attribute} in ${file}: ${value}`);references++;
    if(value.includes('#')){const anchor=value.split('#')[1];assert(fs.readFileSync(target,'utf8').includes(`id="${anchor}"`),`Broken cross-page anchor: ${value}`);}
  }
}
assert.equal(footers.size,1,'Footers must be identical');
for(const file of ['robots.txt','sitemap.xml','site.webmanifest','_headers'])assert(fs.existsSync(file));
assert.equal([...fs.readFileSync('sitemap.xml','utf8').matchAll(/<loc>/g)].length,7);
console.log(`PASS: ${files.length} pages, ${references} local references, unique metadata/IDs, identical footers, 7-page sitemap.`);
