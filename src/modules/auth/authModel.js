const connection = require('../../config/mysql')

module.exports = {

  getDataConditionStudent: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM siswa WHERE ?',
        data,
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  getDataConditionTeacher: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM guru WHERE ?',
        data,
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  patchStudent: (data, nisn) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE siswa SET ? WHERE nisn = ?',
        [data, nisn],
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  },

  patchTeacher: (data, nip) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE guru SET ? WHERE nip = ?',
        [data, nip],
        (error, result) => {
          !error
            ? resolve(result)
            : reject(new Error(error))
        }
      )
    })
  }

}
