# 🧠 MindMyMap

[![CI](https://github.com/mindmymap/mindmymap/actions/workflows/ci.yml/badge.svg)](https://github.com/mindmymap/mindmymap/actions/workflows/ci.yml)
[![Deploy](https://github.com/mindmymap/mindmymap/actions/workflows/deploy.yml/badge.svg)](https://github.com/mindmymap/mindmymap/actions/workflows/deploy.yml)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL--3.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

> **Free. Open source. Ad-free. No account needed. Forever.**

MindMyMap is a lightweight, self-hostable mind mapping tool with a GitMind-inspired interface,
built on top of [Digimindmap by La Digitale](https://ladigitale.dev/digimindmap/).
It exists because GitMind is undergoing significant negative changes.
MindMyMap fills that gap - permanently.

---

## ✨ Feature comparison

| Feature                  | MindMyMap | GitMind Free |
|--------------------------|:---------:|:------------:|
| Completely free          | ✅        | ⚠️ Limited  |
| No ads                   | ✅        | ❌           |
| No account needed        | ✅        | ❌           |
| Open source (AGPL-3.0)   | ✅        | ❌           |
| Self-hostable            | ✅        | ❌           |
| Export PNG / text / .dgm | ✅        | ✅           |
| Shareable link + QR code | ✅        | ✅           |
| Embed (iframe)           | ✅        | ✅           |
| Rich node notes          | ✅        | ✅           |
| Emoji nodes              | ✅        | ✅           |
| Keyboard shortcuts       | ✅        | ✅           |
| Desktop app (Electron)   | ✅        | ✅           |
| Mobile (PWA)             | ✅        | ✅           |
| Browser extension        | ✅        | ❌           |
| EN / FR / IT interface   | ✅        | partial      |

---

## 🗂 Monorepo structure

```
mindmymap/
├── web/               Vue 3 + Vite frontend + PHP/SQLite backend
├── desktop/           Electron desktop wrapper
├── extension/         Chrome MV3 browser extension
├── .github/
│   └── workflows/
│       ├── ci.yml       Lint + build on every push / PR
│       ├── deploy.yml   Auto-deploy to InfinityFree on push to main
│       └── release.yml  Build all packages on version tag
├── .gitignore
├── .gitattributes
└── README.md
```

---

## 🚀 Self-hosting on InfinityFree

InfinityFree gives you a free subdomain (`mindmymap.ct.ws`) with PHP 8
and Apache - perfect for MindMyMap.

### One-time setup

1. **Create a free account** at [infinityfree.com](https://infinityfree.com)
2. **Create a hosting account** → note your FTP credentials and subdomain
3. **Fork this repository** on GitHub
4. **Add repository secrets** (Settings → Secrets and variables → Actions):

   | Secret | Value |
   |--------|-------|
   | `FTP_HOST` | FTP hostname from InfinityFree panel (e.g. `ftpupload.net`) |
   | `FTP_USER` | Your FTP username |
   | `FTP_PASS` | Your FTP password |
   
6. **Push to `main`** - the Deploy workflow builds and FTP-uploads automatically.
7. **On the server**, copy `.env.example` → `.env` via the InfinityFree file manager
   (or upload it via FTP). The SQLite database creates itself on the first request.

### Manual deploy (without CI)

```bash
cd web
npm ci
echo "AUTHORIZED_DOMAINS=" > .env
npm run build:dist
# Upload the contents of web/dist/ to your htdocs/ via FTP
```

---

## 💻 Local development

```bash
# Web app
cd web
npm ci
cp .env.example .env
npm run dev        # Vite dev server on :8080, proxies /inc/* to :8000

# In a separate terminal - PHP backend
cd web
php -S 127.0.0.1:8000
```

---

## 🖥 Desktop app

The Electron wrapper connects to any MindMyMap server (local or remote).

```bash
cd desktop
npm ci
npm start                # run in development

npm run build:linux      # AppImage + deb + rpm
npm run build:win        # Windows NSIS installer
npm run build:mac        # macOS DMG
npm run build:all        # all platforms
```

On first launch set your server URL: **File → Server → Change Server URL…**

---

## 📱 Mobile (PWA)

MindMyMap ships a `manifest.json` - no app store needed:

1. Open your MindMyMap URL in Chrome (Android) or Safari (iOS)
2. Tap **Add to Home Screen**
3. Done - it launches full-screen like a native app

---

## 🧩 Browser extension (Chrome / Edge / Brave)

```
extension/
├── manifest.json   Chrome MV3
├── popup.html/js   Quick-open + recent maps
├── background.js   Auto-tracks visited maps
└── options.html    Settings page
```

**Install (dev / self-hosted):**

1. Open `chrome://extensions`
2. Enable **Developer mode**
3. **Load unpacked** → select the `extension/` folder
4. Click the extension icon → enter your server URL

---

## ⌨️ Keyboard shortcuts

| Action | Keys |
|--------|------|
| Pan map | `Z` `Q` `S` `D` |
| Select node | Arrow keys |
| Select root | `Home` |
| Select parent | `Backspace` |
| Insert child | `Insert` |
| Insert sibling | `*` |
| Move node | `Ctrl` + `↑` / `↓` |
| Flip side | `Ctrl` + `←` / `→` |
| Delete node | `Delete` |
| Edit text | `Space` / `F2` |
| Bold / Italic / Underline | `Ctrl+B` / `Ctrl+I` / `Ctrl+U` |
| Undo / Redo | `Ctrl+Z` / `Ctrl+Y` |
| Notes panel | `Ctrl+M` |
| Zoom | `+` / `−` |
| Collapse / expand | `F` |

---

## 🔐 Privacy

- **No tracking** - zero analytics, zero telemetry
- **No ads** - ever
- **No account** - maps protected by a secret Q&A
- **Self-hosted** - your data lives on your server only

---

## 🤝 Contributing

```bash
# 1. Fork → clone
git clone https://github.com/YOUR_USERNAME/mindmymap.git
cd mindmymap

# 2. Feature branch
git checkout -b feat/my-feature

# 3. Work, commit with conventional commits
git commit -m "feat(web): add template gallery"

# 4. Push + open a PR against main
git push origin feat/my-feature
```

Translations live in `web/src/lang/`. Adding a new language:
1. Copy `en.json` → `xx.json` (ISO 639-1 code)
2. Register it in `web/src/lang/index.js`
3. Add the button in `Home.vue` and `Editor.vue`

---

## 📜 CI / CD overview

| Workflow | Trigger | What it does |
|----------|---------|--------------|
| `ci.yml` | Every push / PR | ESLint, build check, manifest validate, npm audit |
| `deploy.yml` | Push to `main` | Build dist → FTP upload to InfinityFree → smoke test |
| `release.yml` | Push `v*.*.*` tag | Build Electron (Win/Mac/Linux) + extension zip → GitHub Release |

---

## ⚖️ License

**GNU Affero General Public License v3.0 (AGPL-3.0)**

See [LICENSE](./LICENSE) for full text.

---

## 🙏 Credits

- **[Digimindmap by La Digitale](https://ladigitale.dev/digimindmap/)** - the original AGPL-3.0 codebase this project is forked from. Thank you, Emmanuel ZIMMERT and the La Digitale team.
- **[GitMind](https://gitmind.com)** - the UI/UX that inspired MindMyMap's redesign.
- All upstream packages listed in `web/package.json` and `desktop/package.json`.

---

*MindMyMap - because mind mapping should always be free.*
