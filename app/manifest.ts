import type { MetadataRoute } from 'next'

/** Web app manifest: name and icons when the site is added to a phone's home screen. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'yash.apps — Independent apps by Yash Rawat',
    short_name: 'yash.apps',
    start_url: '/',
    display: 'browser',
    background_color: '#0A0A0B',
    theme_color: '#0A0A0B',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
