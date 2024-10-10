import sdk from 'stremio-addon-sdk'

import addonInterface from './addon.js'

const { serveHTTP } = sdk
serveHTTP(addonInterface, { port: 7000 })
