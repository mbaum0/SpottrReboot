var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBPATH = "db.sqlite"


const CREATE_SPOTTRSITE_TABLE = `CREATE TABLE SpottrSite (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                          name TEXT,
                                                          address TEXT);`

const CREATE_SPOTTRNODE_TABLE = `CREATE TABLE SpottrNode (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                          name TEXT,
                                                          spottrsite INTEGER,
                                                          location TEXT,
                                                          numsensors INTEGER,
                                                          FOREIGN KEY (spottrsite) REFERENCES SpottrSite (id));`

const CREATE_MASTERNODE_TABLE = `CREATE TABLE MasterNode (id INTEGER PRIMARY KEY,
                                                          hostname TEXT,
                                                          FOREIGN KEY (id) REFERENCES SpottrNode (id));`
                                                        
const CREATE_SLAVENODE_TABLE = `CREATE TABLE SlaveNode (id INTEGER PRIMARY KEY,
                                                        masternode INTEGER,
                                                        FOREIGN KEY (id) REFERENCES SpottrNode (id),
                                                        FOREIGN KEY (masternode) REFERENCES MasterNode (id));`

const CREATE_PARKINGSPOT_TABLE = `CREATE TABLE ParkingSpot (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                            name TEXT,
                                                            spottrnode INTEGER,
                                                            sensornum INTEGER,
                                                            occupied INTEGER,
                                                            FOREIGN KEY (spottrnode) REFERENCES SpottrNode (id));`

const INSERT_SPOTTRSITE = `INSERT INTO SpottrSite (name, address) VALUES (?, ?);`
const INSERT_SPOTTRNODE = `INSERT INTO SpottrNode (name, spottrsite, location, numsensors) VALUES (?, ?, ?, ?);`
const INSERT_MASTERNODE = `INSERT INTO MasterNode (id, hostname) VALUES (?, ?);`
const INSERT_SLAVENODE = `INSERT INTO SlaveNode (id, masternode) VALUES (?, ?);`
const INSERT_PARKINGSPOT = `INSERT INTO ParkingSpot (name, spottrnode, sensornum, occupied) VALUES (?, ?, ?, ?)`;

const SELECT_ALL_SPOTTRSITE = `SELECT * FROM SpottrSite`
const SELECT_ALL_SPOTTRNODE = `SELECT * FROM SpottrNode`
const SELECT_ALL_MASTERNODE = `SELECT * FROM MasterNode`
const SELECT_ALL_SLAVENODE = `SELECT * FROM SlaveNode`
const SELECT_ALL_PARKINGSPOT = `SELECT * FROM ParkingSpot`
                                                        
let db = new sqlite3.Database(DBPATH, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database')
    }
})


//
// Create all database tables if they don't already exist
//
exports.createTables = () => {
    db.run(CREATE_SPOTTRSITE_TABLE, (err) => {
        if (err) {
            console.log('SpottrSite table already exists')
        } else {
            console.log('Successfully created SpottrSite table')
        }
    });

    db.run(CREATE_SPOTTRNODE_TABLE, (err) => {
        if (err) {
            console.log('SpottrNode table already exists')
        } else {
            console.log('Successfully created SpottrNode table')
        }
    });
    db.run(CREATE_MASTERNODE_TABLE, (err) => {
        if (err) {
            console.log('MasterNode table already exists')
        } else {
            console.log('Successfully created MasterNode table')
        }
    });
    db.run(CREATE_SLAVENODE_TABLE, (err) => {
        if (err) {
            console.log('SlaveNode table already exists')
        } else {
            console.log('Successfully created SlaveNode table')
        }
    });
    db.run(CREATE_PARKINGSPOT_TABLE, (err) => {
        if (err) {
            console.log('ParkingSpot table already exists')
        } else {
            console.log('Successfully created ParkingSpot table')
        }
    });
}

exports.insert_SpottrSite = (name, address) => {
    db.run(INSERT_SPOTTRSITE, [name, address], (err) => {
        return err;
    })
}

exports.insert_SpottrNode = (name, spottrsite, location, numsensors) => {
    db.run(INSERT_SPOTTRNODE, [name, spottrsite, location, numsensors])
}

exports.insert_MasterNode = (id, hostname) => {
    db.run(INSERT_MASTERNODE, [id, hostname], (err) => {
        return err;
    })
}

exports.insert_SlaveNode = (id, masternode) => {
    db.run(INSERT_SLAVENODE, [id, masternode], (err) => {
        return err;
    })
}

exports.insert_ParkingSpot = (name, spottrnode, sensornum, occupied) => {
    db.run(INSERT_PARKINGSPOT, [name, spottrnode, sensornum, occupied], (err) => {
        return err;
    })
}

exports.selectall_SpottrSite = (callback) => {
    db.all(SELECT_ALL_SPOTTRSITE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.selectall_SpottrNode = (callback) => {
    db.all(SELECT_ALL_SPOTTRNODE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.selectall_MasterNode = (callback) => {
    db.all(SELECT_ALL_MASTERNODE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.selectall_SlaveNode = (callback) => {
    db.all(SELECT_ALL_SLAVENODE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.selectall_ParkingSpot = (callback) => {
    db.all(SELECT_ALL_PARKINGSPOT, [], (err, rows) => {
        callback(err, rows)
    });
}