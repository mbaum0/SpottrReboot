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
    database.insert_SpottrNode("MASTERNODE", 0, "CARLSON", 3)
    database.insert_SpottrNode("SLAVE0", 0, "CARLSON", 3)
    database.insert_SpottrNode("SLAVE1", 0, "CARLSON", 3)
    
    database.insert_MasterNode(0, "masternode.com")
    
    database.insert_SlaveNode(1, 0)
    database.insert_SlaveNode(2, 0)
    
    database.insert_ParkingSpot("m0", 0, 0, 0)
    database.insert_ParkingSpot("m1", 0, 1, 0)
    database.insert_ParkingSpot("m2", 0, 2, 0)
    database.insert_ParkingSpot("a0", 1, 0, 0)
    database.insert_ParkingSpot("a1", 1, 1, 0)
    database.insert_ParkingSpot("a2", 1, 2, 0)
    database.insert_ParkingSpot("b0", 2, 0, 0)
    database.insert_ParkingSpot("b1", 2, 1, 0)
    database.insert_ParkingSpot("b2", 2, 2, 0)
});

app.get("/api/spottrsites", (req, res, next) => {
    database.selectall_SpottrSite((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json(rows)
    })
})

app.get("/api/spottrnodes", (req, res, next) => {
    database.selectall_SpottrNode((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json(rows)
    })
})

app.get("/api/masternodes", (req, res, next) => {
    database.selectall_MasterNode((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json(rows)
    })
})

app.get("/api/slavenodes", (req, res, next) => {
    database.selectall_SlaveNode((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json(rows)
    })
})

app.get("/api/parkingspots", (req, res, next) => {
    database.selectall_ParkingSpot((err, rows) => {
        if (err)
        {
            res.status(400).json({"error":err.message})
            return
        }
        res.json(rows)
    })
})


// Default response for any other request
app.use((req, res) => {
    res.status(404)
});