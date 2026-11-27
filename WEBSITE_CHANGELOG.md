# Qerwiah Website Change Log

## ENCODING REPAIR — Arabic and English Text
- Status: Completed
- Files modified:
  - `src/data/translations.js`
  - `src/data/seedData.js`
  - `src/pages/AdminDashboardPage.jsx`
  - `src/components/Header.jsx`
  - `src/components/Footer.jsx`
  - `src/components/CinematicIntro.jsx`
- Changes made:
  - Repaired double-encoded/mojibake Arabic text throughout the website.
  - Restored corrupted English punctuation and symbols such as apostrophes, middots, em dashes, and multiplication signs.
  - Updated the hero headline to `من روح الريف` and `نصنع حكاية جديدة`.
- Verification:
  - Source searches found no remaining mojibake patterns.
  - `npm run build` completed successfully.
- Issues:
  - None identified in the source files after repair.

## TASK 01 — Update Arabic Logo
- Status: Completed
- Files modified:
  - `src/components/Header.jsx`
  - `src/components/Footer.jsx`
  - `src/components/CinematicIntro.jsx`
- Changes made:
  - Existing beige and burgundy Arabic logo assets are used in the header and footer.
  - The intro screen now displays the official Arabic or English logo asset according to language.
- Verification:
  - Header, footer, intro, and logo imports inspected.
  - Existing logo dimensions and `object-contain` sizing were preserved.
- Issues:
  - None.

## TASK 02 — Dynamic Logo Colors on Scroll
- Status: Completed
- Files modified:
  - `src/components/Header.jsx`
- Changes made:
  - Header already used separate burgundy/beige logo variants and now remains consistent with the existing smooth 500 ms transitions.
  - Burgundy logo appears on the light header; beige logo appears after the header changes to the burgundy background.
- Verification:
  - Inspected the scroll threshold and both logo variant states.
- Issues:
  - No automated browser viewport test was available.

## TASK 03 — Adaptive Favicon for Light and Dark Mode
- Status: Completed
- Files modified:
  - `index.html`
  - `src/main.jsx`
  - `src/assets/logo/favicon.svg`
  - `public/favicon.svg`
  - `public/favicon-beige.svg`
- Changes made:
  - Added official burgundy and beige favicon variants.
  - Added a single dynamic favicon declaration.
  - JavaScript now follows `prefers-color-scheme` and listens for live theme changes.
  - Cache-busting query parameters were added to favicon URLs.
- Verification:
  - Production build completed.
  - Both favicon files and the media-query listener were inspected.
- Issues:
  - The project has no in-app light/dark theme switch; live updates use the system theme fallback.

## TASK 04 — Standardize the Brand Name
- Status: Completed
- Files modified:
  - `index.html`
  - `metadata.json`
  - `src/components/Header.jsx`
  - `src/components/Footer.jsx`
  - `src/components/CinematicIntro.jsx`
  - `src/data/translations.js`
- Changes made:
  - Standardized English visible and technical brand references to `Qerwiah`.
  - Standardized Arabic visible and technical brand references to `قروية`.
- Verification:
  - Repeated searches found no `AL QERWIAH`, `جروية`, or `الجروية` brand references.
- Issues:
  - None.

## TASK 05 — Update the Brand Location
- Status: Completed
- Files modified:
  - `src/data/seedData.js`
  - `src/context/BrandContext.jsx`
- Changes made:
  - Updated defaults to `Dendera, Qena, Egypt` and `دندرة، قنا، مصر`.
  - Stored legacy Fayoum/Cairo locations are normalized to the new Dendera location.
- Verification:
  - Searched source and metadata; old address strings are absent from display data.
- Issues:
  - Administrators can still intentionally replace the location through the settings form.

## TASK 06 — Update Product Card Images
- Status: Completed
- Files modified:
  - `src/data/seedData.js`
  - `src/pages/ProductsPage.jsx`
- Changes made:
  - The nine products are mapped to their own product folders in order.
  - Card image one is default and image two fades in on hover.
  - Existing card dimensions and unrelated hover effects are preserved.
- Verification:
  - Confirmed one-to-one mappings for `product-1` through `product-9`.
  - Production build completed successfully.
- Issues:
  - Touch devices retain default image behavior because the swap is hover-driven.

## TASK 07 — Update Product Details Image Gallery
- Status: Completed
- Files modified:
  - `src/components/ProductDetailModal.jsx`
- Changes made:
  - Existing four-second interval remains product-keyed and clears on product change or unmount.
  - Added previous/next arrow controls and retained clear indicator controls.
  - Fade transitions and reset state are preserved for product changes.
- Verification:
  - Inspected interval cleanup, gallery key, manual controls, and product reset logic.
- Issues:
  - No automated timer/browser test was available.

## TASK 08 — Update Product Card Content
- Status: Completed
- Files modified:
  - `src/pages/ProductsPage.jsx`
- Changes made:
  - Product name is followed directly by the actual localized price or inquiry label.
  - The descriptive short text was removed from the name/price area.
  - Existing details and WhatsApp buttons remain unchanged.
- Verification:
  - Production build completed and all nine card entries use existing product data.
- Issues:
  - None.

## TASK 09 — Improve Product Details Content
- Status: Completed
- Files modified:
  - `src/components/ProductDetailModal.jsx`
  - `src/data/seedData.js`
- Changes made:
  - Existing editorial layout retains name, price, distinct `detailStory`, crafting time, gallery, favorites, and WhatsApp inquiry.
  - Technical specifications are not rendered in the modal.
- Verification:
  - Confirmed all nine products contain a dedicated `detailStory`.
  - Inspected price, crafting-time, favorite, and WhatsApp code paths.
- Issues:
  - Crafting times and stories use the existing project data or existing replacement content; no exact unverifiable data was added.

## TASK 10 — Admin Dashboard Investigation Only
- Status: Completed / No implementation changes
- Files modified:
  - None.
- Changes made:
  - Investigated the dashboard and shared context only.
- Verification:
  - Storage and update paths are documented below.
- Issues:
  - No implementation changes were made.

### Dashboard investigation findings
- **Storage mechanism:** Product edits use React state in `BrandContext`; that state is synchronized to browser `localStorage` under `alqerwiah_products`. Settings, admin sessions, and other account data use separate localStorage keys.
- **How product updates work:** Editing a product submits a payload to `updateProduct(id, patch)`, which replaces the matching product fields in React state. The save effect writes the complete products array to localStorage.
- **Category changes:** Changing an edited product category to Bags or Wallets updates the product object's `category` field. It does not mutate a backend or shared database.
- **Public website effect:** The public Products page reads the same `products` state and filters by `product.category`, so a category change affects the public page and category filters in the currently loaded website instance.
- **Refresh persistence:** The change persists after refresh in the same browser and origin because `loadProducts()` reads `alqerwiah_products` from localStorage and merges it with seed data.
- **Logout/login persistence:** Logout removes the admin/customer session only. Product and settings arrays remain in localStorage, so they remain for the same browser after logging back in.
- **Other devices:** No. Other browsers, devices, or visitors do not share this localStorage.
- **Current limitations:** Changes are temporary to the device/browser profile; private browsing, clearing site data, or using another browser loses or isolates updates. There is no server-side source of truth, authorization, synchronization, or database.
- **Recommended solution:** Implement a backend/API and database for products and settings, return the public catalog from the API, and retain localStorage only as optional cache. Add server-side validation and authenticated admin write endpoints.

## Summary
- Completed tasks: 1-9 implementation tasks and Task 10 investigation.
- Not completed: No implementation task was left unfinished.
- Tests:
  - `npm run build`: Passed.
  - Source searches: Passed for incorrect English/Arabic brand names and old addresses.
  - Asset and gallery mapping checks: Passed.
- Remaining issues:
  - There is no in-app theme switch, so the favicon follows system theme preference.
  - Browser automation was unavailable for visual hover, scroll, and timer verification.

## TASK 11 — Arabic Logo Replacement
- Status: Completed with approved SVG assets
- Files modified:
  - `src/assets/logo/logo-arabic-beige.svg`
  - `src/assets/logo/logo-arabic-burgundy.svg`
  - `src/components/Header.jsx`
  - `src/components/Footer.jsx`
  - `src/components/CinematicIntro.jsx`
- Assets used:
  - `Logo/Logo_Beige/Asset 11.svg` from the supplied archive for beige Arabic logo.
  - `Logo/Logo_Burgundy/Asset 2.svg` from the supplied archive for burgundy Arabic logo.
- Locations updated:
  - Header: burgundy at the top and beige after scrolling onto burgundy, retaining the existing cross-fade.
  - Footer: beige Arabic logo.
  - Intro screen: beige Arabic logo when Arabic is active; existing English logo remains for English.
- Verification:
  - Inspected the supplied SVGs and confirmed they are Arabic wordmarks with the intended light/dark variants.
  - Updated dimensions to match their `viewBox` aspect ratio; existing `w-auto` and `object-contain` sizing remains.
  - Confirmed English logo imports and rendering branches are unchanged.
- Issues:
  - The archive supplied SVGs rather than the named PNGs. The user approved using the SVGs.

## TASK 12 — Admin Dashboard Product Images
- Status: Completed
- Files modified:
  - `src/context/BrandContext.jsx`
  - `src/pages/AdminDashboardPage.jsx`
- Product image mappings updated:
  - Existing localStorage images for the six products with known legacy seed images are migrated to that product's own `detailImages[0]`.
  - The migration only replaces missing or known legacy default image paths; other saved/admin-selected image paths are preserved.
  - The Admin Dashboard continues to display and edit `product.image`. The public page uses the corresponding `detailImages[0]`; the current seed mapping ties both references to the same primary product image.
  - Product images are resolved from each stable product ID. Correction: `prod-deira-tote` uses `src/assets/images/bag_tote_signature_1795087225085.jpg`; its previous positional `product-1/image-1.jpg` mapping showed an olive satchel rather than the described burgundy-trimmed tote.
  - Other seed mappings, shared through `src/data/seedData.js`, remain unchanged:
    - `prod-nile-crossbody` → `product-2/image-1.jpg`
    - `prod-fayoum-wallet` → `product-3/image-1.jpg`
    - `prod-oasis-clutch` → `product-4/image-1.jpg`
    - `prod-senoures-satchel` → `product-5/image-1.jpg`
    - `prod-karmah-cardholder` → `product-6/image-1.jpg`
    - `prod-horus-clutch` → `product-7/image-1.jpg`
    - `prod-nile-banner-cardholder` → `product-8/image-1.jpg`
    - `prod-fayoum-palm-wallet` → `product-9/image-1.jpg`
- Verification:
  - Confirmed all nine product folders contain exactly two image files.
  - Confirmed the Deira tote's dashboard image, public card image, and detail gallery resolve to the same verified tote asset. The remaining product mappings are unchanged.
  - Verified the legacy replacement list covers only the six prior default image sources; manual/custom image values are retained.
  - `npm run build` completed successfully.
- Issues:
  - Browser automation was unavailable, so no interactive dashboard session or manual refresh was run. The existing localStorage key and persistence mechanism are unchanged.

## TASK 13 — Qerwiah Brand Intro Experience
- Status: Completed
- Files inspected:
  - `src/components/CinematicIntro.jsx`
  - `src/App.jsx`
  - `src/main.jsx`
  - `src/context/BrandContext.jsx`
  - `src/data/translations.js`
  - `src/index.css`
  - Arabic and English logo assets under `src/assets/logo/`
  - `package.json`
- Files modified:
  - `src/components/CinematicIntro.jsx`
  - `src/components/CinematicIntro.css`
  - `src/config/introConfig.js`
  - `WEBSITE_CHANGELOG.md`
- Logo asset used:
  - `src/assets/logo/logo-arabic-beige.svg`, the approved official Arabic beige wordmark asset previously identified from the supplied logo archive.
- Animation implementation:
  - Replaced the previous sweeping line with three restrained organic SVG fiber paths using native CSS stroke-draw and settling animations.
  - The Arabic logo fades and subtly scales into view above the optional configured tagline.
  - The existing smooth overlay exit and once-per-session behavior are preserved; the intro remains approximately 3.3 seconds, or 1.1 seconds with reduced motion.
- Tagline configuration:
  - Added `src/config/introConfig.js`. The tagline is omitted when disabled or blank and can be changed without editing the intro component.
- Skip Intro behavior:
  - Kept the localized skip label, added a comfortable tap target and visible keyboard focus, and guarded against repeated dismissals.
- Responsive verification:
  - Added viewport-aware logo and thread sizing, compact landscape adjustments, safe-area spacing, and reduced-motion styling.
  - No dedicated asynchronous application loading state exists; the React application renders its pages and local data immediately behind the intro overlay.
- Build result:
  - `npm run build` passed. Vite reported its existing `__dirname` config-loader warning and a bundle-size advisory; neither prevented the build.
- Remaining issues:
  - Browser automation is not installed/available in this workspace, so the opening animation, skip click, and viewport layouts were verified by implementation and production compilation rather than a live browser/device pass.

## TASK 14 — Owner Account Email Replacement
- Status: Completed for the existing local demo authentication only
- Account record:
  - Updated the seeded Owner account `admin-founder-1` to `hager.tayea1810@gmail.com`; non-Owner accounts are unchanged.
  - On startup, migrate only the stored record with ID `admin-founder-1` to the new email and active Owner role. If that record is missing from stored admin data, restore only the seeded Owner record without replacing other accounts.
  - Existing admin sessions are accepted only when their stored email matches the current account email, which expires a session still carrying the old Owner email.
- Password setup:
  - The seeded Owner no longer contains a plaintext password.
  - The login page exposes a one-time Owner password setup form while the Owner record has no supported password hash. It does not ask for the previous password; the new masked password must be entered twice and must contain at least 12 characters.
  - The setup stores a per-password random 16-byte salt and PBKDF2-HMAC-SHA-256 hash (310,000 iterations) in the Owner record, deletes the Owner record's legacy plaintext `password` property, signs the Owner in, and then redirects to the dashboard. Admin passwords for other accounts are not modified.
- Authentication limitations:
  - Admin accounts, password hashes, and sessions are managed client-side in browser `localStorage`; there is no authentication provider, backend, database, or server-side authorization in this project.
  - Password hashing protects against direct plaintext disclosure of this Owner password in localStorage, but cannot make a frontend-only system secure: users can alter local storage or client code, and the Owner setup link is not identity-verified. Existing non-Owner passwords remain in their prior local/demo format. Do not reuse a sensitive password; use server-side authentication before production.
- Verification:
  - `npm run build` passed. The existing login form accepts the new Owner account after setup; no password is supplied in source code or chat.

## TASK 15 — Product One Images, English Price Formatting & Crafting Time
- Status: Completed
- Files modified:
  - `src/data/seedData.js`
  - `src/context/BrandContext.jsx`
  - `src/pages/ProductsPage.jsx`
  - `src/components/ProductDetailModal.jsx`
  - `src/components/home/FeaturedProductsSection.jsx`
  - `src/utils/productFormatters.js`
  - `WEBSITE_CHANGELOG.md`
- Assets used:
  - Uploaded archive `Product_1.zip` inspected and extracted to `src/assets/images/products/product-1/`:
    - First Image: `Artboard 2.jpg` (248,405 bytes, SHA256 matches existing `image-1.jpg`).
    - Second Image: `Artboard 17.jpg` (206,132 bytes, SHA256 matches existing `image-2.jpg`).
- Product One Image Integration:
  - Connected `prod-deira-tote` directly to `PRODUCT_DETAIL_GALLERIES[0]`, with First Image as primary thumbnail and Second Image as hover/gallery image.
  - Removed the `isOriginalSingleImageCard` override in `ProductsPage.jsx`. Card #1 now uses the exact same styling, dimensions, aspect ratio, and 700ms cross-fade transition as reference Cards #2 and #3.
  - In `ProductDetailModal.jsx`, removed the automatic 4-second interval timer. The gallery operates completely manually with previous/next buttons and active dot indicators, and resets to First Image upon opening another product.
  - In Admin Dashboard, primary thumbnail resolves from the shared `product.image` (First Image).
  - The other eight products retain their original assets and mappings.
- English Price Formatting:
  - Created reusable formatting utility `formatProductPrice` in `src/utils/productFormatters.js`.
  - Displays numerical digits in English with comma separators and `EGP` currency (e.g. `3,850 EGP`, `850 EGP`, `2,000 EGP`).
  - Applied across Products Page cards, Home Page featured cards, and Product Details modal.
  - Wrapped with `dir="ltr"` and `tabular-nums` to ensure stable bidirectional rendering in Arabic RTL layouts.
  - Stored numeric values and inquiry states are preserved.
- Crafting Time Indicator:
  - Added crafting duration indicator with small `<Clock />` icon beside product names across Home Page and Products Page cards.
  - Styled with brand muted gold accents (`#DFAC6D` on light cards, `#FEDEA3` on dark cards) without overwhelming the product name.
  - Displays duration according to site language conventions (`28 ساعة` in Arabic, `28 hrs` in English).
  - Verified all nine products have existing crafting duration data in `seedData.js`. If missing or invalid, indicator is hidden.
- Verification:
  - `npm run build` completed successfully.

## TASK 16 — Loading Screen Tagline Text Update
- Status: Completed
- Files modified:
  - `src/config/introConfig.js`
  - `WEBSITE_CHANGELOG.md`
- Changes made:
  - Updated the Loading Screen tagline text in `src/config/introConfig.js` from `من روح الريف نصنع حكاية جديدة` to `حكاية أصلها الطبيعة`.
  - All existing logo visuals, typography style, size, color, alignment, position, animation timing, and intro transitions remain untouched.
- Verification:
  - `npm run build` completed successfully.

## TASK 17 — Home Page Product Card Content-Only Update
- Status: Completed
- Files modified:
  - `src/components/home/FeaturedProductsSection.jsx`
  - `WEBSITE_CHANGELOG.md`
- Changes made:
  - Removed product price and product description from the Home Page product cards.
  - Placed the product name and crafting time in the same row below the image.
  - Kept crafting time indicator visible only when verified data exists, retaining the clock icon and muted gold accent.
  - Preserved the existing favorite button and product exploration navigation button.
  - Preserved all card dimensions, hover-to-expand interactions, transitions, and animations.
- Verification:
  - `npm run build` completed successfully.

