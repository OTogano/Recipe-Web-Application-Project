const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_db_b'
})

con.connect((err)=>{
    if(err) {
        console.error('Database could not connect:', err);
        process.exit(1);
    }
    console.log('Database connected successfully!');
});
module.exports = con; 
