/**
 * MindMyMap Browser Extension — Popup script
 * AGPL-3.0 | Based on Digimindmap by La Digitale | Inspired by GitMind
 */

const DEFAULT_SERVER = 'https://mindmymap.ct.ws/'

async function getServer () {
  return new Promise(resolve => {
    chrome.storage.sync.get(['serverUrl'], res => {
      resolve(res.serverUrl || DEFAULT_SERVER)
    })
  })
}

async function getRecentMaps () {
  return new Promise(resolve => {
    chrome.storage.sync.get(['recentMaps'], res => {
      resolve(res.recentMaps || [])
    })
  })
}

async function saveRecentMaps (maps) {
  return new Promise(resolve => {
    chrome.storage.sync.set({ recentMaps: maps }, resolve)
  })
}

async function checkServer (url) {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 4000)
    const res = await fetch(url, { signal: controller.signal, mode: 'no-cors' })
    clearTimeout(timer)
    return true
  } catch {
    return false
  }
}

async function init () {
  const serverUrl = await getServer()
  const urlInput = document.getElementById('server-url')
  const openBtn = document.getElementById('open-app')
  const mapList = document.getElementById('map-list')
  const statusDot = document.getElementById('status-dot')
  const statusText = document.getElementById('status-text')

  urlInput.value = serverUrl
  openBtn.href = serverUrl

  // Open in tab
  openBtn.addEventListener('click', e => {
    e.preventDefault()
    chrome.tabs.create({ url: serverUrl })
    window.close()
  })

  // Save server
  document.getElementById('save-server').addEventListener('click', async () => {
    const url = urlInput.value.trim().replace(/\/?$/, '/')
    chrome.storage.sync.set({ serverUrl: url }, () => {
      openBtn.href = url
      checkConnectivity(url)
    })
  })

  // Server status
  async function checkConnectivity (url) {
    statusDot.className = 'status-dot'
    statusText.textContent = 'Checking…'
    const ok = await checkServer(url)
    statusDot.className = ok ? 'status-dot' : 'status-dot offline'
    statusText.textContent = ok ? 'Server reachable' : 'Server unreachable'
  }
  checkConnectivity(serverUrl)

  // Render recent maps
  const maps = await getRecentMaps()
  if (maps.length === 0) return

  mapList.innerHTML = ''
  maps.slice(0, 8).forEach(map => {
    const item = document.createElement('a')
    item.className = 'map-item'
    item.href = '#'
    item.title = map.name
    item.innerHTML = `
      <span class="map-icon">🗺️</span>
      <span class="map-name">${escapeHtml(map.name)}</span>
      <span class="map-id">${map.id.slice(0, 6)}</span>
      <span class="map-del" title="Remove from recent" data-id="${map.id}">✕</span>
    `
    item.addEventListener('click', e => {
      if (e.target.classList.contains('map-del')) {
        e.preventDefault()
        removeMap(map.id)
        return
      }
      e.preventDefault()
      chrome.tabs.create({ url: serverUrl + '#/m/' + map.id })
      window.close()
    })
    mapList.appendChild(item)
  })
}

async function removeMap (id) {
  const maps = await getRecentMaps()
  const filtered = maps.filter(m => m.id !== id)
  await saveRecentMaps(filtered)
  // Re-render
  init()
}

function escapeHtml (str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

document.addEventListener('DOMContentLoaded', init)
