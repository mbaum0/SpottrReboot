const CREATE_PARKINGLOT_TABLE = `CREATE TABLE ParkingLot (id INTEGER PRIMARY KEY AUTOINCREMENT,
    lotname TEXT,
    spottrsite INTEGER,
    perimeter TEXT,
    FOREIGN KEY (spottrsite) REFERENCES SpottrSite (id) ON DELETE CASCADE);`

const INSERT_PARKINGLOT = `INSERT INTO ParkingLot (lotname, spottrsite, perimeter) VALUES (?, ?, ?);`
const UPDATE_PARKINGLOT = `UPDATE ParkingLot SET lotname=COALESCE(?,lotname), spottrsite=COALESCE(?, spottrsite), perimeter=COALESCE(?, perimeter) WHERE id=?;`
const SELECT_ALL_PARKINGLOT = `SELECT * FROM ParkingLot;`
const SELECT_PARKINGLOT = `SELECT * FROM ParkingLot WHERE id=?;`
const SELECT_PARKINGLOT_WITH_SPOTTRSITE = `SELECT * FROM ParkingLot WHERE spottrsite=?;`
const DELETE_PARKINGLOT = `DELETE FROM ParkingLot WHERE id=?;`

const dbLogDb = require('./dbLogDb')
var db = null;

exports.init = (dbHandle) => {
    db = dbHandle;
    db.run(CREATE_PARKINGLOT_TABLE, (err) => {
        if (err) {
            console.log('ParkingLot table already exists')
        } else {
            console.log('Successfully created ParkingLot table')
        }
    });
}

exports.insert = (lotname, spottrsite, perimeter, callback) => {
    db.run(INSERT_PARKINGLOT, [lotname, spottrsite, perimeter], function (err) {
        dbLogDb.insert("INSERT", "ParkingLot", this.lastID, err, `lotname: ${lotname}, spottrsite: ${spottrsite}, perimeter: ${perimeter}`)
        exports.select(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.selectall = (callback) => {
    db.all(SELECT_ALL_PARKINGLOT, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.select = (id, callback) => {
    db.get(SELECT_PARKINGLOT, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_withSpottrSite = (spottrsite, callback) => {
    db.all(SELECT_PARKINGLOT_WITH_SPOTTRSITE, [spottrsite], (err, row) => {
        callback(err, row)
    })
}

exports.delete = (id, callback) => {
    db.run(DELETE_PARKINGLOT, [id], function (err) {
        if (this.changes == 0) {
            dbLogDb.insertg("DELETE", "ParkingLot", id, 1, "Resource does not exist")
        } else {
            dbLogDb.insert("DELETE", "ParkingLot", id, err, null)
        }
        callback(err, this.changes)
    })
}

exports.update = (id, lotname, spottrsite, perimeter, callback) => {
    dbLogDb.insert("UPDATE", "ParkingLot", this.lastID, err, `lotname: ${lotname}, spottrsite: ${spottrsite}, perimeter: ${perimeter}`)
    db.run(UPDATE_PARKINGLOT, [lotname, spottrsite, perimeter, id], (err) => {
        exports.select(id, (err, row) => {
            callback(err, row)
        })
    })
}