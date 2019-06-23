const mysql = require('mysql');
const log4js = require('log4js');
// const logger
const DATABASE = 'talkroom'

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
                password: 'zmw',
                database: 'talkroom',
                insecureAuth: false
            })
            dbconnect.conn.on('error', (err) => {
                this.close();
                console.log(err);
            })
            dbconnect.conn.query('use ' + DATABASE);
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