/* eslint-disable */
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js')

self.skipWaiting()

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

const HOST = 'http://localhost:8000/'
const CHANNEL = new BroadcastChannel('sync-messages')

const BACKGROUND_SYNC_PLUGIN = new workbox.backgroundSync.BackgroundSyncPlugin('notes', {
  onSync: async function() {
    let entry
    while ((entry = await this.shiftRequest())) {
      try {
        await fetch(entry.request.clone())
      } catch (error) {
        await this.unshiftRequest(entry)
        throw new WorkboxError('queue-replay-failed', { name: this._name })
      }
    }

    CHANNEL.postMessage({ status: 'Sync complete!' })
  },
  maxRetentionTime: 24 * 60
})

workbox.routing.registerRoute(
  `${HOST}notes/`,
  new workbox.strategies.NetworkFirst({
    cacheName: 'notes',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  }),
  'GET'
)

workbox.routing.registerRoute(
  `${HOST}notes/`,
  new workbox.strategies.NetworkOnly({
    plugins: [BACKGROUND_SYNC_PLUGIN]
  }),
  'POST'
)
