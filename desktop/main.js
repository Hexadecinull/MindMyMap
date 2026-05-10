/**
 * MindMyMap Desktop - Electron main process
 * AGPL-3.0 | Based on Digimindmap by La Digitale | Inspired by GitMind
 */

const { app, BrowserWindow, Menu, shell, ipcMain, nativeTheme } = require('electron')
const path = require('path')
const Store = require('electron-store')

// ── Persistent settings ──
const store = new Store({
  defaults: {
    windowBounds: { width: 1280, height: 800 },
    serverUrl: 'http://localhost:8000/',
    theme: 'system'
  }
})

let mainWindow = null

function createWindow () {
  const { width, height } = store.get('windowBounds')

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 800,
    minHeight: 560,
    title: 'MindMyMap',
    backgroundColor: '#0F0C29',
    // Show window icon on Linux / Windows
    icon: path.join(__dirname, 'assets', process.platform === 'win32' ? 'icon.ico' : 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: true
    },
    // Frameless would look nicer, but keep default for accessibility/resize
    show: false
  })

  // ── Load app ──
  const serverUrl = store.get('serverUrl')
  mainWindow.loadURL(serverUrl)

  // Show once ready to avoid flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
  })

  // ── Persist window size ──
  mainWindow.on('resize', saveBounds)
  mainWindow.on('move',   saveBounds)

  // Open external links in the system browser, not in Electron
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(serverUrl)) {
      shell.openExternal(url)
      return { action: 'deny' }
    }
    return { action: 'allow' }
  })

  mainWindow.on('closed', () => { mainWindow = null })
}

function saveBounds () {
  if (mainWindow && !mainWindow.isMaximized()) {
    store.set('windowBounds', mainWindow.getBounds())
  }
}

// ── App menu ──
function buildMenu () {
  const isMac = process.platform === 'darwin'

  const template = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'New Mind Map',
          accelerator: 'CmdOrCtrl+N',
          click () { mainWindow.webContents.executeJavaScript("window.location.hash = '/'") }
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    { role: 'editMenu' },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' },
        { role: 'toggleDevTools' }
      ]
    },
    {
      label: 'Server',
      submenu: [
        {
          label: 'Change Server URL…',
          click () {
            // Simple prompt via renderer
            mainWindow.webContents.executeJavaScript(`
              (function() {
                const url = prompt('MindMyMap server URL:', '${store.get('serverUrl')}')
                if (url) window.mmDesktop.setServer(url)
              })()
            `)
          }
        },
        {
          label: 'Current: ' + store.get('serverUrl'),
          enabled: false
        }
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'GitHub Repository',
          click () { shell.openExternal('https://github.com/mindmymap/mindmymap') }
        },
        {
          label: 'Report an Issue',
          click () { shell.openExternal('https://github.com/mindmymap/mindmymap/issues') }
        },
        { type: 'separator' },
        {
          label: 'About MindMyMap',
          click () {
            const { dialog } = require('electron')
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About MindMyMap',
              message: 'MindMyMap Desktop',
              detail: [
                `Version: ${app.getVersion()}`,
                'License: AGPL-3.0',
                '',
                'Based on Digimindmap by La Digitale.',
                'Inspired by GitMind.',
                '',
                'Free. Open source. No ads. Forever.'
              ].join('\n')
            })
          }
        }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

// ── IPC handlers ──
ipcMain.handle('get-server-url', () => store.get('serverUrl'))
ipcMain.handle('set-server-url', (_event, url) => {
  store.set('serverUrl', url)
  mainWindow.loadURL(url)
  buildMenu() // refresh "Current:" label
})
ipcMain.handle('get-theme', () => store.get('theme'))
ipcMain.handle('set-theme', (_event, theme) => {
  store.set('theme', theme)
  nativeTheme.themeSource = theme
})

// ── Lifecycle ──
app.whenReady().then(() => {
  nativeTheme.themeSource = store.get('theme')
  buildMenu()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
