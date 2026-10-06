// Local development only; the deployed site consists entirely of static files.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const base = path.resolve(process.argv[2] || '.');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2','.txt':'text/plain','.xml':'application/xml'};
const server = http.createServer((req,res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); res.end(); return; }
  const file = path.resolve(base, '.' + (pathname==='/'?'/index.html':pathname));
  if (!file.startsWith(base + path.sep) || pathname.includes('/.')) { res.writeHead(403); res.end(); return; }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}); res.end(fs.readFileSync(path.join(base,'404.html'))); return; }
  res.writeHead(200,{'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});
const port = Number(process.argv[3] || 4173);
server.listen(port,'127.0.0.1',()=>console.log(`Brahmagiri Aqua preview: http://127.0.0.1:${port}`));
