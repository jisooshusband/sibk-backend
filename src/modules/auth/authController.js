require('dotenv').config()
const bcrypt = require('bcrypt')
const helper = require('../../helpers/wrapper')
const jwt = require('jsonwebtoken')
const model = require('./authModel')
const sendText = require('../../helpers/sendText')
const salt = bcrypt.genSaltSync(10)

module.exports = {

  studentLogin: async (req, res) => {
    try {
      const { nisn, password } = req.body
      const isExist = await model.getDataConditionStudent({
        nisn: nisn
      })

      if (isExist.length > 0) {
        if (isExist[0].password_siswa.length === 0) {
          return helper.response(res, 404, 'Kamu belum buat password nih! daftar dulu ya')
        } else {
          const isMatch = bcrypt.compareSync(password, isExist[0].password_siswa)
          if (isMatch) {
            const payLoad = isExist[0]
            delete payLoad.password_guru
            const token = jwt.sign(
              { ...payLoad }, 'SECRET', { expiresIn: '24h' }
            )
            const result = {
              ...payLoad,
              token
            }

            return helper.response(res, 200, 'Login berhasil', result)
          } else {
            return helper.response(res, 300, 'Password tidak cocok')
          }
        }
      } else {
        return helper.response(res, 404, 'NISN salah atau tidak terdaftar')
      }
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad Request', err)
    }
  },

  teacherLogin: async (req, res) => {
    try {
      const { nip, password } = req.body
      const isExist = await model.getDataConditionTeacher({
        nip: nip
      })

      if (isExist.length > 0) {
        if (isExist[0].password_guru.length === 0) {
          return helper.response(res, 404, 'Kamu belum buat password nih! daftar dulu ya')
        } else {
          const isMatch = bcrypt.compareSync(password, isExist[0].password_guru)
          if (isMatch) {
            const payLoad = isExist[0]
            delete payLoad.password_guru
            const token = jwt.sign(
              { ...payLoad }, 'SECRET', { expiresIn: '24h' }
            )
            const result = {
              ...payLoad,
              token
            }

            return helper.response(res, 200, 'Login berhasil', result)
          } else {
            return helper.response(res, 300, 'Password tidak cocok')
          }
        }
      } else {
        return helper.response(res, 404, 'NIP salah atau tidak terdaftar')
      }
    } catch (err) {
      console.log(err.response)
      return helper.response(res, 400, 'Bad Request', err)
    }
  },

  studentRegister: async (req, res) => {
    try {
      const { nisn, password, otp } = req.body
      const isExist = await model.getDataConditionStudent({
        nisn: nisn
      })

      if (isExist.length > 0) {
        const token = isExist[0].siswa_token
        if (+otp === +token) {
          const setData = {
            password_siswa: bcrypt.hashSync(password, salt)
          }
          const result = await model.patchStudent(setData, nisn)
          return helper.response(res, 200, 'Akun berhasil dibuat', result)
        } else {
          return helper.response(res, 400, 'OTP salah')
        }
      } else {
        return helper.response(res, 400, 'NISN tidak terdaftar')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  teacherRegister: async (req, res) => {
    try {
      const { nip, password, otp } = req.body
      const isExist = await model.getDataConditionTeacher({
        nip: nip
      })

      if (isExist.length > 0) {
        const token = isExist[0].guru_token
        if (+otp === +token) {
          const setData = {
            password_guru: bcrypt.hashSync(password, salt)
          }
          const result = await model.patchTeacher(setData, nip)
          return helper.response(res, 200, 'Akun berhasil dibuat', result)
        } else {
          return helper.response(res, 400, 'OTP salah')
        }
      } else {
        return helper.response(res, 400, 'NIP tidak terdaftar')
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  otpVerificationTeacher: async (req, res) => {
    try {
      const { nip, phoneNumber } = req.body
      const token = Math.floor(1000 + Math.random() * 9000)
      const isExist = await model.getDataConditionTeacher({
        nip: nip
      })

      if (isExist.length > 0) {
        sendText('otp', phoneNumber, token)
        const setData = {
          no_telp_guru: phoneNumber,
          guru_token: token
        }

        const result = await model.patchTeacher(setData, nip)

        return helper.response(res, 200, 'OTP di kirimkan via whatsapp', result)
      }
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  otpVerificationStudent: async (req, res) => {
    try {
      const { nisn, phoneNumber } = req.body
      const token = Math.floor(1000 + Math.random() * 9000)
      const isExist = await model.getDataConditionStudent({
        nisn: nisn
      })

      if (isExist.length > 0) {
        sendText('otp', phoneNumber, token)
        const setData = {
          no_telp_siswa: phoneNumber,
          siswa_token: token
        }

        const result = await model.patchStudent(setData, nisn)

        return helper.response(res, 200, 'OTP di kirimkan via whatsapp', result)
      } else {
        return helper.response(res, 400, 'NISN tidak terdaftar')
      }
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  }

}
