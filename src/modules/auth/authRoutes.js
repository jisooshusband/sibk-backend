const express = require('express')
const Route = express.Router()

const controller = require('./authController')

Route.post('/student/login', controller.studentLogin)
Route.post('/student/sendOtp', controller.otpVerificationStudent)
Route.post('/student/register', controller.studentRegister)

Route.post('/teacher/login', controller.teacherLogin)
Route.post('/teacher/sendOtp', controller.otpVerificationTeacher)
Route.post('/teacher/register', controller.teacherRegister)

module.exports = Route
