const express = require('express')
const route = express.Router()
const controller = require('./controller')

route.get('/record/', controller.getRecord)
route.delete('/record/:id', controller.deleteRecord)
route.get('/', controller.getAllData)
route.get('/by-id/:id', controller.getById)
route.post('/', controller.patchStudent)
route.get('/by-nisn/:nisn', controller.getStudentRecord)

module.exports = route
