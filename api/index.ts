import sdk from 'stremio-addon-sdk'
import express from 'express'

import addonInterface from '../src/addon.js'

const { getRouter } = sdk
const router = getRouter(addonInterface)
const app = express()

app.use(router)

export default app
