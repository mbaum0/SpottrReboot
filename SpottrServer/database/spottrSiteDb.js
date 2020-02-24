const CREATE_SPOTTRSITE_TABLE = `CREATE TABLE SpottrSite (id INTEGER PRIMARY KEY AUTOINCREMENT,
    sitename TEXT,
    address TEXT);`


const INSERT_SPOTTRSITE = `INSERT INTO SpottrSite (sitename, address) VALUES (?, ?);`
const UPDATE_SPOTTRSITE = `UPDATE SpottrSite SET sitename = COALESCE(?, sitename), address=COALESCE(?, address) WHERE id=?;`
const SELECT_ALL_SPOTTRSITE = `SELECT * FROM SpottrSite;`
const SELECT_SPOTTRSITE = `SELECT * FROM SpottrSite WHERE id=?;`
const DELETE_SPOTTRSITE = `DELETE FROM SpottrSite WHERE id=?;`

const dbLogDb = require('./dbLogDb')
var db = null;

exports.init = (dbHandle) => {    
    db = dbHandle;
    db.run(CREATE_SPOTTRSITE_TABLE, (err) => {
        if (err) {
            console.log('SpottrSite table already exists')
        } else {
            console.log('Successfully created SpottrSite table')
        }
    })
}

exports.insert = (name, address, callback) => {
    db.run(INSERT_SPOTTRSITE, [name, address], function (err) {
        dbLogDb.insert("INSERT", "SpottrSite", this.lastID, err, `sitename: ${name}, address: ${address}`)
        exports.select(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.selectall = (callback) => {
    db.all(SELECT_ALL_SPOTTRSITE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.select = (id, callback) => {
    db.get(SELECT_SPOTTRSITE, [id], (err, row) => {
        callback(err, row)
    })
}

exports.delete = (id, callback) => {
    db.run(DELETE_SPOTTRSITE, [id], function (err) {
        if (this.changes == 0) {
            dbLogDb.insert("DELETE", "SpottrSite", id, 1, "Resouce does not exist")
        } else {
            dbLogDb.insert("DELETE", "SpottrSite", id, 0, null)
        }
        callback(err, this.changes)
    })
}

exports.update = (id, sitename, address, callback) => {
    db.run(UPDATE_SPOTTRSITE, [sitename, address, id], (err) => {
        dbLogDb.insert("UPDATE", "SpottrSite", this.lastID, err, `sitename: ${sitename}, address: ${address}`)
        exports.select(id, (err, row) => {
            callback(err, row)
        })
    })
}