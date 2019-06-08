const DBconn = require('./dbconnect');

class DBManager extends DBconn {
    constructor() {
        super();
        this.conn = super.getInstance();
    }

    _insert(table, value, fn = function() {}) {
        if (table == null || value == null) {
            return;
        }
        try {
            this.conn.query('insert into ' + table + ' value(' + this.turnToString(value) + ')', fn)
        } catch (error) {
            console.log(error);
        }

    }

    _select(table, target, value, fn = function() {}) {
        if (table == null || value == null || target == null) {
            return;
        }
        try {
            this.conn.query('select ' + target.toString() + ' from ' + table + ' where ' + this.DupCharamterConcat(value, ' AND '), fn)
        } catch (error) {
            console.log(error.code);
        }
    }

    _delete(table, value, fn = function() {}) {
        if (table == null || value == null) {
            return;
        }
        try {
            this.conn.query('delete from ' + table + ' where ' + this.DupCharamterConcat(value, ' AND '), fn)
        } catch (error) {
            console.log(error.code);
        }

    }

    _update(table, target, condition, fn = function() {}) {
        if (table == null || before == null, after == null) {
            return;
        }
        try {
            this.conn.query('update ' + table + ' set ' + this.DupCharamterConcat(target, ',') + ' where ' + this.DupCharamterConcat(condition, ' AND '), fn)
        } catch (error) {
            console.log(error.code);
        }
    }

    turnToString(value) {
        if (typeof value == 'object') {
            if (value instanceof Array) {
                value = value.toString()
            } else {
                let arr = [];
                for (let key in value) {
                    arr.push("'" + value[key] + "'");
                }
                value = arr.toString();
            }
        } else {
            value += '';
        }
        return value;
    }

    DupCharamterConcat(value, mid) {
        let keys = Object.keys(value);
        let arr = []
        keys.forEach((key, index) => {
            if (typeof value[key] == 'string') {
                arr.push(key + "='" + value[key] + "'")
            } else {
                arr.push(key + "=" + value[key] + "")
            }
        })
        return arr.join(mid);
    }
}

module.exports = DBManager