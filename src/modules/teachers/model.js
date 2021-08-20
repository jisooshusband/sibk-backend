const connection = require('../../config/mysql')

module.exports = {
  getTeacherData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM guru WHERE nip = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },

  updateTeacherData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE guru SET ? WHERE nip = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
