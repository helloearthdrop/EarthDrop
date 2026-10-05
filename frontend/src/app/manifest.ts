import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EarthDrop',
    short_name: 'EarthDrop',
    description: 'Secure P2P File Transfer',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#338a61',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
