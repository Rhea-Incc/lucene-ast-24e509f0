## Plan

### 1. Replace the logo with the new `002.png` mark
- Copy `user-uploads://002.png` → `src/assets/lucen-logo.png` (overwrite reference, keep WebP fallback unused).
- Update both consumers to import the new asset:
  - `src/components/Header.tsx`
  - `src/components/FooterSystem.tsx`
- Also refresh the brand mark in `index.html`:
  - Copy a smaller copy → `public/favicon.png` and replace `<link rel="icon" href="/favicon.ico">` with the PNG (delete `public/favicon.ico`).
  - Replace `og:image` / `twitter:image` and JSON-LD `logo` URLs with the published `/favicon.png` on `https://lucene-ast.lovable.app`.

### 2. Integrate the uploaded media

Copy uploads into the project:
- `user-uploads://Scale-your-message_1.mp4` → `public/videos/scale-your-message.mp4`
- `user-uploads://Captivate-passersby-with-3D-holographic-billboards.-.mp4` → `public/videos/captivate-passersby.mp4`
- `user-uploads://Give-your-outdoor-advertising.mp4` → `public/videos/outdoor-advertising.mp4`
- `user-uploads://Affinity-shoe-ad.jpg` → `src/assets/showcase-shoe.jpg`
- `user-uploads://02-1.jpg` → `src/assets/showcase-automotive.jpg`
- `user-uploads://lounge.png` → `src/assets/showcase-lounge.jpg` (re-encoded)
- `user-uploads://holo-monument.png` → `src/assets/showcase-monument.jpg`
- `user-uploads://holo-plane.png` → `src/assets/showcase-plane.jpg`

Wire them into the existing surfaces (no new sections):
- **`MediaShowcase.tsx`** — replace the placeholder radial-gradient panel and the two stacked panels with real `LazyVideo` (`scale-your-message.mp4`, `captivate-passersby.mp4`, `outdoor-advertising.mp4`) using the new shoe/lounge stills as posters.
- **`UseCasesStream.tsx`** — swap the most relevant entries to use the new videos/posters:
  - Automotive Showroom → poster `showcase-automotive.jpg`
  - Airport Brand Campaigns → video `captivate-passersby.mp4`, poster `showcase-plane.jpg`
  - DOOH / outdoor → video `outdoor-advertising.mp4`
  - Airline experience → poster `showcase-plane.jpg`
- **`IndustryPage.tsx`** — use the new stills as posters for `retail-luxury` (shoe), `automotive` (BMW), `airlines` (plane), `hospitality` (lounge), `events-exhibitions` (monument).
- **`Services.tsx`** — set `scale-your-message.mp4` as the Holographic Systems hero video.

All videos go through the existing `LazyVideo` (IntersectionObserver + `preload="metadata"`) so the perf budget is preserved.

### 3. Technical details

- The logo image is a sketch on a white background — render it as-is inside the existing header/footer glass containers (current sizing is `h-8`/`h-10`), no chromatic inversion. If it looks too bright on dark glass we can revisit.
- All new video files keep the same `LazyVideo` props pattern; no API changes.
- Posters fix the LCP/CLS hit on the new videos.
- No backend/data/auth changes.

### Files touched
- created: `public/favicon.png`, `public/videos/scale-your-message.mp4`, `public/videos/captivate-passersby.mp4`, `public/videos/outdoor-advertising.mp4`, `src/assets/lucen-logo.png`, `src/assets/showcase-shoe.jpg`, `src/assets/showcase-automotive.jpg`, `src/assets/showcase-lounge.jpg`, `src/assets/showcase-monument.jpg`, `src/assets/showcase-plane.jpg`
- deleted: `public/favicon.ico`
- edited: `index.html`, `src/components/Header.tsx`, `src/components/FooterSystem.tsx`, `src/components/MediaShowcase.tsx`, `src/components/UseCasesStream.tsx`, `src/pages/IndustryPage.tsx`, `src/pages/Services.tsx`
