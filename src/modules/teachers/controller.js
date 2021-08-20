const helper = require('../../helpers/wrapper')
const model = require('./model')

module.exports = {

  getTeacherData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await model.getTeacherData(id)

      return helper.response(res, 200, 'SUCCESS', result)
    } catch (err) {
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  },

  updateTeacherData: async (req, res) => {
    try {
      const { id } = req.params
      const { phoneNumber } = req.body
      const setData = {
        no_telp_guru: phoneNumber,
        photo_guru: req.file ? req.file.filename : ''
      }
      console.log(setData)
      const result = await model.updateTeacherData(setData, id)
      return helper.response(res, 200, 'SUCCESS', result)
    } catch (err) {
      console.log(req.body)
      console.log(err)
      return helper.response(res, 400, 'BAD REQUEST', err)
    }
  }

}
