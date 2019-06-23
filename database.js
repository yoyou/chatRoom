const mysql = require('mysql');
const connect = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'zmw',
    password: 'zmw',
    database: 'talkroom',
    insecureAuth: false
})

// const connect = mysql.createConnection('mysql://root:12345678@localhost:3306/talkroom');

connect.connect();

// connect.query("delete from userlist where account = 'zmw'", function(err) {
//     if (err) {
//         console.log(err);
//     }
// })

// let a = connect.query('select * from userlist')


var option = {
    name: 'zmw',
    account: 'zmw1',
    password: '234',
    photo: '..'
}


// connect.query(`insert into  userlist value('${option.name}',  '${option.account}', '${option.password}','${option.photo}')`, (err, res) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(res);
// })


// connect.query("update userlist set photo = 'vv' where account = 'zmw'", function(err) {
//     console.log(err);
// })



connect.on('error', (err, o) => {
    if (err) {
        console.log(err);
    }
});

connect.end();