import { addonBuilder as AddonBuilder, Manifest } from 'stremio-addon-sdk'

import pkg from '../package.json' with { type: 'json' }
import { imdbMyspassMapping } from './imdb-myspass-series.js'

const manifest: Manifest = {
  id: 'de.myspass.stremio',
  version: pkg.version,
  name: 'MySpass',
  description: 'MySpass addon for stremio',
  resources: ['stream'],
  types: ['series'],
  catalogs: []
}

const addonBuilder = new AddonBuilder(manifest)

const getPlaylistUrl = (episodeId: number): string => `https://1020993654.rsc.cdn77.org/Stromberg/${episodeId}/1080-HLS/${episodeId}_1080-HLS_.m3u8`

addonBuilder.defineStreamHandler(async args => {
  if (args.id === null || args.id === '' || args.id.split(':')[0] !== 'tt0428167') {
    await Promise.reject(new Error('Invalid Catalog Request'))
  }

  return await new Promise((resolve, reject) => {
    const episodeId = imdbMyspassMapping[args.id]

    if (Number.isNaN(episodeId)) reject(new Error('Received Invalid Catalog Data'))

    resolve({
      streams: [{
        url: getPlaylistUrl(episodeId),
        title: '1080p - HLS'
      }]
    })
  })
})

export default addonBuilder.getInterface()
