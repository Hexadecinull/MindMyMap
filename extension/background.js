/**
 * MindMyMap Browser Extension — Background service worker
 * AGPL-3.0 | Based on Digimindmap by La Digitale | Inspired by GitMind
 */

const DEFAULT_SERVER = 'https://mindmymap.ct.ws/'

// Track recently visited maps by listening to tab URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete' || !tab.url) return

  // Detect navigation to a map URL pattern: <server>/#/m/<id>
  const hashMatch = tab.url.match(/#\/m\/([a-zA-Z0-9_-]+)/)
  if (!hashMatch) return

  const mapId = hashMatch[1]
  const mapName = tab.title ? tab.title.replace(/ — MindMyMap$/, '').trim() : mapId

  chrome.storage.sync.get(['recentMaps'], res => {
    let maps = res.recentMaps || []
    // Remove if already present (dedup), then prepend
    maps = maps.filter(m => m.id !== mapId)
    maps.unshift({ id: mapId, name: mapName, visitedAt: Date.now() })
    // Keep max 20 entries
    if (maps.length > 20) maps = maps.slice(0, 20)
    chrome.storage.sync.set({ recentMaps: maps })
  })
})

// Right-click context menu: quick open
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'open-mindmymap',
    title: 'Open MindMyMap',
    contexts: ['action']
  })
})

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'open-mindmymap') {
    chrome.storage.sync.get(['serverUrl'], res => {
      const url = res.serverUrl || DEFAULT_SERVER
      chrome.tabs.create({ url })
    })
  }
})
