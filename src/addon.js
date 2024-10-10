import { addonBuilder } from 'stremio-addon-sdk'

import pkg from '../package.json' assert { type: 'json' }
import { imdbMyspassMapping } from './imdb-myspass-mapping.js'

const manifest = {
  id: 'de.myspass.stremio',
  version: pkg.version,
  name: 'MySpass',
  description: 'MySpass addon for stremio',
  resources: ['stream'],
  types: ['series'],
  catalogs: []
}

const builder = new addonBuilder(manifest)

const getPlaylistUrl = episodeId => {
  return `https://1020993654.rsc.cdn77.org/Stromberg/${episodeId}/1080-HLS/${episodeId}_1080-HLS_.m3u8`
}

builder.defineStreamHandler(async args => {
  if (!args.id || args.id.split(':')[0] !== 'tt0428167') reject(new Error('Invalid Catalog Request'))

  return new Promise((resolve, reject) => {
    const episodeId = imdbMyspassMapping[args.id]
    if (!episodeId) reject(new Error('Received Invalid Catalog Data'))
    resolve({
      streams: [{
        url: getPlaylistUrl(episodeId),
        title: '1080p - HLS',
      }]
    })
  })
})

export default builder.getInterface()
