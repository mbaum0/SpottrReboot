const sqlite3 = require('sqlite3').verbose()

const spottrSiteDb = require('./spottrSiteDb')
const parkingLotDb = require('./parkingLotDb')
const spottrNodeDb = require('./spottrNodeDb')
const parkingSpotDb = require('./parkingSpotDb')
const dbLogDb = require('./dbLogDb')

const DBPATH = "db.sqlite"

// Create database
const db = new sqlite3.Database(DBPATH, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database')
    }
})

exports.spottrSiteDb = spottrSiteDb;
exports.parkingLotDb = parkingLotDb;
exports.spottrNodeDb = spottrNodeDb;
exports.parkingSpotDb = parkingSpotDb;
exports.dbLogDb = dbLogDb;

// Create all database tables if they don't already exist
exports.createTables = () => {
    spottrSiteDb.init(db);
    parkingLotDb.init(db);
    spottrNodeDb.init(db);
    parkingSpotDb.init(db);
    dbLogDb.init(db);
}
