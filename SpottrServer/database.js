var sqlite3 = require('sqlite3').verbose()
var websock = require("./websock.js")

const DBPATH = "db.sqlite"


const CREATE_SPOTTRSITE_TABLE = `CREATE TABLE SpottrSite (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                          sitename TEXT,
                                                          address TEXT);`

const CREATE_PARKINGLOT_TABLE = `CREATE TABLE ParkingLot (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                          lotname TEXT,
                                                          spottrsite INTEGER,
                                                          perimeter TEXT,
                                                          FOREIGN KEY (spottrsite) REFERENCES SpottrSite (id) ON DELETE CASCADE);`

const CREATE_SPOTTRNODE_TABLE = `CREATE TABLE SpottrNode (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                          nodename TEXT,
                                                          parkinglot INTEGER,
                                                          location TEXT,
                                                          numsensors INTEGER,
                                                          FOREIGN KEY (parkinglot) REFERENCES ParkingLot (id) ON DELETE CASCADE);`

const CREATE_MASTERNODE_TABLE = `CREATE TABLE MasterNode (id INTEGER PRIMARY KEY,
                                                          hostname TEXT,
                                                          FOREIGN KEY (id) REFERENCES SpottrNode (id) ON DELETE CASCADE);`

const CREATE_SLAVENODE_TABLE = `CREATE TABLE SlaveNode (id INTEGER PRIMARY KEY,
                                                        masternode INTEGER,
                                                        FOREIGN KEY (id) REFERENCES SpottrNode (id) ON DELETE CASCADE,
                                                        FOREIGN KEY (masternode) REFERENCES MasterNode (id));`

const CREATE_PARKINGSPOT_TABLE = `CREATE TABLE ParkingSpot (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                            spotname TEXT,
                                                            spottrnode INTEGER,
                                                            sensornum INTEGER,
                                                            occupied INTEGER,
                                                            longitude REAL,
                                                            latitude REAL,
                                                            FOREIGN KEY (spottrnode) REFERENCES SpottrNode (id) ON DELETE CASCADE);`

const CREATE_DBLOG_TABLE = `CREATE TABLE DbLog (id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                                                event TEXT,
                                                type TEXT,
                                                res_num INTEGER,
                                                error INTEGER,
                                                note TEXT);`

const INSERT_SPOTTRSITE = `INSERT INTO SpottrSite (sitename, address) VALUES (?, ?);`
const INSERT_PARKINGLOT = `INSERT INTO ParkingLot (lotname, spottrsite, perimeter) VALUES (?, ?, ?);`
const INSERT_SPOTTRNODE = `INSERT INTO SpottrNode (nodename, parkinglot, location, numsensors) VALUES (?, ?, ?, ?);`
const INSERT_MASTERNODE = `INSERT INTO MasterNode (id, hostname) VALUES (?, ?);`
const INSERT_SLAVENODE = `INSERT INTO SlaveNode (id, masternode) VALUES (?, ?);`
const INSERT_PARKINGSPOT = `INSERT INTO ParkingSpot (spotname, spottrnode, sensornum, occupied, longitude, latitude) VALUES (?, ?, ?, ?, ?, ?);`

const INSERT_DBLOG = `INSERT INTO DbLog (event, type, res_num, error, note) VALUES (?, ?, ?, ?, ?);`

const UPDATE_SPOTTRSITE = `UPDATE SpottrSite SET sitename = COALESCE(?, sitename), address=COALESCE(?, address) WHERE id=?;`
const UPDATE_PARKINGLOT = `UPDATE ParkingLot SET lotname=COALESCE(?,lotname), spottrsite=COALESCE(?, spottrsite), perimeter=COALESCE(?, perimeter) WHERE id=?;`
const UPDATE_SPOTTRNODE = `UPDATE SpottrNode SET nodename=COALESCE(?, nodename), parkinglot=COALESCE(?, parkinglot), location=COALESCE(?, location), numsensors=COALESCE(?, numsensors) WHERE id=?;`
const UPDATE_MASTERNODE = `UPDATE MasterNode SET hostname=COALESCE(?, hostname), WHERE id=?;`
const UPDATE_SLAVENODE = `UPDATE SlaveNode SET masternode=COALESCE(?, masternode), WHERE id=?;`
const UPDATE_PARKINGSPOT = `UPDATE ParkingSpot SET spotname=COALESCE(?, spotname), spottrnode=COALESCE(?, spottrnode), sensornum=COALESCE(?, sensornum), occupied=COALESCE(?, occupied), longitude=COALESCE(?, longitude), latitude=COALESCE(?, latitude) WHERE id=?;`

const SELECT_ALL_SPOTTRSITE = `SELECT * FROM SpottrSite;`
const SELECT_ALL_PARKINGLOT = `SELECT * FROM ParkingLot;`
const SELECT_ALL_SPOTTRNODE = `SELECT * FROM SpottrNode;`
const SELECT_ALL_MASTERNODE = `SELECT * FROM MasterNode INNER JOIN SpottrNode ON SpottrNode.id = MasterNode.id;`
const SELECT_ALL_SLAVENODE = `SELECT * FROM SlaveNode INNER JOIN SpottrNode ON SpottrNode.id = SlaveNode.id;`
const SELECT_ALL_PARKINGSPOT = `SELECT p.id, p.spotname, p.spottrnode, p.sensornum, p.occupied, p.longitude, p.latitude, n.parkinglot FROM ParkingSpot p, SpottrNode n WHERE p.spottrnode = n.id;`

const SELECT_ALL_DBLOG = `SELECT * FROM DbLog;`

const SELECT_SPOTTRSITE = `SELECT * FROM SpottrSite WHERE id=?;`
const SELECT_PARKINGLOT = `SELECT * FROM ParkingLot WHERE id=?;`
const SELECT_SPOTTRNODE = `SELECT * FROM SpottrNode WHERE id=?;`
const SELECT_MASTERNODE = `SELECT * FROM MasterNode INNER JOIN SpottrNode ON SpottrNode.id = MasterNode.id WHERE MasterNode.id=?;`
const SELECT_SLAVENODE = `SELECT * FROM SlaveNode INNER JOIN SpottrNode ON SpottrNode.id = SlaveNode.id WHERE SlaveNode.id=?;`
const SELECT_PARKINGSPOT = `SELECT p.id, p.spotname, p.spottrnode, p.sensornum, p.occupied, p.longitude, p.latitude, n.parkinglot FROM ParkingSpot p, SpottrNode n WHERE p.spottrnode = n.id AND p.id=?;`

const SELECT_DBLOG = `SELECT * FROM DbLog WHERE id=?;`

const SELECT_PARKINGLOT_WITH_SPOTTRSITE = `SELECT * FROM ParkingLot WHERE spottrsite=?;`
const SELECT_SPOTTRNODE_WITH_PARKINGLOT = `SELECT * FROM SpottrNode WHERE parkinglot=?;`
const SELECT_MASTERNODE_WITH_PARKINGLOT = `SELECT * FROM MasterNode INNER JOIN SpottrNode ON SpottrNode.id = MasterNode.id WHERE parkinglot=?;`
const SELECT_SLAVENODE_WITH_PARKINGLOT = `SELECT * FROM SlaveNode INNER JOIN SpottrNode on SpottrNode.id = SlaveNode.id WHERE parkinglot=?;`
const SELECT_PARKINGSPOT_WITH_PARKINGLOT = `SELECT p.id, p.spotname, p.spottrnode, p.sensornum, p.occupied, p.longitude, p.latitude, n.parkinglot FROM ParkingSpot p, SpottrNode n WHERE p.spottrnode = n.id AND n.parkinglot=?;`
const SELECT_SLAVENODE_WITH_MASTERNODE = `SELECT * FROM SlaveNode INNER JOIN SpottrNode on SpottrNode.id = SlaveNode.id WHERE masternode=?;`

const DELETE_SPOTTRSITE = `DELETE FROM SpottrSite WHERE id=?;`
const DELETE_PARKINGLOT = `DELETE FROM ParkingLot WHERE id=?;`
const DELETE_SPOTTRNODE = `DELETE FROM SpottrNode WHERE id=?;`
const DELETE_PARKINGSPOT = `DELETE FROM ParkingSpot WHERE id=?;`

const DELETE_ALL_DBLOG = `DELETE FROM DbLog;`

// Create database
let db = new sqlite3.Database(DBPATH, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database')
    }
})


// Create all database tables if they don't already exist
exports.createTables = () => {
    db.run(CREATE_SPOTTRSITE_TABLE, (err) => {
        if (err) {
            console.log('SpottrSite table already exists')
        } else {
            console.log('Successfully created SpottrSite table')
        }
    });
    db.run(CREATE_PARKINGLOT_TABLE, (err) => {
        if (err) {
            console.log('ParkingLot table already exists')
        } else {
            console.log('Successfully created ParkingLot table')
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
    db.run(CREATE_DBLOG_TABLE, (err) => {
        if (err) {
            console.log('DbLog table already exists')
        } else {
            console.log('Successfully create DbLog table')
        }
    })
}

// ===================== INSERT FUNCTIONS ===================== //
exports.insert_SpottrSite = (name, address, callback) => {
    db.run(INSERT_SPOTTRSITE, [name, address], function (err) {
        insert_DbLog("INSERT", "SpottrSite", this.lastID, err, `sitename: ${name}, address: ${address}`)
        exports.select_SpottrSite(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_ParkingLot = (lotname, spottrsite, perimeter, callback) => {
    db.run(INSERT_PARKINGLOT, [lotname, spottrsite, perimeter], function (err) {
        insert_DbLog("INSERT", "ParkingLot", this.lastID, err, `lotname: ${lotname}, spottrsite: ${spottrsite}, perimeter: ${perimeter}`)
        exports.select_ParkingLot(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_SpottrNode = (name, parkinglot, location, numsensors, callback) => {
    db.run(INSERT_SPOTTRNODE, [name, parkinglot, location, numsensors], function (err) {
        insert_DbLog("INSERT", "SpottrNode", this.lastID, err, null)
        exports.select_SpottrNode(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_MasterNode = (id, hostname, callback) => {
    db.run(INSERT_MASTERNODE, [id, hostname], function (err) {
        insert_DbLog("INSERT", "MasterNode", this.lastID, err, null)
        exports.select_MasterNode(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_SlaveNode = (id, masternode, callback) => {
    db.run(INSERT_SLAVENODE, [id, masternode], function (err) {
        insert_DbLog("INSERT", "SlaveNode", this.lastID, err, null)
        exports.select_SlaveNode(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_MasterNodeComplete = (name, parkinglot, location, numsensors, hostname, callback) => {
    db.run(INSERT_SPOTTRNODE, [name, parkinglot, location, numsensors], function (err) {
        insert_DbLog("INSERT", "SpottrNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}`)
        db.run(INSERT_MASTERNODE, [this.lastID, hostname], function (err) {
            insert_DbLog("INSERT", "MasterNode", this.lastID, err, `hostname: ${hostname}`)
            exports.select_MasterNode(this.lastID, (err, row) => {
                callback(err, row)
            })
        })
    })
}

exports.insert_SlaveNodeComplete = (name, parkinglot, location, numsensors, masternode, callback) => {
    db.run(INSERT_SPOTTRNODE, [name, parkinglot, location, numsensors], function (err) {
        insert_DbLog("INSERT", "SpottNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}`)
        db.run(INSERT_SLAVENODE, [this.lastID, masternode], function (err) {
            insert_DbLog("INSERT", "SlaveNode", this.lastID, err, `masternode: ${masternode}`)
            exports.select_SlaveNode(this.lastID, (err, row) => {
                callback(err, row)
            })
        })
    })
}

exports.insert_ParkingSpot = (name, spottrnode, sensornum, occupied, longitude, latitude, callback) => {
    db.run(INSERT_PARKINGSPOT, [name, spottrnode, sensornum, occupied, longitude, latitude], function (err) {
        insert_DbLog("INSERT", "ParkingSpot", this.lastID, err, `spotname: ${name}, spottrnode: ${spottrnode}, sensornum: ${sensornum}, occupied: ${occupied}, longitude: ${longitude}, latitude: ${latitude}`)
        exports.select_ParkingSpot(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

// non-export because db log can only be created here
function insert_DbLog(event, type, res_num, error, note) {
    db.run(INSERT_DBLOG, [event, type, res_num, error, note], function (err) {
        exports.select_DbLog(this.lastID, (err, row) => {
            websock.broadcastSockMsg('DBLOG', row)
        })
    })
}

// ================== SELECT ALL FUNCTIONS =================== //
exports.selectall_SpottrSite = (callback) => {
    db.all(SELECT_ALL_SPOTTRSITE, [], (err, rows) => {
        callback(err, rows)
    });
}

exports.selectall_ParkingLot = (callback) => {
    db.all(SELECT_ALL_PARKINGLOT, [], (err, rows) => {
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

exports.selectall_DbLog = (callback) => {
    db.all(SELECT_ALL_DBLOG, [], (err, rows) => {
        callback(err, rows)
    });
}

// ================== SELECT ONE FUNCTIONS =================== //
exports.select_SpottrSite = (id, callback) => {
    db.get(SELECT_SPOTTRSITE, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_ParkingLot = (id, callback) => {
    db.get(SELECT_PARKINGLOT, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_SpottrNode = (id, callback) => {
    db.get(SELECT_SPOTTRNODE, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_MasterNode = (id, callback) => {
    db.get(SELECT_MASTERNODE, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_SlaveNode = (id, callback) => {
    db.get(SELECT_SLAVENODE, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_ParkingSpot = (id, callback) => {
    db.get(SELECT_PARKINGSPOT, [id], (err, row) => {
        callback(err, row)
    })
}

exports.select_DbLog = (id, callback) => {
    db.get(SELECT_DBLOG, [id], (err, row) => {
        callback(err, row)
    })
}

// ================ SELECT FILTER ENDPOINTS ================== //

exports.select_ParkingLotWithSpottrSite = (spottrsite, callback) => {
    db.all(SELECT_PARKINGLOT_WITH_SPOTTRSITE, [spottrsite], (err, row) => {
        callback(err, row)
    })
}

exports.select_SpottrNodeWithParkingLot = (parkinglot, callback) => {
    db.all(SELECT_SPOTTRNODE_WITH_PARKINGLOT, [parkinglot], (err, row) => {
        callback(err, row)
    })
}

exports.select_MasterNodeWithParkingLot = (parkinglot, callback) => {
    db.all(SELECT_MASTERNODE_WITH_PARKINGLOT, [parkinglot], (err, row) => {
        callback(err, row)
    })
}

exports.select_SlaveNodeWithParkingLot = (parkinglot, callback) => {
    db.all(SELECT_SLAVENODE_WITH_PARKINGLOT, [parkinglot], (err, row) => {
        callback(err, row)
    })
}

exports.select_ParkingSpotWithParkingLot = (parkinglot, callback) => {
    db.all(SELECT_PARKINGSPOT_WITH_PARKINGLOT, [parkinglot], (err, row) => {
        callback(err, row)
    })
}

exports.select_SlaveNodeWithMasterNode = (masternode, callback) => {
    db.all(SELECT_SLAVENODE_WITH_MASTERNODE, [masternode], (err, row) => {
        callback(err, row)
    })
}

// ===================== DELETE FUNCTIONS ===================== //
exports.delete_SpottrSite = (id, callback) => {
    db.run(DELETE_SPOTTRSITE, [id], function (err) {
        insert_DbLog("DELETE", "SpottrSite", this.lastID, err, null)
        callback(err, this.changes)
    })
}

exports.delete_ParkingLot = (id, callback) => {
    db.run(DELETE_PARKINGLOT, [id], function (err) {
        insert_DbLog("DELETE", "ParkingLot", this.lastID, err, null)
        callback(err, this.changes)
    })
}

exports.delete_SpottrNode = (id, callback) => {
    db.run(DELETE_SPOTTRNODE, [id], function (err) {
        insert_DbLog("DELETE", "SpottrNode", this.lastID, err, null)
        callback(err, this.changes)
    })
}
exports.delete_ParkingSpot = (id, callback) => {
    db.run(DELETE_PARKINGSPOT, [id], function (err) {
        insert_DbLog("DELETE", "ParkingSpot", this.lastID, err, null)
        callback(err, this.changes)
    })
}

exports.delete_DbLog = (callback) => {
    db.run(DELETE_ALL_DBLOG, [], function (err) {
        callback(err, this.changes)
    })
}

// ===================== UPDATE FUNCTIONS ===================== //
exports.update_SpottrSite = (id, sitename, address, callback) => {
    db.run(UPDATE_SPOTTRSITE, [sitename, address, id], (err) => {
        insert_DbLog("UPDATE", "SpottrSite", this.lastID, err, `sitename: ${sitename}, address: ${address}`)
        exports.select_SpottrSite(id, (err, row) => {
            callback(err, row)
        })
    })
}

exports.update_ParkingLot = (id, lotname, spottrsite, perimeter, callback) => {
    insert_DbLog("UPDATE", "ParkingLot", this.lastID, err, `lotname: ${lotname}, spottrsite: ${spottrsite}, perimeter: ${perimeter}`)
    db.run(UPDATE_PARKINGLOT, [lotname, spottrsite, perimeter, id], (err) => {
        exports.select_ParkingLot(id, (err, row) => {
            callback(err, row)
        })
    })
}

exports.update_MasterNode = (id, name, parkinglot, location, numsensors, hostname, callback) => {
    db.run(UPDATE_SPOTTRNODE, [name, parkinglot, location, numsensors, id], function (err) {
        insert_DbLog("UPDATE", "SpottrNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}`)
        db.run(UPDATE_MASTERNODE, [hostname, id], function (err) {
            insert_DbLog("UPDATE", "MasterNode", this.lastID, err, `hostname: ${hostname}`)
            exports.select_MasterNode(id, (err, row) => {
                callback(err, row)
            })
        })
    })
}

exports.update_SlaveNode = (id, name, parkinglot, location, numsensors, masternode, callback) => {
    db.run(UPDATE_SPOTTRNODE, [name, parkinglot, location, numsensors, id], function (err) {
        insert_DbLog("UPDATE", "SpottrNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}`)
        db.run(UPDATE_SLAVENODE, [masternode, id], function (err) {
            insert_DbLog("UPDATE", "SlaveNode", this.lastID, err, `masternode: ${masternode}`)
            exports.select_SlaveNode(id, (err, row) => {
                callback(err, row)
            })
        })
    })
}

exports.update_ParkingSpot = (id, name, spottrnode, sensornum, occupied, longitude, latitude, callback) => {
    db.run(UPDATE_PARKINGSPOT, [name, spottrnode, sensornum, occupied, longitude, latitude, id], function (err) {
        insert_DbLog("UPDATE", "ParkingSpot", this.lastID, err, `spotname: ${name}, spottrnode: ${spottrnode}, sensornum: ${sensornum}, occupied: ${occupied}, longitude: ${longitude}, latitude: ${latitude}`)
        exports.select_ParkingSpot(id, (err, row) => {
            callback(err, row)
        })
    })
}

