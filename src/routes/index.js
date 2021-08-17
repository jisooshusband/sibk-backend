const express = require('express')
const Route = express.Router()

const authRouter = require('../modules/auth/authRoutes')
const studetnRouter = require('../modules/students/studentRoute')
const penaltyRouter = require('../modules/pelanggaran/route')
const counsellingRouter = require('../modules/counselling/route')

Route.use('/auth', authRouter)
Route.use('/student', studetnRouter)
Route.use('/penalty', penaltyRouter)
Route.use('/counselling', counsellingRouter)

module.exports = Route
