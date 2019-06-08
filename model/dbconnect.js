const mysql = require('mysql');

class dbconnect {
    constructor() {
        //this.getInstance();
    }

    getInstance() {
        if (dbconnect.conn == null) {
            dbconnect.conn = mysql.createConnection({
                host: 'localhost',
                port: 3306,
                user: 'zmw',
                password: 'zhuang93',
                database: 'talkroom',
                insecureAuth: false
            })
            dbconnect.conn.on('error', (err) => {
                this.close();
                console.log(err);
            })
        }
        return dbconnect.conn
    }

    close() {
        if (dbconnect.conn !== null) {
            dbconnect.conn.end();
            dbconnect.conn = null;
        }
    }
}

dbconnect.conn = null;

module.exports = dbconnect