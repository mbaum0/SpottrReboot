const CREATE_SPOTTRNODE_TABLE = `CREATE TABLE SpottrNode (id INTEGER PRIMARY KEY AUTOINCREMENT,
    nodename TEXT,
    parkinglot INTEGER,
    location TEXT,
    numsensors INTEGER,
    spottrsyncid INTEGER,
    FOREIGN KEY (parkinglot) REFERENCES ParkingLot (id) ON DELETE CASCADE,
    FOREIGN KEY (spottrsyncid) REFERENCES SpottrSync (id) ON DELETE SET NULL);`

const CREATE_MASTERNODE_TABLE = `CREATE TABLE MasterNode (id INTEGER PRIMARY KEY,
    hostname TEXT,
    FOREIGN KEY (id) REFERENCES SpottrNode (id) ON DELETE CASCADE);`

const CREATE_SLAVENODE_TABLE = `CREATE TABLE SlaveNode (id INTEGER PRIMARY KEY,
  masternode INTEGER,
  FOREIGN KEY (id) REFERENCES SpottrNode (id) ON DELETE CASCADE,
  FOREIGN KEY (masternode) REFERENCES MasterNode (id));`


const INSERT_SPOTTRNODE = `INSERT INTO SpottrNode (nodename, parkinglot, location, numsensors, spottrsyncid) VALUES (?, ?, ?, ?, ?);`
const INSERT_MASTERNODE = `INSERT INTO MasterNode (id, hostname) VALUES (?, ?);`
const INSERT_SLAVENODE = `INSERT INTO SlaveNode (id, masternode) VALUES (?, ?);`

const UPDATE_SPOTTRNODE = `UPDATE SpottrNode SET nodename=COALESCE(?, nodename), parkinglot=COALESCE(?, parkinglot), location=COALESCE(?, location), numsensors=COALESCE(?, numsensors), spottrsyncid=COALESCE(?, spottrsyncid) WHERE id=?;`
const UPDATE_MASTERNODE = `UPDATE MasterNode SET hostname=COALESCE(?, hostname), WHERE id=?;`
const UPDATE_SLAVENODE = `UPDATE SlaveNode SET masternode=COALESCE(?, masternode), WHERE id=?;`

const SELECT_ALL_SPOTTRNODE = `SELECT * FROM SpottrNode;`
const SELECT_ALL_MASTERNODE = `SELECT * FROM MasterNode INNER JOIN SpottrNode ON SpottrNode.id = MasterNode.id;`
const SELECT_ALL_SLAVENODE = `SELECT * FROM SlaveNode INNER JOIN SpottrNode ON SpottrNode.id = SlaveNode.id;`

const SELECT_SPOTTRNODE = `SELECT * FROM SpottrNode WHERE id=?;`
const SELECT_MASTERNODE = `SELECT * FROM MasterNode INNER JOIN SpottrNode ON SpottrNode.id = MasterNode.id WHERE MasterNode.id=?;`
const SELECT_SLAVENODE = `SELECT * FROM SlaveNode INNER JOIN SpottrNode ON SpottrNode.id = SlaveNode.id WHERE SlaveNode.id=?;`

const SELECT_SPOTTRNODE_WITH_PARKINGLOT = `SELECT * FROM SpottrNode WHERE parkinglot=?;`
const SELECT_MASTERNODE_WITH_PARKINGLOT = `SELECT * FROM MasterNode INNER JOIN SpottrNode ON SpottrNode.id = MasterNode.id WHERE parkinglot=?;`
const SELECT_SLAVENODE_WITH_PARKINGLOT = `SELECT * FROM SlaveNode INNER JOIN SpottrNode on SpottrNode.id = SlaveNode.id WHERE parkinglot=?;`
const SELECT_SLAVENODE_WITH_MASTERNODE = `SELECT * FROM SlaveNode INNER JOIN SpottrNode on SpottrNode.id = SlaveNode.id WHERE masternode=?;`

const DELETE_SPOTTRNODE = `DELETE FROM SpottrNode WHERE id=?;`

const dbLogDb = require('./dbLogDb')
var db = null;

exports.init = (dbHandle) => {
    db = dbHandle;
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
}

exports.insert_SpottrNode = (name, parkinglot, location, numsensors, spottrsyncid, callback) => {
    db.run(INSERT_SPOTTRNODE, [name, parkinglot, location, numsensors, spottrsyncid], function (err) {
        dbLogDb.insert("INSERT", "SpottrNode", this.lastID, err, null)
        exports.select(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_MasterNode = (id, hostname, callback) => {
    db.run(INSERT_MASTERNODE, [id, hostname], function (err) {
        dbLogDb.insert("INSERT", "MasterNode", this.lastID, err, null)
        exports.select_MasterNode(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_SlaveNode = (id, masternode, callback) => {
    db.run(INSERT_SLAVENODE, [id, masternode], function (err) {
        dbLogDb.insert("INSERT", "SlaveNode", this.lastID, err, null)
        exports.select_SlaveNode(this.lastID, (err, row) => {
            callback(err, row)
        })
    })
}

exports.insert_MasterNodeComplete = (name, parkinglot, location, numsensors, spottrsyncid, hostname, callback) => {
    db.run(INSERT_SPOTTRNODE, [name, parkinglot, location, numsensors, spottrsyncid], function (err) {
        dbLogDb.insert("INSERT", "SpottrNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}, spottrsyncid: ${spottrsyncid}`)
        db.run(INSERT_MASTERNODE, [this.lastID, hostname], function (err) {
            dbLogDb.insert("INSERT", "MasterNode", this.lastID, err, `hostname: ${hostname}`)
            exports.select_MasterNode(this.lastID, (err, row) => {
                callback(err, row)
            })
        })
    })
}

exports.insert_SlaveNodeComplete = (name, parkinglot, location, numsensors, spottrsyncid, masternode, callback) => {
    db.run(INSERT_SPOTTRNODE, [name, parkinglot, location, numsensors], function (err) {
        dbLogDb.insert("INSERT", "SpottNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}, spottrsyncid: ${spottrsyncid}`)
        db.run(INSERT_SLAVENODE, [this.lastID, masternode], function (err) {
            dbLogDb.insert("INSERT", "SlaveNode", this.lastID, err, `masternode: ${masternode}`)
            exports.select_SlaveNode(this.lastID, (err, row) => {
                callback(err, row)
            })
        })
    })
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

exports.select_SlaveNodeWithMasterNode = (masternode, callback) => {
    db.all(SELECT_SLAVENODE_WITH_MASTERNODE, [masternode], (err, row) => {
        callback(err, row)
    })
}

exports.delete_SpottrNode = (id, callback) => {
    db.run(DELETE_SPOTTRNODE, [id], function (err) {
        if (this.changes == 0) {
            dbLogDb.insert("DELETE", "SpottrNode", id, 1, "Resource does not exist")
        } else {
            dbLogDb.insert("DELETE", "SpottrNode", id, err, null)
        }
        callback(err, this.changes)
    })
}

exports.update_MasterNode = (id, name, parkinglot, location, numsensors, spottrsyncid, hostname, callback) => {
    db.run(UPDATE_SPOTTRNODE, [name, parkinglot, location, numsensors, id], function (err) {
        dbLogDb.insert("UPDATE", "SpottrNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}, spottrsyncid: ${spottrsyncid}`)
        db.run(UPDATE_MASTERNODE, [hostname, id], function (err) {
            dbLogDb.insert("UPDATE", "MasterNode", this.lastID, err, `hostname: ${hostname}`)
            exports.select_MasterNode(id, (err, row) => {
                callback(err, row)
            })
        })
    })
}

exports.update_SlaveNode = (id, name, parkinglot, location, numsensors, spottrsyncid, masternode, callback) => {
    db.run(UPDATE_SPOTTRNODE, [name, parkinglot, location, numsensors, id], function (err) {
        dbLogDb.insert("UPDATE", "SpottrNode", this.lastID, err, `nodename: ${name}, parkinglot: ${parkinglot}, location: ${location}, numsensors: ${numsensors}, spottrsyncid: ${spottrsyncid}`)
        db.run(UPDATE_SLAVENODE, [masternode, id], function (err) {
            dbLogDb.insert("UPDATE", "SlaveNode", this.lastID, err, `masternode: ${masternode}`)
            exports.select_SlaveNode(id, (err, row) => {
                callback(err, row)
            })
        })
    })
}
