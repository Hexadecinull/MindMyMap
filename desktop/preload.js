/**
 * MindMyMap Desktop — Electron preload
 * Exposes a minimal, safe API to the renderer via contextBridge.
 * AGPL-3.0 | Based on Digimindmap by La Digitale | Inspired by GitMind
 */

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mmDesktop', {
  // Server management
  getServer: ()      => ipcRenderer.invoke('get-server-url'),
  setServer: (url)   => ipcRenderer.invoke('set-server-url', url),

  // Theme (system | light | dark)
  getTheme: ()       => ipcRenderer.invoke('get-theme'),
  setTheme: (theme)  => ipcRenderer.invoke('set-theme', theme),

  // Platform info
  platform: process.platform,

  // Is this the desktop app?
  isDesktop: true
})
