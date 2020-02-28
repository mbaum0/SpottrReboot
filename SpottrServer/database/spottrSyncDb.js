// uuid is the uuid of the actual node
// state is the approval status of the node
//  0 - pending
//  1 - approved
//  2 - rejected
// 
// entries in this table will be created when a node is requesting a sync
const CREATE_SPOTTRSYNC_TABLE = `CREATE TABLE SpottrSync (id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT,
    state INTEGER)`

const INSERT_SPOTTRSYNC = `INSERT INTO SpottrSync (uuid, state) VALUES (?, ?);`
const SELECT_ALL_SPOTTRSYNC = `SELECT * FROM SpottrSync;`
const SELECT_SPOTTRSYNC = `SELECT * FROM SpottrSync WHERE id=?;`
const UPDATE_SPOTTRSYNC = `UPDATE SpottrSync SET state=? WHERE id=?;`
const DELETE_SPOTTRSYNC = `DELETE FROM SpottrSync WHERE id=?;`

const dbLogDb = require('./dbLogDb')
var db = null

exports.init = (dbHandle) => {
    db = dbHandle;
    db.run(CREATE_SPOTTRSYNC_TABLE, (err) => {
        if (err) {
            console.log('SpottrSync table already exists')
        } else {
            console.log('Successfully created SpottrSync table')
        }
    });
}

exports.insert = (uuid, state, callback) => {
    db.run(INSERT_SPOTTRSYNC, [uuid, state], function (err) {
        dbLogDb.insert("INSERT", "SpottrSync", this.lastID, err, `uuid: ${uuid}, state: ${state}`)
        exports.elect(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.selectall = (callback) => {
    db.all(SELECT_ALL_SPOTTRSYNC, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.select = (id, callback) => {
    db.get(SELECT_SPOTTRSYNC, [id], (err, row) => {
        callback(err, row)
    })
}

exports.delete = (id, callback) => {
    db.run(DELETE_SPOTTRSYNC, [id], function (err) {
        if (this.changes == 0) {
            dbLogDb.insert("DELETE", "SpottrSync", id, 1, "Resource does not exist")
        } else {
            dbLogDb.insert("DELETE", "SpottrSync", id, err, null)
        }
        callback(err, this.changes)
    })
}

exports.update = (id, state, callback) => {
    db.run(UPDATE_SPOTTRSYNC, [state, id], function (err) {
        dbLogDb.insert("UPDATE", "SpottrSync", this.lastID, err, `state: ${state}`)
        exports.select(id, (err, row) => {
            callback(err, row)
        })
    })
}