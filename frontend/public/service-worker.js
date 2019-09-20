const CACHE_NAME = 'notes'
const CACHE_FILES = [
  '/static/bower_components/bootstrap/dist/js/bootstrap.min.js',
  '/static/bower_components/bootstrap/dist/css/bootstrap.min.css',
  '/static/bower_components/jquery/dist/jquery.min.js',
  '/static/bower_components/font-awesome/css/font-awesome.min.css',
  '/static/dist/css/bootstrap-material-design.min.css',
  '/static/dist/css/skins/all-md-skins.min.css',
  '/static/dist/css/AdminLTE.min.css',
  '/static/dist/css/MaterialAdminLTE.min.css',
  '/static/dist/css/ripples.min.css',
  '/static/dist/js/adminlte.min.js',
  '/static/dist/js/material.min.js',
  '/static/dist/js/ripples.min.js',
  '/static/css/app.css',
  '/static/js/app.js'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CACHE_FILES)
    })
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})
