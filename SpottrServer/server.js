var express = require("express")
var app = express()

var database = require("./database.js")

var HTTP_PORT = 8000

database.createTables( () => {});


app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});

app.get("/", (req, res, next) => {
    res.json({"message": "Shit Works!"})
    database.insert_SpottrSite("RIT", "1 Lomb Memorial Drive")

    database.insert_ParkingLot("CARLSON LOWER", 1, "[]")
    database.insert_ParkingLot("CARLSON UPPER", 1, "[]")

    database.insert_MasterNodeComplete("MASTER0", 1, "ANYWHERE", 3, "domain1.com")
    database.insert_MasterNodeComplete("MASTER1", 2, "ANYWHERE", 3, "domain2.com")

    database.insert_SlaveNodeComplete("SLAVE1", 1, "TOP LEFT", 3, 1)
    database.insert_SlaveNodeComplete("SLAVE2", 1, "TOP CENTER", 3, 1)
    database.insert_SlaveNodeComplete("SLAVE3", 1, "TOP RIGHT", 3, 1)

    database.insert_SlaveNodeComplete("SLAVE4", 2, "TOP LEFT", 3, 2)
    database.insert_SlaveNodeComplete("SLAVE5", 2, "TOP CENTER", 3, 2)
    database.insert_SlaveNodeComplete("SLAVE6", 2, "TOP RIGHT", 3, 2)
    
    database.insert_ParkingSpot("a0", 1, 0, 0, 76.01, 81.01)
    database.insert_ParkingSpot("a1", 1, 1, 0, 76.01, 81.01)
    database.insert_ParkingSpot("a2", 1, 2, 0, 76.01, 81.01)
    database.insert_ParkingSpot("b0", 2, 0, 0, 76.01, 81.01)
    database.insert_ParkingSpot("b1", 2, 1, 0, 76.01, 81.01)
    database.insert_ParkingSpot("b2", 2, 2, 0, 76.01, 81.01)
    database.insert_ParkingSpot("c0", 3, 0, 0, 76.01, 81.01)
    database.insert_ParkingSpot("c1", 3, 1, 0, 76.01, 81.01)
    database.insert_ParkingSpot("c2", 3, 2, 0, 76.01, 81.01)

    database.insert_ParkingSpot("d0", 4, 0, 0, 76.01, 81.01)
    database.insert_ParkingSpot("d1", 4, 1, 0, 76.01, 81.01)
    database.insert_ParkingSpot("d2", 4, 2, 0, 76.01, 81.01)
    database.insert_ParkingSpot("e0", 5, 0, 0, 76.01, 81.01)
    database.insert_ParkingSpot("e1", 5, 1, 0, 76.01, 81.01)
    database.insert_ParkingSpot("e2", 5, 2, 0, 76.01, 81.01)
    database.insert_ParkingSpot("f0", 6, 0, 0, 76.01, 81.01)
    database.insert_ParkingSpot("f1", 6, 1, 0, 76.01, 81.01)
    database.insert_ParkingSpot("f2", 6, 2, 0, 76.01, 81.01)
});

// ================== SELECT ALL ENDPOINTS =================== //
app.get("/api/spottrsites", (req, res, next) => {
    database.selectall_SpottrSite((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({SpottrSite: rows})
    })
})

app.get("/api/parkinglots", (req, res, next) => {
    database.selectall_ParkingLot((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({ParkingLot: rows})
    })
})

app.get("/api/spottrnodes", (req, res, next) => {
    database.selectall_SpottrNode((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({SpottrNode: rows})
    })
})

app.get("/api/masternodes", (req, res, next) => {
    database.selectall_MasterNode((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({MasterNode: rows})
    })
})

app.get("/api/slavenodes", (req, res, next) => {
    database.selectall_SlaveNode((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({SlaveNode: rows})
    })
})

app.get("/api/parkingspots", (req, res, next) => {
    database.selectall_ParkingSpot((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json({ParkingSpot: rows})
    })
})

// ================== SELECT ONE ENDPOINTS =================== //
app.get("/api/spottrsites/:id", (req, res, next) => {
    database.select_SpottrSite(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({SpottrSite: row})
    })
})

app.get("/api/parkinglots/:id", (req, res, next) => {
    database.select_ParkingLot(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({ParkingLot: row})
    })
})

app.get("/api/spottrnodes/:id", (req, res, next) => {
    database.select_SpottrNode(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({SpottrNode: row})
    })
})

app.get("/api/masternodes/:id", (req, res, next) => {
    database.select_MasterNode(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({MasterNode: row})
    })
})

app.get("/api/slavenodes/:id", (req, res, next) => {
    database.select_SlaveNode(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({SlaveNode: row})
    })
})

app.get("/api/parkingspots/:id", (req, res, next) => {
    database.select_ParkingSpot(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({ParkingSpot: row})
    })
})

// ================ SELECT FILTER ENDPOINTS ================== //

app.get("/api/spottrsites/:id/parkinglots", (req, res, next) => {
    database.select_ParkingLotWithSpottrSite(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({ParkingLot: row})
    })
})

app.get("/api/parkinglots/:id/spottrnodes", (req, res, next) => {
    database.select_SpottrNodeWithParkingLot(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({SpottrNode: row})
    })
})

app.get("/api/parkinglots/:id/masternodes", (req, res, next) => {
    database.select_MasterNodeWithParkingLot(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({MasterNode: row})
    })
})

app.get("/api/parkinglots/:id/slavenodes", (req, res, next) => {
    database.select_SlaveNodeWithParkingLot(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({SlaveNode: row})
    })
})

app.get("/api/parkinglots/:id/parkingspots", (req, res, next) => {
    database.select_ParkingSpotWithParkingLot(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({ParkingSpot: row})
    })
})

app.get("/api/masternodes/:id/slavenodes", (req, res, next) => {
    database.select_SlaveNodeWithMasterNode(req.params.id, (err, row) => {
        if (err)
        {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({SlaveNode: row})
    })
})

// Default error message
app.get("/api/error", (req, res, next) => {
    res.status(400).json({"error":"sample error message"})
})

// Default response for any other request
app.use((req, res) => {
    res.status(404)
});