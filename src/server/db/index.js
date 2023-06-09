const mysql = require('mysql')

const db = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password :'',
    database : 'intellgent_building'

})

module.exports = db 