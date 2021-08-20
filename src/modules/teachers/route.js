const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')
const controller = require('./controller')

Route.get('/:id', controller.getTeacherData)

Route.patch(
  '/:id',
  uploadFile,
  controller.updateTeacherData
)

module.exports = Route
