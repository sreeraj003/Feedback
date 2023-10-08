const express = require('express')
const route = express()
const controller = require('../controller/controller')
route.post('/feedback',controller.saveFeedback)
route.get('/result',controller.result)
module.exports = route