require('dotenv').config()
const helper = require('../../helpers/wrapper')
const model = require('./studentModel')
const path = require('path')
const pdf = require('html-pdf')
const ejs = require('ejs')

module.exports = {

  getStudentByClass: async (req, res) => {
    console.log('dapet nih')
    try {
      const { kelas } = req.params
      const result = await model.getStudentByClass(kelas)
      return helper.response(res, 200, 'get all students success', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getStudentByNISN: async (req, res) => {
    try {
      const { nisn } = req.params
      console.log(nisn)
      const result = await model.getStudentByNISN(nisn)
      return helper.response(res, 200, 'Success', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  createStudent: async (req, res) => {
    try {
      // console.log(req.body)
      const { nisn, name, schoolClass, birthPlace, gender, phoneNumber } = req.body
      const setData = {
        nisn: nisn,
        nama_siswa: name,
        kelas_siswa: schoolClass,
        tempat_lahir_siswa: birthPlace,
        gender_siswa: gender,
        no_telp_siswa: phoneNumber,
        photo_siswa: req.file ? req.file.filename : ''
      }
      const result = await model.createStudent(setData)
      return helper.response(res, 200, 'Success', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { phone } = req.body
      const { nisn } = req.params

      const setData = {
        no_telp_siswa: phone
      }

      console.log(req.body)

      const result = await model.updateStudent(setData, nisn)

      return helper.response(res, 200, 'Success', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  generateReport: async (req, res) => {
    try {
      const data = await model.getAllStudents()
      console.log(data)
      const add = Math.floor(1000 + Math.random() * 9000)
      const fileName = `${add}-report-student.pdf`
      ejs.renderFile(
        path.join(__dirname, '../../templates', 'studentTemplate.ejs'), { data: data },
        (err, data) => {
          if (err) {
            console.log(err)
            return helper.response(res, 400, 'Failed export', err)
          } else {
            const options = {
              height: '11.25in',
              width: '8.5in',
              header: {
                height: '5mm'
              }
            }
            pdf.create(data, options)
              .toFile(path.join(__dirname, '../../../public/report/', fileName),
                function (err, data) {
                  if (err) {
                    console.log(err)
                    return helper.response(res, 400, 'Failed export', err)
                  } else {
                    return helper.response(res, 200, 'Success', {
                      url: `http://localhost:3001/backend1/api/${fileName}`
                    })
                  }
                }
              )
          }
        }
      )
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  }
}
