/**
 * This file helps to serve the bundled app in build/es5-bundled using ExpressJS
 */
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'build/es5-bundled')))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
