# Arosha Pattnayak, portfolio

A single-page portfolio built with React, Vite and Motion. Content lives in one
file so the site can be updated without touching components.

## Edit content

- `src/data/profile.js` holds the intro, principles, AI work, experience,
  education and skills. Every outcome is written as
  "Accomplished X, as measured by Y, by doing Z."
- `src/pages/CaseNarthana.jsx` and `src/pages/CaseForge.jsx` are the two case
  studies. Each is plain JSX prose inside `Chapter` blocks.
- `public/Arosha_Pattnayak_Resume.pdf` is the file the "Download résumé"
  buttons serve. Replace it to update the résumé.

## Run locally

```bash
npm install
npm run dev
```

Opens on http://localhost:5180.

## Build

```bash
npm run build
```

Outputs to `dist/`. Set `BASE_PATH` when the site is served from a
sub-path, for example `BASE_PATH=/portfolio/ npm run build`.

## Deploy to GitHub Pages

This folder sits inside the `dance-app` repository, which already uses its own
GitHub Pages site. A repository can only have one Pages site, so the portfolio
deploys to a separate repository named `aroshapattnayak.github.io`, which
GitHub serves at the root of https://aroshapattnayak.github.io.

One-time setup:

1. Create an empty public repository called `aroshapattnayak.github.io`.
2. Create a fine-grained personal access token with **Contents: read and
   write** on that repository.
3. In the `dance-app` repository, add the token as an Actions secret named
   `PORTFOLIO_DEPLOY_TOKEN`.

After that, every push to `main` that touches `portfolio/` runs
`.github/workflows/deploy-portfolio.yml`, which builds this folder and pushes
`dist/` to the `main` branch of `aroshapattnayak.github.io`. Enable Pages on
that repository (Settings → Pages → Deploy from branch `main`, folder `/`) the
first time.

To point a custom domain at it later, add a `CNAME` file to `public/`.

## Design notes

- Canvas `#FAFAF7`, ink `#14142B`, one accent `#2D4BFF`. Amber and ember are
  reserved for the two case-study worlds.
- One typeface, Bricolage Grotesque, at display and text optical sizes.
- Motion answers the viewer's actions: pressable buttons with a hard bottom
  edge, springy tab and accordion changes. The only self-running motion is the
  Quick Pay demo in the hero, which pauses on hover and renders a static frame
  when the viewer prefers reduced motion.
- Names in the demo are fictional.
