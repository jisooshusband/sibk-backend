const helper = require('../../helpers/wrapper')
const model = require('./model')
const path = require('path')
const pdf = require('html-pdf')
const ejs = require('ejs')

module.exports = {

  getAll: async (req, res) => {
    try {
      const result = await model.getAll()
      return helper.response(res, 200, 'SUCCESS', result)
    } catch (err) {
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  },

  getByNisn: async (req, res) => {
    try {
      const { nisn } = req.params
      const result = await model.getByNisn(nisn)
      return helper.response(res, 200, 'SUCCESS', result)
    } catch (err) {
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  },

  postData: async (req, res) => {
    try {
      const { nisn, jenisMasalah, deskripsiMasalah, tanggal } = req.body
      console.log(req.body)
      const setData = {
        nisn_siswa: nisn,
        tanggal_konsultasi: tanggal,
        jenis_permasalahan: jenisMasalah,
        deskripsi_permasalahan: deskripsiMasalah
      }

      const result = await model.postData(setData)

      return helper.response(res, 200, 'SUCCESS', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  },

  deleteData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await model.deleteData(id)

      return helper.response(res, 200, 'SUCCESS', result)
    } catch (err) {
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  },

  generateReport: async (req, res) => {
    try {
      const data = await model.getAll()
      for (const i in data) {
        data[i].tanggal_konsultasi = data[i].tanggal_konsultasi.toString().substring(0, 10)
      }
      console.log(data)
      const add = Math.floor(1000 + Math.random() * 9000)
      const fileName = `${add}-report-konseling.pdf`
      ejs.renderFile(
        path.join(__dirname, '../../templates', 'counsellingTemplate.ejs'), { data: data },
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
