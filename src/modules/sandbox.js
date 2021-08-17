const fs = require('fs')
const data = fs.readFileSync('./soal.json', 'utf-8')

const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sibk'
})

connection.connect((err) => {
  if (err) throw err
  console.log('database connected')
})

const result = async (req, res) => {
  const hasil = await seed(data)
  return 'yes'
}

const seed = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO soal SET ?', data, (err, result) => {
      !err ? resolve(result) : reject(new Error(err))
    })
  })
}

result(data)
