const express = require('express')
const Route = express.Router()
const uploadFile = require('../../middlewares/uploads')
const controller = require('./studentController')
const fs = require('fs')
const path = require('path')

Route.get('/by-nisn/:nisn', controller.getStudentByNISN)
Route.get('/:kelas', controller.getStudentByClass)

Route.post(
  '/',
  uploadFile,
  controller.createStudent
)

Route.get(
  '/soal/json/', controller.fetch
)

Route.patch(
  '/update/:nisn',
  controller.updateStudent
)

module.exports = Route
