# Brahmagiri Aqua — premium static water company website

Complete, responsive HTML5 / CSS3 / vanilla JavaScript website inspired by the supplied clean blue-and-white design. The company name and logo were supplied by the owner. All business statistics, contact details, service promises, facility imagery, certifications, policies, and distribution regions must be reviewed and replaced with verified company information before launch. No PHP, frontend framework, database, admin panel, or deployed backend is included.

## Preview

Open `index.html` directly, or use the optional local preview:

```sh
node scripts/serve.mjs
```

Visit `http://127.0.0.1:4173`. Node is only needed for development tools; the deployed website runs without it.

## Complete file structure and created files

```text
aquapure/
├── index.html
├── about.html
├── products.html
├── services.html
├── custom-label.html
├── distributors.html
├── contact.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── _headers
├── .gitignore
├── README.md
├── TESTING.md
├── BRANDING.md
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── site-config.js
│   │   ├── main.js
│   │   ├── products.js
│   │   └── contact.js
│   ├── fonts/
│   │   ├── manrope-latin.woff2
│   │   └── OFL.txt
│   ├── icons/
│   │   ├── favicon.svg (SVG version of supplied logo)
│   │   ├── favicon-192.png
│   │   └── favicon-512.png
│   └── images/
│       ├── brand/
│       │   ├── brahmagiri-aqua-logo-original.jpeg
│       │   └── brahmagiri-aqua-logo.webp
│       ├── brand/
│       │   ├── brahmagiri-aqua-logo-original.jpeg
│       │   └── brahmagiri-aqua-logo.webp
│       ├── hero/
│       │   ├── water-hero.webp
│       │   ├── water-hero-mobile.webp
│       │   └── open-graph.webp
│       ├── about/
│       │   ├── water-manufacturing-facility.webp
│       │   └── pristine-water-landscape.webp
│       ├── products/
│       │   ├── water-bottle-250ml.webp
│       │   ├── water-bottle-500ml.webp
│       │   ├── water-bottle-1-liter.webp
│       │   ├── water-bottle-2-liter.webp
│       │   ├── water-jar-20-liter.webp
│       │   └── gifting-bottles.webp
│       ├── custom-label/
│       │   └── custom-branded-bottles.webp
│       ├── distributors/
│       │   └── delivery-truck.webp
│       ├── services/           (reserved for replacement assets)
│       ├── industries/         (reserved for replacement assets)
│       └── contact/            (reserved for replacement assets)
└── scripts/                    (development only; excluded from deployment)
    ├── build.mjs
    ├── serve.mjs
    ├── package.mjs
    ├── optimize-images.mjs
    ├── check-files.mjs
    ├── rebrand.mjs
    └── test-site.mjs
```

`.tools/` contains downloaded local testing and optimization dependencies. `artifacts/` contains screenshots and test reports. `dist/` is created by the packaging command. These folders are ignored by Git. Deliver only the contents of `dist/` to hosting.

## Change company information

Edit **`assets/js/site-config.js`**, the single source for company name, tagline, domain, phone, email, address, hours, form provider, social URLs, and sample statistics. Then run:

```sh
node scripts/build.mjs
```

The build tool regenerates all HTML pages with identical shared header/footer, active navigation, metadata, robots file, sitemap, and manifest. Core page content is already present in HTML and does not depend on JavaScript. Edit page copy, product definitions, and sections in `scripts/build.mjs`; edit the reusable design in `assets/css/style.css`. Direct HTML edits are supported but will be overwritten by the next build.

Before launch, set `siteUrl` to the real HTTPS domain and `production: true`, then rebuild. The default intentionally uses `noindex` and `Disallow: /` for the sample domain. Production enables indexable pages and verified Organization / BreadcrumbList JSON-LD; the 404 remains noindex. Sample claims are not added to structured data. LocalBusiness and Product commercial data are intentionally omitted until actual business/product information is available. FAQ is visible, but no rich-result eligibility is implied and no FAQPage schema is emitted.

Replace the sample mineral-water headline if your actual product classification requires different wording. Publish only certifications and capacity/delivery claims your company can substantiate. Dates in the company journey are placeholders. The policy dialogs contain editable sample copy and need an approved final policy. Social links default to `#` and announce that the profile is pending.

## Replace images

All images are local and replaceable; no external image service runs in the browser. Use your licensed company/product photography at the same descriptive paths. Scene assets are 1536 × 1024; the mobile hero is 960 × 640; product assets are 640 × 640; Open Graph is 1200 × 630. Keep those dimensions or update the corresponding width/height attributes in the build tool. Export optimized WebP or AVIF and update file references if the extension changes.

The small/large bottle files currently share a single **illustrative bottle photograph**; replace each with the actual size-specific packaging. The jar and gifting images are separate. The factory and truck images are conceptual and do not portray a verified company asset. Update descriptive alt text when replacing imagery. Above-the-fold images load immediately; below-the-fold images are lazy-loaded. Do not lazy-load the home hero.

The company name, logo, and tagline now use the supplied Brahmagiri Aqua branding. The bottle, jar, custom-label, facility, delivery, hero, and sharing images were edited to carry that logo. See [BRANDING.md](BRANDING.md) for saved asset locations and the final edit prompts. The latest deployment archive is `Brahmagiri-Aqua-static.zip`.

Original imagery was created with the built-in image generation tool. Original generation prompt set:

- Hero: premium photorealistic jar and two blue-capped water bottles on the right, water splash and green leaves, pale-blue negative space on the left, no words or existing brands.
- Bottle: single clear PET bottle, blue cap, white label with original drop motif, white studio background, no words.
- Jar: clear 20-liter refillable water jar, blue cap, drop motif, white studio background.
- Facility: original modern white-and-blue Indian water packaging facility, landscaped grounds, bright sky, no real brand.
- Custom labels: premium glass/PET bottles with white, navy, and gold labels, abstract motifs, pale-blue studio setting.
- Logistics: clean white and aqua delivery truck at an illustrative contemporary facility, no real brand.
- About landscape: pristine turquoise water and layered blue mountain peaks in daylight.

The images above are saved under `assets/images/`. The Manrope font is distributed with its SIL Open Font License in `assets/fonts/OFL.txt`.

## Connect Formspree or Web3Forms

Forms validate required fields, email, phone digits, six-digit pincode (distributor form), and minimum ten-character messages. All inputs have labels, per-field errors, and accessible submission status. Valid sample submissions explicitly report that nothing was sent. There is no backend and no success simulation in production code.

For **Formspree**, create a form in your account and edit the config:

```js
formProvider: "formspree",
formEndpoint: "https://formspree.io/f/YOUR_FORM_ID",
web3FormsAccessKey: "",
```

Use the exact real form ID, then rebuild. The code sends `FormData` with an `Accept: application/json` header and checks both the HTTP response and provider confirmation. See [Formspree’s JavaScript form guide](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax).

For **Web3Forms**:

```js
formProvider: "web3forms",
formEndpoint: "https://api.web3forms.com/submit",
web3FormsAccessKey: "YOUR_PUBLIC_FORM_ACCESS_KEY",
```

Web3Forms uses a public form access key intended for frontend integration, never a secret server/API credential. Do not insert private keys, account tokens, or passwords into this config. See [Web3Forms HTML and JavaScript integration](https://docs.web3forms.com/how-to-guides/html-and-javascript). Enable provider-side spam protection / origin restrictions as available. The honeypot and client validation supplement provider validation.

Only approved HTTPS provider endpoints are accepted. Failed/unconfirmed responses retain the input values. Requests have a 15-second timeout and prevent duplicate submissions. Test delivery to the actual inbox, spam controls, and privacy notice before launch. All three forms use the same endpoint with a distinct subject. For separate routing, configure it in your provider.

## Deploy to Cloudflare Pages

1. Update verified content, the actual HTTPS domain, and the form endpoint. Set `production: true`.
2. Run `node scripts/build.mjs`, then `node scripts/package.mjs`.
3. In the Cloudflare dashboard, open **Workers & Pages**, create a **Pages** application, and choose **Direct Upload**. Upload the `dist` folder contents or a ZIP whose root contains `index.html`.
4. Confirm the assigned `pages.dev` address, then connect your own domain through the project’s Custom domains settings.
5. Rebuild with the final domain and upload the updated files if the domain changed.
6. Confirm HTTPS, the custom 404 response, forms, metadata, and security headers on the deployed address.

See the official [Direct Upload guide](https://developers.cloudflare.com/pages/get-started/direct-upload/). For Git-based deployment, choose the static HTML setup and build command `node scripts/build.mjs && node scripts/package.mjs`, output directory `dist`; no dependency installation is needed for those commands. See [Cloudflare static HTML hosting](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/).

`_headers` supplies CSP, frame protection, content-type protection, referrer policy, permissions policy, and font/image caching. It allows only the supported form service hosts. If you add a real map iframe, analytics, or another service, update the CSP deliberately. See [Cloudflare Pages headers](https://developers.cloudflare.com/pages/configuration/headers/). Do not upload `.tools`, scripts, screenshots, or source configuration backups as site content.

## SEO checklist

- [x] Unique title and description on every page.
- [x] Canonical, Open Graph and Twitter card metadata.
- [x] Single H1, semantic landmarks, internal links, descriptive image alt text.
- [x] Visible breadcrumbs on internal pages.
- [x] Favicon, manifest, 404, robots.txt, and seven-page sitemap.
- [x] One configurable company/domain source; verified-only structured data.
- [ ] Replace `example.com` and set production true; rebuild.
- [ ] Verify actual contact details, product descriptions, certification claims, and statistics.
- [ ] Confirm deployed canonical URLs and HTTP status codes, including Cloudflare redirects from `.html` paths.
- [ ] Publish approved policies and a real social/brand sharing image if desired.
- [ ] Submit the final sitemap in search-engine webmaster tools.
- [ ] Run Lighthouse against the final HTTPS deployment; confirm SEO ≥95 and other requested categories ≥90.

## Responsive and interaction checklist

Test every page at **320, 375, 390, 430, 768, 820, 1024, 1280, 1440, and 1920px**:

- [ ] No horizontal overflow, overlaps, cropped text, or broken images.
- [ ] Mobile hero stacks; forms use one column on narrow devices.
- [ ] Product/cards grids adapt; footer stacks; process and journey become vertical.
- [ ] Mobile menu opens, locks page scroll, closes with navigation, outside click, Escape, and desktop resizing.
- [ ] Navigation/CTA links reach the correct page and enquiry section.
- [ ] Every product filter works without a reload.
- [ ] FAQ works with mouse, touch, and keyboard.
- [ ] Required/email/phone/pincode/message validation works on all forms.
- [ ] Unconnected forms never announce delivery; connected forms confirm provider success.
- [ ] Tab order, visible focus, skip link, menu focus containment, and policy dialogs work.
- [ ] Reduced motion disables reveal/hover movement and smooth scrolling.
- [ ] Back-to-top works and sticky header has readable contrast.
- [ ] Chrome desktop, Chrome mobile emulation, real Android Chrome, Firefox, and Safari where available.

Automated local checks are available with:

```sh
npm.cmd install --no-save --no-package-lock --prefix .tools sharp playwright lighthouse @axe-core/playwright
node scripts/test-site.mjs
node scripts/check-files.mjs
```

Start the preview server first. The test script uses the installed Windows Chrome path; adjust it for another OS. Results are written to `artifacts/test-results.json`, and desktop/mobile screenshots to `artifacts/`. Test dependencies are local development tools, never site dependencies. See `TESTING.md` for the recorded checks and remaining platform limitations.
