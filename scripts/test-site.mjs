import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('../.tools/node_modules/playwright');
const { default: AxeBuilder } = require('../.tools/node_modules/@axe-core/playwright');
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const testContext = await browser.newContext();
const page = await testContext.newPage();
const errors = [];
page.on('pageerror', e=>errors.push(e.message));
page.on('console', message=>{ if(message.type()==='error') errors.push(message.text()); });
page.on('response', response=>{ if(response.status()>=400) errors.push(`${response.status()} ${response.url()}`); });
const base='http://127.0.0.1:4173/';
const pages=['index.html','about.html','products.html','services.html','custom-label.html','distributors.html','contact.html','404.html'];
const widths=[320,375,390,430,768,820,1024,1280,1440,1920];
const result={browser:'Desktop Chrome headless + Chrome mobile emulation',widths,pages,layoutChecks:[],interactions:[],accessibility:[],limitations:['Firefox and Safari are not installed. Real mobile hardware testing remains a release check.']};
fs.mkdirSync('artifacts',{recursive:true});
for(const file of pages){
  await page.goto(base+file);
  await page.addStyleTag({content:'main>.section{content-visibility:visible!important}'});
  await page.evaluate(()=>document.fonts.ready);
  const structure=await page.evaluate(()=>({h1:document.querySelectorAll('h1').length,alt:[...document.images].every(i=>i.hasAttribute('alt')),labels:[...document.querySelectorAll('.form-field input,.form-field select,.form-field textarea')].every(i=>document.querySelector(`label[for="${i.id}"]`)),description:!!document.querySelector('meta[name="description"]')?.content,canonical:!!document.querySelector('link[rel="canonical"]')?.href,og:!!document.querySelector('meta[property="og:title"]'),twitter:!!document.querySelector('meta[name="twitter:card"]')}));
  assert.equal(structure.h1,1,`${file} must have exactly one H1`);for(const [k,v]of Object.entries(structure))assert(v,`${file}: ${k}`);
  for(const width of widths){
    await page.setViewportSize({width,height:900});
    const layout=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth}));
    assert(layout.document<=width && layout.body<=width,`Overflow ${file} at ${width}: ${JSON.stringify(layout)}`);
    result.layoutChecks.push(`${file}@${width}: pass`);
  }
  await page.setViewportSize({width:1440,height:1000});
  const broken=await page.evaluate(async()=>{await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));return [...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src);});
  assert.equal(broken.length,0,`Broken images on ${file}: ${broken}`);
  await page.evaluate(()=>document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('revealed')));
  await page.evaluate(()=>document.getAnimations().forEach(animation=>animation.finish()));
  if(['index.html','about.html','products.html','contact.html'].includes(file))await page.screenshot({path:`artifacts/${file.replace('.html','')}-desktop.png`,fullPage:true});
  const accessibility=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  result.accessibility.push({page:file,violations:accessibility.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))});
}
await page.goto(base+'index.html');await page.setViewportSize({width:390,height:844});
await page.locator('.menu-toggle').click();assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'true');assert.equal(await page.evaluate(()=>document.body.classList.contains('menu-open')),true);
await page.keyboard.press('Escape');assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
await page.locator('.menu-toggle').click();await page.locator('.menu-backdrop').click({position:{x:5,y:700}});assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'),'false');
await page.locator('.menu-toggle').click();await page.locator('#primary-nav a[href="about.html"]').click();await page.waitForURL('**/about.html');assert.equal(await page.evaluate(()=>document.body.classList.contains('menu-open')),false);
result.interactions.push('Mobile menu opens, locks scrolling, closes on Escape, backdrop, and navigation.');
await page.goto(base+'products.html');
for(const [filter,count]of [['small',2],['large',2],['jars',1],['gifting',1],['all',6]]){await page.locator(`[data-filter="${filter}"]`).click();assert.equal(await page.locator('.product-card:visible').count(),count);}
result.interactions.push('All five product filters show the expected products without reload.');
await page.goto(base+'contact.html');await page.locator('.faq-toggle').first().click();assert.equal(await page.locator('.faq-toggle').first().getAttribute('aria-expanded'),'true');assert(await page.locator('#faq-answer-0').isVisible());await page.locator('.faq-toggle').first().click();assert.equal(await page.locator('#faq-answer-0').isVisible(),false);result.interactions.push('FAQ expands and collapses with accessible state.');
for(const file of ['index.html','contact.html','distributors.html']){
  await page.goto(base+file);await page.locator('button[type="submit"]').click();assert((await page.locator('[aria-invalid="true"]').count())>0);
  await page.locator('[name="full_name"]').fill('Test User');await page.locator('[name="email"]').fill('invalid');await page.locator('[name="phone"]').fill('123');await page.locator('[name="city"]').fill('Hyderabad');await page.locator('[name="message"]').fill('short');
  if(file==='distributors.html'){await page.locator('[name="state"]').fill('Telangana');await page.locator('[name="pincode"]').fill('500001');await page.locator('[name="address"]').fill('Sample business address');await page.locator('[name="experience"]').fill('5 years');}else await page.locator('[name="enquiry_type"]').selectOption('bulk');
  await page.locator('button[type="submit"]').click();assert.equal(await page.locator('[name="email"]').getAttribute('aria-invalid'),'true');assert.equal(await page.locator('[name="phone"]').getAttribute('aria-invalid'),'true');assert.equal(await page.locator('[name="message"]').getAttribute('aria-invalid'),'true');
  await page.locator('[name="email"]').fill('test@example.com');await page.locator('[name="phone"]').fill('+91 90000 00000');await page.locator('[name="message"]').fill('We need a sample quotation for packaged water.');await page.locator('button[type="submit"]').click();assert((await page.locator('.form-status').textContent()).includes('nothing has been sent'));
  result.interactions.push(`${file}: required, email, phone, and message validation; truthful unconfigured form state.`);
}
await page.goto(base+'contact.html?enquiry=product&product=500ml#enquiry');assert.equal(await page.locator('[name="enquiry_type"]').inputValue(),'product');assert((await page.locator('[name="message"]').inputValue()).includes('500ml'));result.interactions.push('Product quote links prefill enquiry type and product.');
// Simulate the approved provider response; no user information is transmitted.
await page.evaluate(()=>{window.SITE_CONFIG.formEndpoint='https://formspree.io/f/testform';});
await page.route('https://formspree.io/f/testform',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:true})}));
for(const [name,value]of [['full_name','Test User'],['email','test@example.com'],['phone','9000000000'],['city','Hyderabad'],['message','A simulated form submission for testing.']])await page.locator(`[name="${name}"]`).fill(value);
await page.locator('button[type="submit"]').click();await page.locator('.form-status.success').waitFor();assert((await page.locator('.form-status').textContent()).includes('successfully'));result.interactions.push('Mocked Formspree success confirms delivery before resetting form.');
await page.route('https://formspree.io/f/testform',route=>route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({ok:false})}));
for(const [name,value]of [['full_name','Test User'],['email','test@example.com'],['phone','9000000000'],['city','Hyderabad'],['message','A simulated failed form submission.']])await page.locator(`[name="${name}"]`).fill(value);await page.locator('[name="enquiry_type"]').selectOption('bulk');await page.locator('button[type="submit"]').click();await page.locator('.form-status.error').waitFor();assert.equal(await page.locator('[name="full_name"]').inputValue(),'Test User');result.interactions.push('Mocked provider rejection preserves form data and shows an error.');
await page.goto(base+'index.html');await page.setViewportSize({width:390,height:844});await page.evaluate(async()=>{document.querySelectorAll('main>.section').forEach(section=>section.style.contentVisibility='visible');await Promise.all([...document.images].map(i=>{i.loading='eager';return i.decode().catch(()=>{});}));document.querySelectorAll('[data-reveal]').forEach(el=>el.classList.add('revealed'));});await page.evaluate(()=>document.getAnimations().forEach(animation=>animation.finish()));await page.screenshot({path:'artifacts/index-mobile.png',fullPage:true});
await page.locator('[data-policy="privacy"]').first().click();assert(await page.locator('#policy-dialog').isVisible());await page.keyboard.press('Escape');assert.equal(await page.locator('#policy-dialog').isVisible(),false);result.interactions.push('Policy dialog opens and closes with Escape.');
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>getComputedStyle(document.documentElement).scrollBehavior),'auto');result.interactions.push('Reduced motion disables smooth scrolling.');
await page.keyboard.press('Tab');assert(await page.evaluate(()=>!!document.activeElement && document.activeElement!==document.body));result.interactions.push('Keyboard navigation reaches interactive controls.');
const mobile=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3});const mobilePage=await mobile.newPage();await mobilePage.goto(base);assert.equal(await mobilePage.evaluate(()=>document.documentElement.scrollWidth),390);await mobilePage.locator('.menu-toggle').tap();assert.equal(await mobilePage.locator('.menu-toggle').getAttribute('aria-expanded'),'true');result.interactions.push('Chrome mobile emulation: touch navigation and viewport pass.');
result.consoleErrors=errors;fs.writeFileSync('artifacts/test-results.json',JSON.stringify(result,null,2));
assert.equal(errors.length,0,`Browser errors: ${errors.join('; ')}`);
console.log(`PASS: ${result.layoutChecks.length} layout checks and ${result.interactions.length} interaction checks.`);
const violations=result.accessibility.reduce((n,p)=>n+p.violations.length,0);console.log(`Accessibility violations: ${violations}. Details: artifacts/test-results.json`);
await browser.close();
if(violations)process.exitCode=1;
