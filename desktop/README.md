# MindMyMap Desktop

Electron desktop app for MindMyMap - free, open-source, ad-free mind mapping.

## Requirements

- Node.js >= 18
- npm >= 9
- A running MindMyMap server

## Development

    npm install
    npm start

## Build

    npm run build:win      # Windows NSIS installer (x64 + arm64)
    npm run build:mac      # macOS DMG (x64 + arm64)
    npm run build:linux    # Linux AppImage + deb + rpm
    npm run build:all      # All platforms

Packaged outputs land in `dist/`.

## Configuration

**Server URL:** File → Server → Change Server URL…

Default: `http://localhost:8000/` (points to a local MindMyMap instance).
Change to your self-hosted server URL and it persists between launches.

## License

AGPL-3.0 - Based on Digimindmap by La Digitale. Inspired by GitMind.
