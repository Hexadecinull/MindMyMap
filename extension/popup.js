const ext = (typeof browser !== 'undefined') ? browser : chrome
const DEFAULT_SERVER = 'https://mindmymap.ct.ws/'

async function getServer () {
  return new Promise(resolve => {
    ext.storage.sync.get(['serverUrl'], res => resolve(res.serverUrl || DEFAULT_SERVER))
  })
}

async function getRecentMaps () {
  return new Promise(resolve => {
    ext.storage.sync.get(['recentMaps'], res => resolve(res.recentMaps || []))
  })
}

async function saveRecentMaps (maps) {
  return new Promise(resolve => ext.storage.sync.set({ recentMaps: maps }, resolve))
}

async function checkServer (url) {
  try {
    const ctrl = new AbortController()
    setTimeout(() => ctrl.abort(), 4000)
    await fetch(url, { signal: ctrl.signal, mode: 'no-cors' })
    return true
  } catch {
    return false
  }
}

function escapeHtml (str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function removeMap (id) {
  const maps = await getRecentMaps()
  await saveRecentMaps(maps.filter(m => m.id !== id))
  init()
}

async function init () {
  const serverUrl = await getServer()
  const urlInput  = document.getElementById('server-url')
  const openBtn   = document.getElementById('open-app')
  const mapList   = document.getElementById('map-list')
  const statusDot = document.getElementById('status-dot')
  const statusText= document.getElementById('status-text')

  urlInput.value = serverUrl
  openBtn.href   = serverUrl

  openBtn.addEventListener('click', e => {
    e.preventDefault()
    ext.tabs.create({ url: serverUrl })
    window.close()
  })

  document.getElementById('save-server').addEventListener('click', async () => {
    const url = urlInput.value.trim().replace(/\/?$/, '/')
    ext.storage.sync.set({ serverUrl: url }, () => {
      openBtn.href = url
      checkConnectivity(url)
    })
  })

  async function checkConnectivity (url) {
    statusDot.className = 'status-dot'
    statusText.textContent = 'Checking…'
    const ok = await checkServer(url)
    statusDot.className = ok ? 'status-dot' : 'status-dot offline'
    statusText.textContent = ok ? 'Server reachable' : 'Server unreachable'
  }
  checkConnectivity(serverUrl)

  const maps = await getRecentMaps()
  if (!maps.length) return

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
      <span class="map-del" data-id="${map.id}">✕</span>`
    item.addEventListener('click', e => {
      if (e.target.classList.contains('map-del')) {
        e.preventDefault()
        removeMap(map.id)
        return
      }
      e.preventDefault()
      ext.tabs.create({ url: serverUrl + '#/m/' + map.id })
      window.close()
    })
    mapList.appendChild(item)
  })
}

document.addEventListener('DOMContentLoaded', init)
