const CREATE_PREFERENCE_TABLE = `CREATE TABLE Preference (key TEXT PRIMARY KEY,
                                                          val TEXT);`

const INSERT_PREFERENCE = `INSERT INTO Preference (key, val) VALUES (?, ?);`
const UPDATE_PREFERENCE = `UPDATE Preference SET val=? WHERE key=?;`
const SELECT_ALL_PREFERENCE = `SELECT * FROM Preference;`
const SELECT_PREFERENCE = `SELECT * FROM Preference WHERE key=?;`
const DELETE_PREFERENCE= `DELETE FROM Preference WHERE key=?;`

const dbLogDb = require('./dbLogDb')
var db = null;

exports.init = (dbHandle) => {
    db = dbHandle;
    db.run(CREATE_PREFERENCE_TABLE, (err) => {
        if (err) {
            //console.log('Preference table already exists')
        } else {
            console.log('Succesfully created Preference table')
        }
    })
}

exports.insert = (key, value, callback) => {
    db.run(INSERT_PREFERENCE, [key, value], function (err) {
        dbLogDb.insert("INSERT", "Preference", key, err, `key: ${key}, value: ${value}`)
        exports.select(key, (err, row) => {
            callback(err, row)
        })
    })
}

exports.selectall = (callback) => {
    db.all(SELECT_ALL_PREFERENCE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.select = (key, callback) => {
    db.get(SELECT_PREFERENCE, [key], (err, row) => {
        callback(err, row)
    })
}

exports.delete = (key, callback) => {
    db.run(DELETE_PREFERENCE, [key], function (err) {
        if (this.changes = 0) {
            dbLogDb.insert("DELETE", "Preference", key, 1, "Resource does not exist")
        } else {
            dbLogEb.insert("DELETE", "Preference", key, 0, null)
        }
        callback(err, this.changes)
    })
}

exports.update = (key, value, callback) => {
    db.run(UPDATE_PREFERENCE, [value, key], (err) => {
        dbLogDb.insert("UPDATE", "Preference", this.lastID, err, `key: ${key}, value: ${value}`)
        exports.select(key, (err, row) => {
            callback(err, row)
        })
    })
}