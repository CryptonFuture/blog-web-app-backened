const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json({limit: '1gb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '1gb'}))
app.use(cors())

module.exports = app