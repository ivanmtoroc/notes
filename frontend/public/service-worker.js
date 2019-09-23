/* eslint-disable */
self.importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

const APP_SHELL_CACHE_FILES = [
  '/static/bower_components/bootstrap/dist/js/bootstrap.min.js',
  '/static/bower_components/bootstrap/dist/css/bootstrap.min.css',
  '/static/bower_components/jquery/dist/jquery.min.js',
  '/static/bower_components/font-awesome/css/font-awesome.min.css',
  '/static/bower_components/font-awesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
  '/static/bower_components/font-awesome/fonts/fontawesome-webfont.ttf?v=4.7.0',
  '/static/dist/css/bootstrap-material-design.min.css',
  '/static/dist/css/skins/all-md-skins.min.css',
  '/static/dist/css/AdminLTE.min.css',
  '/static/dist/css/MaterialAdminLTE.min.css',
  '/static/dist/css/ripples.min.css',
  '/static/dist/js/adminlte.min.js',
  '/static/dist/js/material.min.js',
  '/static/dist/js/ripples.min.js',
  '/static/css/app.css',
  '/static/js/app.js',
  '/static/images/note-32x32.png',
  '/static/images/note-64x64.png',
  '/static/images/note-128x128.png',
  '/static/images/note-256x256.png',
  '/static/images/note-512x512.png',
  '/static/images/favicon.png',
  '/static/manifest.json',
  '/'
]

const BACKGROUND_SYNC = new workbox.backgroundSync.Plugin('notes', {
  maxRetentionTime: 24 * 60
})


workbox.precaching.precacheAndRoute(APP_SHELL_CACHE_FILES)

workbox.routing.registerRoute(
  'http://192.168.0.27:8000/notes/',
  new workbox.strategies.NetworkFirst({
    cacheName: 'notes',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      })
    ]
  })
)

workbox.routing.registerRoute(
  'http://192.168.0.27:8000/notes/',
  new workbox.strategies.NetworkOnly({
    plugins: [ BACKGROUND_SYNC ]
  }),
  'POST'
)
