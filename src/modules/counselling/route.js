const express = require('express')
const route = express.Router()
const controller = require('./controller')

route.get('/', controller.getAll)
route.get('/by-nisn/:nisn', controller.getByNisn)
route.post('/', controller.postData)
route.delete('/:id', controller.deleteData)
route.get('/report', controller.generateReport)

module.exports = route
