const NOTES_CACHE = 'notes'
const APP_SHELL_CACHE = 'app-shell'
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

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then(function (cache) {
      return cache.addAll(APP_SHELL_CACHE_FILES)
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.open(NOTES_CACHE).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone())
          return response
        })
      })
    })
  )
})
