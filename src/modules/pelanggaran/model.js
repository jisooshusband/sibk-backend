const connection = require('../../config/mysql')

module.exports = {
  getAllData: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM jenis_pelanggaran',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  getOneData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM jenis_pelanggaran WHERE id_pelanggaran = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  getByNisn: (nisn) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM pelanggaran WHERE nisn_siswa = ?',
        nisn,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  postPelanggaran: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO pelanggaran SET ?',
        setData,
        (err, result) => {
          if (!err) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(err))
          }
        }
      )
    })
  },

  getRecord: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM pelanggaran',
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  getRecordById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM pelanggaran WHERE id_pelanggaran = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  },

  deleteRecord: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM pelanggaran WHERE id_pelanggaran = ?',
        id,
        (err, result) => {
          !err ? resolve(result) : reject(new Error(err))
        }
      )
    })
  }

}
