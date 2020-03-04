const websock = require("../websock.js")


const CREATE_DBLOG_TABLE = `CREATE TABLE DbLog (id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    event TEXT,
    type TEXT,
    res_num INTEGER,
    error INTEGER,
    note TEXT);`

const INSERT_DBLOG = `INSERT INTO DbLog (event, type, res_num, error, note) VALUES (?, ?, ?, ?, ?);`

const SELECT_ALL_DBLOG = `SELECT * FROM DbLog;`

const SELECT_DBLOG = `SELECT * FROM DbLog WHERE id=?;`

const DELETE_ALL_DBLOG = `DELETE FROM DbLog;`

var db = null;

exports.init = (dbHandle) => {
    db = dbHandle;
    db.run(CREATE_DBLOG_TABLE, (err) => {
        if (err) {
            //console.log('DbLog table already exists')
        } else {
            console.log('Successfully create DbLog table')
        }
    })
}

exports.insert = (event, type, res_num, error, note) => {
    db.run(INSERT_DBLOG, [event, type, res_num, error, note], function (err) {
        exports.select(this.lastID, (err, row) => {
            websock.broadcastSockMsg('DBLOG', row)
        })
    })
}

exports.selectall = (callback) => {
    db.all(SELECT_ALL_DBLOG, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.select = (id, callback) => {
    db.get(SELECT_DBLOG, [id], (err, row) => {
        callback(err, row)
    })
}

exports.delete = (allback) => {
    db.run(DELETE_ALL_DBLOG, [], function (err) {
        callback(err, this.changes)
    })
}