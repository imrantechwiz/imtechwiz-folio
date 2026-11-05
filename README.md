# imran.khan — Portfolio

Playful, tactile, dark. **React 18 + Vite + React Router + Framer Motion**, hand-written CSS, no UI library, no WebGL.

## Run

```bash
npm install      # first time only
npm run dev      # http://localhost:5173 (live reload)
npm run build    # → dist/ (+ dist/404.html for GitHub Pages deep links)
npm run preview  # serve the build
```

## What's on the page

| Piece | Where | Notes |
| --- | --- | --- |
| `0%` loader → "CLICK TO ENTER" tile wall | `components/Intro.jsx` | Once per session. `TILE` = tile size. Skipped for bots/reduced-motion. |
| Purple dot cursor | `components/Cursor.jsx` | Grows over links/cards. Off on touch. |
| 3D Rubik's cube (hover to spin) | `components/Cube.jsx` | Pure CSS 3D — 27 cubelets, top layer twists every `TWIST_MS`, lime corner popped out, purple ball. Idle tumble + follows pointer over the hero. Size = `--cube` in `.cube-scene`. |
| Sound toggle (bottom-left) | `components/SoundToggle.jsx` + `lib/sound.js` | Web Audio synth, no files. Hover tick, click, sticker pop/drop, enter whoosh. Persisted in `localStorage`. |
| Company logos | `public/logos/` | `openfx.svg`, `harness.png`, `highradius.png` — paths in `data.js → companies[].logo`. |
| Floating parallax cubes | `components/FloatingCubes.jsx` | Per-section `items` array in `pages/Home.jsx` (`CUBES_WORK`, `CUBES_FUN`). |
| Tactile cards (offset purple shadow) | `.tcard` in `components.css` | Variants: `.lav` `.lime` `.purple` |
| Draggable sticker playground | `components/ContactPlayground.jsx` | `STICKERS` array: kind `open` / `app` / `pill` / `bolt` / `smile` / `flower` / `star`. Shown at the bottom of every page. |
| Mixed headings "Work *experience*" | `<Heading bold="Work" serif="experience" />` | `purple` prop colours the serif word. |

## Where to edit what

| Change… | File |
| --- | --- |
| **All copy, roles, wins, skills, links** | `src/data.js` |
| Hero headline | `heroLines` in `data.js` — array of lines; `{serif:true}` = the purple italic word |
| Colours, fonts, radius, shadow | `src/styles/variables.css` |
| Component styles | `src/styles/components.css` |
| Nav links | `components/Nav.jsx` (`LINKS`) + `App.jsx` (`ROUTES`) |
| CV button | `public/Imran_Khan_CV.pdf` (path in `data.js → cv`) |
| Photo | drop `me.jpg` in `public/`, replace the initials in the `.avatar` div in `pages/Home.jsx` |

## Pages

`/` hero · work experience · things I've shipped · when I'm not testing · contact playground
`/experience` full timeline · `/skills` toolbox, certs, languages · `/education` schools, quiz trophies, publications · `/contact` form + playground

The contact form opens the visitor's mail client. To store messages, swap `submit` in `pages/Contact.jsx` for a Formspree / Web3Forms POST.

## Deploy (GitHub Pages)

```bash
npm run deploy   # builds with base /imtechwiz-folio/ and pushes the gh-pages branch
```

Root domain / Vercel / Netlify: plain `npm run build`, framework = Vite.
