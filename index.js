'use strict'

require('dotenv').config()
require('./src/config/database')()


const express = require('express')
const bodyParser = require('body-parser')
const Router = require('./src/routes')

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(express.json())
app.use(Router)

app.listen(PORT, () => { console.log(`server running on port ${PORT}`) })