require('dotenv').config()
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB
})

db.query('SELECT 1 + 1 AS RESULT', (err, result) => {
    if (err) console.log(err)
    else console.log("Connected to database...")
})

module.exports = db