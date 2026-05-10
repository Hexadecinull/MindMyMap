# Contributing to MindMyMap

Thank you for considering a contribution! Here is everything you need to know.

---

## Development setup

```bash
git clone https://github.com/mindmymap/mindmymap.git
cd mindmymap

# Web app
cd web && npm ci && cp .env.example .env && npm run dev

# In another terminal - PHP dev server
cd web && php -S 127.0.0.1:8000
```

The Vite dev server runs on `:8080` and proxies `/inc/*` to the PHP server on `:8000`.

---

## Folder map

```
web/src/
  views/Home.vue      Landing page (GitMind-inspired dark hero)
  views/Editor.vue    Mind map editor (dark sidebar + white topbar)
  assets/css/style.css  All global styles (CSS custom properties)
  lang/en.json        English strings - add keys here first
  lang/fr.json        French strings
  lang/it.json        Italian strings

desktop/
  main.js             Electron main process
  preload.js          contextBridge API for the renderer

extension/
  popup.html/js       Extension popup
  background.js       Service worker (tracks recent maps)
  options.html        Settings page
```

---

## Branch strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production - auto-deploys to InfinityFree |
| `feat/*` | New features - open PR against `main` |
| `fix/*` | Bug fixes |
| `chore/*` | Maintenance (deps, CI, docs) |

---

## Commit style (Conventional Commits)

```
feat(web): add template gallery
fix(extension): correct recent-maps deduplication
chore(ci): pin Node version to 20
docs: update InfinityFree deploy instructions
```

---

## Adding a language

1. Copy `web/src/lang/en.json` → `web/src/lang/xx.json` (ISO 639-1 code)
2. Translate every value (keep all keys identical)
3. Register it in `web/src/lang/index.js`
4. Add the toggle button in `web/src/views/Home.vue` and `web/src/views/Editor.vue`
5. Open a PR - that's it!

---

## Pull request checklist

- [ ] `npm run lint` passes with 0 warnings in `web/`
- [ ] `npm run build:dist` succeeds in `web/`
- [ ] New UI strings added to all three language files
- [ ] No `.db`, `.env`, or `node_modules` committed
- [ ] PR description explains the *why*, not just the *what*

---

## License

By contributing you agree your changes will be licensed under **AGPL-3.0**.
