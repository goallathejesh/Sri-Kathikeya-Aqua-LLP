# Brahmagiri Aqua branding update

The supplied company name is **Brahmagiri Aqua** and the supplied tagline is **Born from a Sacred Origin**. The original supplied logo is preserved in `assets/images/brand/brahmagiri-aqua-logo-original.jpeg`. The header/footer use its optimized, unaltered version at `assets/images/brand/brahmagiri-aqua-logo.webp`; browser icons also use the supplied artwork.

Branded photo edits used the **built-in image generation tool**, with each existing scene as the edit target and the supplied logo as the supporting reference. Final compressed files are saved under `assets/images/`, including the hero and mobile/OG variants, six product files, custom-label scene, facility scene, and delivery truck. Image-source references were updated in `.tools/image-sources.json`. The lake landscape remains unchanged.

## Edit prompt set

- **hero/water-hero.webp**: Replace only the generic drop symbols on the white labels of the large jar and BOTH small bottles with the supplied Brahmagiri Aqua logo. Render the logo crisply and naturally on each label, respecting cylindrical perspective. Keep the exact overall image composition, positions, pale blue left-side negative space, splash, leaves, caps, product silhouettes and lighting. Preserve a wide 3:2 image.

- **products/water-bottle-500ml.webp**: Replace only the single generic blue drop on the white label with the supplied full Brahmagiri Aqua brand logo, clearly readable BRAHMAGIRI and AQUA with the mountain and water emblem. Make the brand an authentic printed label. Keep the original bottle, blue cap, transparency, silhouette, white backdrop, shadow and square composition identical.

- **products/water-jar-20-liter.webp**: Replace only the generic drop logo on the white water jar label with the supplied Brahmagiri Aqua brand logo, clearly readable BRAHMAGIRI AQUA, preserve its mountain and flowing water artwork. Keep the blue wave band, jar silhouette, blue cap, transparency, white studio background and square framing exactly.

- **custom-label/custom-branded-bottles.webp**: Update ALL FIVE bottle labels to carry the supplied Brahmagiri Aqua logo instead of generic water drops. Reproduce the logo mountain and water design and the words BRAHMAGIRI AQUA accurately, with white label panels where needed to preserve the logo colors. Retain the premium white, navy and gold label styling, all bottle shapes, caps, glass/PET materials, positions, green leaves and pale-blue scene. Wide 3:2 composition unchanged.

- **about/water-manufacturing-facility.webp**: Replace the generic blue drop signage above the factory entrance with professionally mounted signage featuring the supplied Brahmagiri Aqua logo and accurate BRAHMAGIRI AQUA lettering. Preserve the entire building architecture, greenery, sky, daylight, perspective and 3:2 framing. This remains an illustrative facility photo.

- **distributors/delivery-truck.webp**: Replace the generic large blue drop on the side of the white delivery truck with the supplied Brahmagiri Aqua logo, accurately readable BRAHMAGIRI AQUA and the mountain and water-wave emblem, as realistic vehicle branding. Preserve blue wave graphics along the bottom, truck shape, cab, wheels, perspective, factory backdrop, trees, sky and lighting. Wide 3:2 image unchanged.

- **Hero finishing edit**: Add a white wraparound label carrying the supplied logo to the large rear-right water jar; preserve both already branded bottles, lighting, splash, leaves, negative space, and framing.

Common constraints: preserve original scene composition and materials; use the supplied logo identity and accurate BRAHMAGIRI AQUA lettering; no extra captions, brand names, or watermark.

The product photography is illustrative, including the shared bottle image used for four sizes. Factory and truck images remain illustrative company assets. Company contacts, certifications, business statistics, and form configuration still require verified information.

Run `node scripts/build.mjs` after editing the company configuration. Run `node scripts/package.mjs` to refresh deployment files. The deployment ZIP is `Brahmagiri-Aqua-static.zip`.
