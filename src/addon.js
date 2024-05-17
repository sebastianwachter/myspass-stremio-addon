import { addonBuilder } from 'stremio-addon-sdk'

import pkg from '../package.json' assert { type: 'json' }
import { getStreamUrl } from './util.js'

const manifest = {
  id: 'de.myspass.stremio',
  version: pkg.version,
  name: 'MySpass Addon',
  description: 'MySpass addon for stremio',
  resources: ['stream'],
  types: ['series'],
  catalogs: []
}

// eslint-disable-next-line new-cap
const builder = new addonBuilder(manifest)

builder.defineStreamHandler((args) => {
  return new Promise((resolve, reject) => {
    if (!args.id || args.id.split(':')[0] !== 'tt0428167') reject(new Error('Invalid Catalog Request'))

    getStreamUrl(args.id)
      .then((res) => {
        if (!res || Object.keys(res).length <= 0) reject(new Error('Received Invalid Catalog Data'))
        resolve({ streams: [res] })
      })
      .catch((err) => {
        reject(err)
      })
  })
})

export default builder.getInterface()
