const helper = require('../../helpers/wrapper')

module.exports = {
  sayHello: async (req, res) => {
    try {
      return helper.response(res, 200, 'Hello world')
    } catch (err) {
      return helper.response(res, 400, 'Bad request', err)
    }
  }
}
