const mysql = require ('mysql2')

const connection = mysql.createConnection({
    host:localhost,
    user:root,
    password:root,
    database:blog,
})

connection.connect((err)=>{
    if (err) throw err
    console.log('Connesso al Database')
})

module.exports = connection