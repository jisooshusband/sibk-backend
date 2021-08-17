const connection = require('../../config/mysql')

module.exports = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM konsultasi',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  getByNisn: (nisn) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM konsultasi WHERE nisn_siswa = ?',
        nisn,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  postData: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO konsultasi SET ?',
        data,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM konsultasi WHERE id_konsultasi = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }
}
