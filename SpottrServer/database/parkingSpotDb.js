const CREATE_PARKINGSPOT_TABLE = `CREATE TABLE ParkingSpot (id INTEGER PRIMARY KEY AUTOINCREMENT,
    spotname TEXT,
    spottrnode INTEGER,
    sensornum INTEGER,
    occupied INTEGER,
    longitude REAL,
    latitude REAL,
    FOREIGN KEY (spottrnode) REFERENCES SpottrNode (id) ON DELETE CASCADE);`

const INSERT_PARKINGSPOT = `INSERT INTO ParkingSpot (spotname, spottrnode, sensornum, occupied, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?);`
const UPDATE_PARKINGSPOT = `UPDATE ParkingSpot SET spotname=COALESCE(?, spotname), spottrnode=COALESCE(?, spottrnode), sensornum=COALESCE(?, sensornum), occupied=COALESCE(?, occupied), longitude=COALESCE(?, longitude), latitude=COALESCE(?, latitude) WHERE id=?;`

const SELECT_ALL_PARKINGSPOT = `SELECT p.id, p.spotname, p.spottrnode, p.sensornum, p.occupied, p.longitude, p.latitude, n.parkinglot FROM ParkingSpot p, SpottrNode n WHERE p.spottrnode = n.id;`
const SELECT_PARKINGSPOT = `SELECT p.id, p.spotname, p.spottrnode, p.sensornum, p.occupied, p.longitude, p.latitude, n.parkinglot FROM ParkingSpot p, SpottrNode n WHERE p.spottrnode = n.id AND p.id=?;`

const SELECT_PARKINGSPOT_WITH_PARKINGLOT = `SELECT p.id, p.spotname, p.spottrnode, p.sensornum, p.occupied, p.longitude, p.latitude, n.parkinglot FROM ParkingSpot p, SpottrNode n WHERE p.spottrnode = n.id AND n.parkinglot=?;`

const DELETE_PARKINGSPOT = `DELETE FROM ParkingSpot WHERE id=?;`

const dbLogDb = require('./dbLogDb')
var db = null;

exports.init = (dbHandle) => {
    db = dbHandle;
    db.run(CREATE_PARKINGSPOT_TABLE, (err) => {
        if (err) {
            console.log('ParkingSpot table already exists')
        } else {
            console.log('Successfully created ParkingSpot table')
        }
    });
}

exports.insert = (name, spottrnode, sensornum, occupied, longitude, latitude, callback) => {
    db.run(INSERT_PARKINGSPOT, [name, spottrnode, sensornum, occupied, longitude, latitude], function (err) {
        dbLogDb.insert("INSERT", "ParkingSpot", this.lastID, err, `spotname: ${name}, spottrnode: ${spottrnode}, sensornum: ${sensornum}, occupied: ${occupied}, longitude: ${longitude}, latitude: ${latitude}`)
        exports.select(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.selectall = (callback) => {
    db.all(SELECT_ALL_PARKINGSPOT, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.select = (id, callback) => {
    db.get(SELECT_PARKINGSPOT, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_withParkingLot = (parkinglot, callback) => {
    db.all(SELECT_PARKINGSPOT_WITH_PARKINGLOT, [parkinglot], (err, row) => {
        callback(err, row)
    })
}

exports.delete = (id, callback) => {
    db.run(DELETE_PARKINGSPOT, [id], function (err) {
        if (this.changes == 0) {
            dbLogDb.insert("DELETE", "ParkingSpot", id, 1, "Resource does not exist")
        } else {
            dbLogDb.insert("DELETE", "ParkingSpot", id, err, null)
        }
        callback(err, this.changes)
    })
}

exports.update = (id, name, spottrnode, sensornum, occupied, longitude, latitude, callback) => {
    db.run(UPDATE_PARKINGSPOT, [name, spottrnode, sensornum, occupied, longitude, latitude, id], function (err) {
        dbLogDb.insert("UPDATE", "ParkingSpot", this.lastID, err, `spotname: ${name}, spottrnode: ${spottrnode}, sensornum: ${sensornum}, occupied: ${occupied}, longitude: ${longitude}, latitude: ${latitude}`)
        exports.select(id, (err, row) => {
            callback(err, row)
        })
    })
}