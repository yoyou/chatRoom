const dbManager = require('./db');

const TABLE = 'userlist'

class userManager extends dbManager {
    constructor() {
        super();
        this.init();
    }

    init () {
        this.conn.query('create table if not exists userlist('
        + 'v_id int not null auto_increment,'
        + 'name varchar(10) not null,'
        + 'account varchar(10) not null,'
        + 'password varchar(10) not null,'
        + 'photo varchar(10),'
        + 'primary key(v_id, account)' 
        + ')', function (err, res, field) {
            if (err) {
                console.log('create table failed');
                console.log(err);
                return;
            }
            console.log('create table successful!!');
        })
    }


    register(user) {
        return new Promise((reslove, reject) => {
            if (user.account && user.password && user.photo && user.name) {
                super._insert(TABLE, user, (err, res) => {
                    if (err)
                        reject(err);
                    reslove(res);
                })
            } else {
                reject(new Error('bad charamter'));
            }
        })

    }

    checkAuth(user) {
        return new Promise((reslove, reject) => {
            if (!(user.account && user.password)) {
                reject(new Error('bad charamter'));
            }
            super._select(TABLE, ["*"], {
                account: user.account,
                password: user.password
            }, (err, res) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                reslove(res);
            })
        })
    }

    deleteUserMessage(user) {
        return new Promise((reslove, reject) => {
            if (user == null || !(user.password && user.account)) {
                reject(new Error('bad charamter'))
            }
            super._delete(TABLE, {
                account: user.account,
                password: user.password
            }, (err, res) => {
                if (err)
                    reject(err);
                reslove(res);
            })
        })
    }

    updateUserMessage(target, condition) {
        return new Promise((reslove, reject) => {
            if ((target == null || typeof target != 'object') || (condition == null || typeof condition != 'object')) {
                reject(new Error('bad charamter'))
                return;
            }
            super._update(TABLE, target, condition, (err, res) => {
                if (err)
                    reject(err);
                reslove(res);
            });
        })
    }
}

module.exports = userManager