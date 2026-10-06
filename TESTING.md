# Recorded verification

Verified locally on 6 October 2026 using installed desktop Chrome in headless mode, Chrome mobile emulation, Axe, Lighthouse, and static file checks.

Rechecked after the Brahmagiri Aqua branding update: all page names, supplied logo assets, branded product/hero/facility/fleet images, and the longer header branding are included in the results below.

## Results

| Check | Result |
| --- | --- |
| Pages | All seven requested pages plus 404 |
| Screen widths | 320, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920px |
| Layout checks | 80 passed; no horizontal overflow |
| Interaction checks | 13 passed |
| Axe WCAG 2 / 2.1 A and AA | Zero detected violations across all eight pages |
| Browser console / script errors | Zero |
| Broken images | Zero |
| Local file and anchor references | 318 passed |
| Page titles / descriptions | All unique |
| HTML IDs | No duplicates |
| Footer consistency | Identical on all pages |
| Sitemap | Seven indexable page entries; no 404 entry |
| JavaScript syntax | Main, products, and contact scripts passed Node syntax checks |

The layout/accessibility screenshot pass forces distant sections to render so all content is checked, including sections normally deferred by `content-visibility`. Navigation and form interaction checks exercise normal browser behavior.

## Final mobile Lighthouse audit

| Category | Score |
| --- | ---: |
| Performance | 95 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

LCP: 2.9 seconds. Total blocking time: 30 ms. CLS: 0.

These are local, mobile, simulated laboratory measurements of the **indexable launch preview**, not field Core Web Vitals or a guarantee for a deployed site. The shipped sample intentionally has `production: false`, `noindex`, and a robots exclusion while the domain and business information remain placeholders. SEO reaches the recorded score when the indexable configuration is enabled. The actual deployment still needs its real canonical domain.

Raw report: `artifacts/lighthouse-brahmagiri-home.json`. Browser results: `artifacts/test-results.json`. Desktop and mobile screenshots are stored in `artifacts/`; the branded previews are `brahmagiri-desktop-preview.png` and `brahmagiri-mobile-preview.png`.

## Exercised behavior

- Mobile menu opening, scroll lock, Escape, backdrop dismissal, and navigation dismissal.
- All product filter categories and accessible pressed states.
- FAQ expansion/collapse and accessible expanded states.
- Required, email, phone, and minimum-message validation on all three forms.
- Truthful unconfigured-form status; no transmission or false delivery message.
- Product quote links prefill product and enquiry type.
- Mocked Formspree acceptance confirms success and resets fields.
- Mocked Formspree rejection preserves values and shows an error.
- Policy dialog opening and Escape dismissal.
- Reduced-motion scrolling behavior and keyboard focusability.
- Chrome mobile emulation with touch navigation and viewport sizing.

Form provider responses were intercepted in the local test. No enquiries were transmitted to an external service.

## Remaining release checks

- Firefox and Safari were unavailable; real iOS Safari and Android Chrome hardware were not tested.
- Connect the actual form provider and confirm live inbox delivery, spam protection, and provider configuration. Web3Forms is implemented but was not tested against a live account.
- Replace sample contact details, policies, product photography, certification placeholders, capacity statistics, and delivery claims with verified information.
- Set the actual HTTPS domain and `production: true`, then rebuild and package.
- Verify Cloudflare’s deployed security headers, HTTPS, canonical URLs, `.html` redirects, and custom 404 status.
- Repeat Lighthouse against the final deployment after adding real assets or services.

See README.md for full configuration, deployment instructions, and checklists.
