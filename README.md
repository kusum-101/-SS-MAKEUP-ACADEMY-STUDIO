# SS Makeup Academy & Studio — Website Concept

A lightweight one-page static website (HTML/CSS/vanilla JS, no build step, no dependencies) prepared as a sales demo.
Research notes and items to confirm: see [BUSINESS_RESEARCH.md](BUSINESS_RESEARCH.md).

## Structure

```
index.html            One-page site (header, hero, about, services, academy, gallery, reviews, contact, footer, WhatsApp button)
credits.html          Photo credits (Unsplash placeholders)
css/styles.css        All styles (colour tokens at the top)
js/config.js          ← phone, WhatsApp number, messages, Maps and Instagram links: edit here
js/main.js            Wires links from config, mobile menu, scroll reveal
assets/img/           Optimised images  ·  assets/favicon.svg
scripts/check.mjs     Pre-deploy checks (files, anchors, alt text, image sizes, WhatsApp encoding)
netlify.toml          Netlify config (publishes the root folder, runs checks)
```

## Run locally

```bash
npx http-server -p 8080      # or: python -m http.server 8080
# open http://localhost:8080
node scripts/check.mjs       # run the checks
```

You can also open `index.html` directly in a browser.

## WhatsApp configuration

Edit `js/config.js`:
- `whatsappNumber`: country code + number, digits only (`919999619414`). **Owner must confirm.**
- `messages`: pre-filled texts. Each button picks one via `data-wa="default|course|bridal|party|engagement|hair"`.
  Links are built as `https://wa.me/<number>?text=<encodeURIComponent(message)>`, so the visitor reviews the message and sends it themselves.

## Before publishing on Netlify

1. Confirm everything listed in BUSINESS_RESEARCH.md §9 with the owner.
2. Replace the Unsplash images in `assets/img/` (keep the file names, or update `index.html`), then remove the demo banner (`.demo-bar`) and the gallery note.
3. Set `instagramUrl` in `js/config.js` if an official profile exists.
4. Once the domain is known, make the `og:image` and `canonical` URLs absolute in `index.html`.
5. Deploy: drag the folder into Netlify Drop, or connect a Git repo (`netlify.toml` is already set up). Netlify runs `node scripts/check.mjs` as the build command.
