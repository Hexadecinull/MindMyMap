const ext = (typeof browser !== 'undefined') ? browser : chrome
const DEFAULT_SERVER = 'https://mindmymap.ct.ws/'

ext.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== 'complete' || !tab.url) return
  const match = tab.url.match(/#\/m\/([a-zA-Z0-9_-]+)/)
  if (!match) return

  const mapId = match[1]
  const mapName = tab.title ? tab.title.replace(/ - MindMyMap$/, '').trim() : mapId

  ext.storage.sync.get(['recentMaps'], res => {
    let maps = res.recentMaps || []
    maps = maps.filter(m => m.id !== mapId)
    maps.unshift({ id: mapId, name: mapName, visitedAt: Date.now() })
    if (maps.length > 20) maps = maps.slice(0, 20)
    ext.storage.sync.set({ recentMaps: maps })
  })
})

ext.runtime.onInstalled.addListener(() => {
  ext.contextMenus.create({
    id: 'open-mindmymap',
    title: 'Open MindMyMap',
    contexts: ['action']
  })
})

ext.contextMenus.onClicked.addListener(info => {
  if (info.menuItemId !== 'open-mindmymap') return
  ext.storage.sync.get(['serverUrl'], res => {
    ext.tabs.create({ url: res.serverUrl || DEFAULT_SERVER })
  })
})
