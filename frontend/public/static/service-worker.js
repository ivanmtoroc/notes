self.addEventListener('install', event => {
  event.waitUntil(
    console.log('Install event!')
  )
})
