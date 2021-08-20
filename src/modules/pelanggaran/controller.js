const helper = require('../../helpers/wrapper')
const model = require('./model')
const studentModel = require('../students/studentModel')
const sendText = require('../../helpers/sendText')

module.exports = {
  getAllData: async (req, res) => {
    try {
      const result = await model.getAllData()
      return helper.response(res, 200, 'Success get all data', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await model.getOneData(id)
      return helper.response(res, 200, 'Success get data', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  patchStudent: async (req, res) => {
    try {
      const { jenisPelanggaran, pointPelanggaran, totalPoint, tanggal, nisn } = req.body
      const student = await studentModel.getStudentByNISN(nisn)
      const setData = {
        nisn_siswa: nisn,
        jenis_pelanggaran: jenisPelanggaran,
        point_pelanggaran: pointPelanggaran,
        sanski_pelanggaran: 'penambahan point',
        tanggal_pelanggaran: tanggal,
        keterangan_pelanggaran: null,
        nama_walikelas: null
      }
      const result = await model.postPelanggaran(setData)
      const toStudent = {
        point_siswa: totalPoint
      }
      const editStudent = await studentModel.updateStudent(toStudent, nisn)
      sendText(
        'notification',
        student[0].no_telp_siswa || 6285156315658,
        '0000',
        student[0].nama_siswa,
        jenisPelanggaran,
        pointPelanggaran,
        totalPoint
      )
      console.log({ ...editStudent, ...result })
      return helper.response(res, 200, 'Success', { ...result, ...editStudent })
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getRecord: async (req, res) => {
    try {
      const result = await model.getRecord()
      return helper.response(res, 200, 'Success', result)
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  deleteRecord: async (req, res) => {
    try {
      const { id } = req.params
      const data = await model.getRecordById(id)
      const student = await studentModel.getStudentByNISN(data[0].nisn_siswa)

      const newPoint = +student[0].point_siswa - data[0].point_pelanggaran

      const setData = {
        point_siswa: newPoint
      }

      const restore = await studentModel.updateStudent(setData, data[0].nisn_siswa)
      const result = await model.deleteRecord(id)

      return helper.response(res, 200, 'Success deleted', { ...restore, ...result })
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad request', err)
    }
  },

  getStudentRecord: async (req, res) => {
    try {
      const { nisn } = req.params

      const result = await model.getByNisn(nisn)

      return helper.response(res, 200, 'Success get data', result)
    } catch (err) {
      console.log(err)
      return helper.response(res, 400, 'Bad Request', err)
    }
  }
}
