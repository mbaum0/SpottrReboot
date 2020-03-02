const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")

const websock = require("./websock.js")
var database = require("./database/database.js")
var app = express()

exports.app = app;

app.use(bodyparser.json())
app.use(cors())

const HTTP_PORT = 8000

database.createTables(() => { });


app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({ "message": "Shit Works!" })
    database.spottrSiteDb.insert("RIT", "1 Lomb Memorial Drive", () => { })
    database.spottrSiteDb.insert("Wegmans", "100 Jefferson Road", () => { })
    database.spottrSiteDb.insert("Walmart", "110 Jefferson Road", () => { })
    database.spottrSiteDb.insert("Dave and Busters", "97 Jefferson Road", () => { })

    database.parkingLotDb.insert("CARLSON LOWER", 1, null, () => { })
    database.parkingLotDb.insert("CARLSON UPPER", 1, null, () => { })

    database.spottrNodeDb.insert_MasterNodeComplete("MASTER0", 1, "ANYWHERE", 3, null, "domain1.com", () => { })
    database.spottrNodeDb.insert_MasterNodeComplete("MASTER1", 2, "ANYWHERE", 3, null, "domain2.com", () => { })

    database.spottrNodeDb.insert_SlaveNodeComplete("SLAVE1", 1, "TOP LEFT", 3, null, 1, () => { })
    database.spottrNodeDb.insert_SlaveNodeComplete("SLAVE2", 1, "TOP CENTER", 3, null, 1, () => { })
    database.spottrNodeDb.insert_SlaveNodeComplete("SLAVE3", 1, "TOP RIGHT", 3, null, 1, () => { })

    database.spottrNodeDb.insert_SlaveNodeComplete("SLAVE4", 2, "TOP LEFT", 3, null, 2, () => { })
    database.spottrNodeDb.insert_SlaveNodeComplete("SLAVE5", 2, "TOP CENTER", 3, null, 2, () => { })
    database.spottrNodeDb.insert_SlaveNodeComplete("SLAVE6", 2, "TOP RIGHT", 3, null, 2, () => { })

    database.parkingSpotDb.insert("a0", 1, 0, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("a1", 1, 1, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("a2", 1, 2, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("b0", 2, 0, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("b1", 2, 1, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("b2", 2, 2, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("c0", 3, 0, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("c1", 3, 1, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("c2", 3, 2, 0, 76.01, 81.01, () => { })

    database.parkingSpotDb.insert("d0", 4, 0, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("d1", 4, 1, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("d2", 4, 2, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("e0", 5, 0, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("e1", 5, 1, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("e2", 5, 2, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("f0", 6, 0, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("f1", 6, 1, 0, 76.01, 81.01, () => { })
    database.parkingSpotDb.insert("f2", 6, 2, 0, 76.01, 81.01, () => { })

    database.preferenceDb.insert("defaultSpottrSite", 0, () => { })

});

// ================== SELECT ALL ENDPOINTS =================== //
app.get("/api/spottrsites", (req, res, next) => {
    database.spottrSiteDb.selectall((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrSites: rows })
    })
})

app.get("/api/parkinglots", (req, res, next) => {
    database.parkingLotDb.selectall((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ ParkingLots: rows })
    })
})

app.get("/api/spottrnodes", (req, res, next) => {
    database.spottrNodeDb.selectall_SpottrNode((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrNodes: rows })
    })
})

app.get("/api/masternodes", (req, res, next) => {
    database.spottrNodeDb.selectall_MasterNode((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ MasterNodes: rows })
    })
})

app.get("/api/slavenodes", (req, res, next) => {
    database.spottrNodeDb.selectall_SlaveNode((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SlaveNodes: rows })
    })
})

app.get("/api/parkingspots", (req, res, next) => {
    database.parkingSpotDb.selectall((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ ParkingSpots: rows })
    })
})

app.get("/api/dblogs", (req, res, next) => {
    database.dbLogDb.selectall((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ DbLogs: rows })
    })
})

app.get("/api/preferences", (req, res, next) => {
    database.preferenceDb.selectall((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        var resDict = {}
        for (let i = 0; i < rows.length; i++) {
            resDict[rows[i].key] = rows[i].val
        }
        res.json({ Preferences: resDict })
    })
})

app.get("/api/spottrsyncs", (req, res, next) => {
    database.spottrSyncDb.selectall((err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrSyncs: rows })
    })
})

// ================== SELECT ONE ENDPOINTS =================== //
app.get("/api/spottrsites/:id", (req, res, next) => {
    database.spottrSiteDb.select(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrSite: row })
    })
})

app.get("/api/parkinglots/:id", (req, res, next) => {
    database.parkingLotDb.select(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ ParkingLot: row })
    })
})

app.get("/api/spottrnodes/:id", (req, res, next) => {
    database.spottrNodeDb.select_SpottrNode(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrNode: row })
    })
})

app.get("/api/masternodes/:id", (req, res, next) => {
    database.spottrNodeDb.select_MasterNode(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ MasterNode: row })
    })
})

app.get("/api/slavenodes/:id", (req, res, next) => {
    database.spottrNodeDb.select_SlaveNode(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SlaveNode: row })
    })
})

app.get("/api/parkingspots/:id", (req, res, next) => {
    database.parkingSpotDb.select(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ ParkingSpot: row })
    })
})

app.get("/api/preferences/:key", (req, res, next) => {
    database.preferenceDb.select(req.params.key, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        let resDict = {}
        resDict[row.key] = row.val
        res.json({ Preference: resDict });
    })
})

app.get("/api/spottrsyncs/:id", (req, res, next) => {
    database.spottrSyncDb.select(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrSync: row })
    })
})

// ================ SELECT FILTER ENDPOINTS ================== //

app.get("/api/spottrsites/:id/parkinglots", (req, res, next) => {
    database.parkingLotDb.select_withSpottrSite(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ ParkingLot: row })
    })
})

app.get("/api/parkinglots/:id/spottrnodes", (req, res, next) => {
    database.spottrNodeDb.select_SpottrNodeWithParkingLot(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SpottrNode: row })
    })
})

app.get("/api/parkinglots/:id/masternodes", (req, res, next) => {
    database.spottrNodeDb.select_MasterNodeWithParkingLot(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ MasterNode: row })
    })
})

app.get("/api/parkinglots/:id/slavenodes", (req, res, next) => {
    database.spottrNodeDb.select_SlaveNodeWithParkingLot(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SlaveNode: row })
    })
})

app.get("/api/parkinglots/:id/parkingspots", (req, res, next) => {
    database.parkingSpotDb.select_ParkingSpotWithParkingLot(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ ParkingSpot: row })
    })
})

app.get("/api/masternodes/:id/slavenodes", (req, res, next) => {
    database.spottrNodeDb.select_SlaveNodeWithMasterNode(req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({ SlaveNode: row })
    })
})

// ==================== INSERT ENDPOINTS ===================== //
app.post("/api/spottrsites", (req, res, next) => {
    database.spottrSiteDb.insert(req.body.sitename, req.body.address, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.post("/api/parkinglots", (req, res, next) => {
    database.parkingLotDb.insert(req.body.lotname, req.body.spottrsite, req.body.perimeter, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.post("/api/masternodes", (req, res, next) => {
    database.spottrNodeDb.insert_MasterNodeComplete(req.body.nodename, req.body.parkinglot, req.body.location, req.body.numsensors, req.body.spottruuid, req.body.hostname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.post("/api/slavenodes", (req, res, next) => {
    database.spottrNodeDb.insert_SlaveNodeComplete(req.body.nodename, req.body.parkinglot, req.body.location, req.body.numsensors, req.body.spottruuid, req.body.masternode, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.post("/api/parkingspots", (req, res, next) => {
    database.parkingSpotDb.insert(req.body.spotname, req.body.spottrnode, req.body.sensornum, req.body.occupied, req.body.longitude, req.body.latitude, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.post("/api/preferences", (req, res, next) => {
    database.preferenceDb.insert(req.body.key, req.body.val, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

// ==================== DELETE ENDPOINTS ===================== //
app.delete("/api/spottrsites/:id", (req, res, next) => {
    database.spottrSiteDb.delete(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

app.delete("/api/parkinglots/:id", (req, res, next) => {
    database.parkingLotDb.delete(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

app.delete("/api/spottrnodes/:id", (req, res, next) => {
    database.spottrNodeDb.delete_SpottrNode(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

app.delete("/api/parkingspots/:id", (req, res, next) => {
    database.parkingSpotDb.delete(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

app.delete("/api/dblogs", (req, res, next) => {
    database.dbLogDb.delete((err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

app.delete("/api/preferences/:key", (req, res, next) => {
    database.preferenceDb.delete(req.params.key, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

app.delete("/api/spottrsyncs/:id", (req, res, next) => {
    database.spottrSyncDb.delete(req.params.id, (err, changes) => {
        if (err) {
            res.status(400).json({ "error": err.message })
        }
        else if (changes == 0) {
            res.status(404).json()
        }
        else {
            res.status(204).json()
        }
    })
})

// ==================== UPDATE ENDPOINTS ===================== //
app.patch("/api/spottrsites/:id", (req, res, next) => {
    database.spottrSiteDb.update(req.params.id, req.body.sitename, req.body.address, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.patch("/api/parkinglots/:id", (req, res, next) => {
    database.parkingLotDb.update(req.params.id, req.body.lotname, req.body.spottrsite, req.body.perimeter, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.patch("/api/maternodes/:id", (req, res, next) => {
    database.spottrNodeDb.update_MasterNode(req.params.id, req.body.name, req.body.parkinglot, req.body.location, req.body.numsensors, req.body.spottruuid, req.body.hostname, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.patch("/api/slavenodes/:id", (req, res, next) => {
    database.spottrNodeDb.update_SlaveNode(req.params.id, req.body.name, req.body.parkinglot, req.body.location, req.body.numsensors, req.body.spottruuid, req.body.masternode, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.patch("/api/parkingspots/:id", (req, res, next) => {
    database.spottrNodeDb.update_SlaveNode(req.params.id, req.body.name, req.body.spottrnode, req.body.sensornum, req.body.occupied, req.body.longitude, req.body.latitude, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.patch("/api/preferences/:key", (req, res, next) => {
    database.preferenceDb.update(req.params.key, req.query.val, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

app.patch("/api/spottrsyncs/:id", (req, res, next) => {
    database.spottrSyncDb.update(req.params.id, req.body.state, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json(row)
    })
})

// SPOTTR Sync
app.post("/api/spottrsync", (req, res, next) => {
    database.spottrSyncDb.select_withUUID(req.body.uuid, (err, row) => {
        if (row == null) {
            // if the uuid is not defined, return a failure
            if (req.body.uuid == null) {
                res.status(422).json({ "error": "POST body is missing uuid field" })
            } else {
                // make a new entry
                database.spottrSyncDb.insert(req.body.uuid, 0, (err, row) => {
                    // send back the state of the sync
                    res.json({ SpottrSync: row })

                    // let the front end know we have a request
                    websock.broadcastSockMsg('SPOTTRSYNC', row)
                })
            }

        } else {
            // return the existing entry
            res.json({ SpottrSync: row })
        }
    })
})

// SPOTTR SyncTopology
app.post("/api/toposync/:uuid", (req, res, next) => {
    if (req.body.SyncTopology == null) {
        // uh oh
        res.status(422).json({ "error": "POST body is missing SyncTopology field" })
    } else {
        // we good. This is going to be a bit of work, so lets use a function
        updateTopology(req.params.uuid, req.connection.remoteAddress, req.body.SyncTopology)
        res.status(204).json()
    }
})

// Default error message
app.get("/api/error", (req, res, next) => {
    res.status(400).json({ "error": "sample error message" })
})

// Default response for any other request
app.use((req, res) => {
    res.status(404)
});

// masterUUID - the UUID of the uplink node which made the post
// reqHost - the hostname of the request origin
// topology - the topology array
function updateTopology(masterUUID, reqHost, topology) {
    // check if this node is approved
    database.spottrSyncDb.select_withUUID(masterUUID, (err, row) => {
        if (row == null) {
            // this uuid is not registered, ignore
            console.log(`Unable to update topology, ${masterUUID} is not a registered UUID`)
        } else if (row.state == 0 || row.state == 2) {
            // this uuid has not been approved, ignore
            console.log(`Unable to update topology, ${masterUUID} is not an approved UUID`)
        } else {
            // masterUUID is registered, continue
            for (const i in topology) {
                let nodeUUID = topology[i].uuid // NOTE nodeUUID should equal masterUUID for masternodes
                let nodeType = topology[i].type
                let numSensors = topology[i].numsensors

                // check if this node already exists in the system
                database.spottrNodeDb.select_SpottrNodeWithSyncID(nodeUUID, (err, row) => {
                    if (row == null) {
                        // create a new node
                        if (nodeType === "uplink") {
                            // make a new master node
                            database.spottrNodeDb.insert_MasterNodeComplete(nodeUUID, null, null, numSensors, masterUUID, reqHost, (err, row) => {
                                if (err) {
                                    console.log(`Failed to create new master node ${err}`)
                                } else {
                                    //successfully added new master node
                                    console.log(`Successfully created new master node ${nodeUUID}`)
                                }
                            })
                        } else if (nodeType === "sensor") {
                            // look up the master node for this sensor
                            database.spottrNodeDb.select_SpottrNodeWithSyncID(masterUUID, (err, row) => {
                                if (row == null) {
                                    // master node doesn't exist yet
                                    console.log(`Cannot create slave node ${nodeUUID} with master ${masterUUID}. The master node doesn't exist yet`)
                                } else {
                                    let masterID = row.id;
                                    // make a new slave node
                                    database.spottrNodeDb.insert_SlaveNodeComplete(nodeUUID, null, null, numSensors, nodeUUID, masterID, (err, row) => {
                                        if (err) {
                                            console.log(`Failed to create new slave node ${err}`)
                                        } else {
                                            // successfully added new slave node
                                            console.log(`Successfully created new slave node ${nodeUUID}`)
                                        }
                                    })
                                }
                            })
                        } else {
                            console.log(`Invalid nodeType: ${nodeType} specified. No node has been created`)
                        }
                    } else {
                        // update the existing node
                        console.log(`Updating existing node ${nodeUUID}`)
                        if (nodeType === "uplink") {
                            // update a master node
                            let masterNodeDbID = row.id;
                            database.spottrNodeDb.update_MasterNode(masterNodeDbID, null, null, null, numSensors, nodeUUID, reqHost, (err, row) => {
                                if (err) {
                                    console.log(`Failed to update master node with uuid ${nodeUUID} ${err}`)
                                } else {
                                    console.log(`Successfully updated master node with uuid ${nodeUUID}`)
                                }
                            })
                        } else if (nodeType === "sensor") {
                            // update sensor node
                            let slaveNodeDbID = row.id;
                            database.spottrNodeDb.update_SlaveNode(slaveNodeDbID, null, null, null, numSensors, nodeUUID, masterUUID, (err, row) => {
                                if (err) {
                                    console.log(`Failed to update slave node with uuid ${nodeUUID} ${err}`)
                                } else {
                                    console.log(`Successfully updated slave node with uuid ${nodeUUID}`)
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}