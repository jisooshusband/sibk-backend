const connection = require('../../config/mysql')

module.exports = {

  getAllStudents: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM siswa',
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  },

  getStudentByClass: (kelas) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM siswa WHERE kelas_siswa = ?',
        kelas,
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  },

  getStudentByNISN: (nisn) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM siswa WHERE nisn = ?',
        nisn,
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  },

  createStudent: (data) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO siswa SET ?',
        data,
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  },

  updateStudent: (data, nisn) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE siswa SET ? WHERE nisn = ?',
        [data, nisn],
        (err, result) => {
          !err
            ? resolve(result)
            : reject(new Error(err))
        }
      )
    })
  }
}
