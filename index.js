const express = require("express")
const router = require('./router')

// Database connection
require('./database')

const app = express()
app.use(express.json()) // Mengetahui kalo masukkan body berupa JSON

const port = process.env.port || 8000

app.use('/', router)

app.listen(port, () => { console.log(`Server running on port ${port}...`) })