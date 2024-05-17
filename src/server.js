import pkg from 'stremio-addon-sdk'

import addonInterface from './addon.js'

const { serveHTTP } = pkg
serveHTTP(addonInterface, { port: 7000 })
