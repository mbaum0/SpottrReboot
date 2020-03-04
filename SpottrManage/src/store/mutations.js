import Vue from "vue";

export default {
    SOCKET_DBLOG(state, data) {
        state.dbLogs.push(data)
    },
    SOCKET_SPOTTRSYNC(state, data) {
        state.spottrSyncs.push(data)
    },
    SOCKET_MASTERNODE(state, data) {
        state.masterNodes.push(data)
    },
    SOCKET_SLAVENODE(state, data) {
        state.slaveNodes.push(data)
    },
    SET_SPOTTRSITES(state, spottrSites) {
        state.spottrSites = spottrSites
    },
    SET_PARKINGLOTS(state, parkingLots) {
        state.parkingLots = parkingLots
    },
    ADD_PARKINGLOT(state, lot) {
        state.parkingLots.push(lot)
    },
    UPDATE_PARKINGLOT(state, payload) {
        Vue.set(state.parkingLots, payload[0], payload[1])
    },
    DELETE_PARKINGLOT(state, payload) {
        let id = payload[0];
        let numDeleted = payload[1];

        state.parkingLots = state.parkingLots.filter(function (obj) {
            return obj.id != id;
        })
    },
    SET_MASTERNODES(state, masterNodes) {
        state.masterNodes = masterNodes
    },
    UPDATE_MASTERNODE(state, payload) {
        Vue.set(state.masterNodes, payload[0], payload[1])
    },
    DELETE_MASTERNODE(state, payload) {
        let id = payload[0];
        let numDeleted = payload[1];

        state.masterNodes = state.masterNodes.filter(function (obj) {
            return obj.id != id;
        })
    },
    SET_SLAVENODES(state, slaveNodes) {
        state.slaveNodes = slaveNodes
    },
    UPDATE_SLAVENODE(state, payload) {
        Vue.set(state.slaveNodes, payload[0], payload[1])
    },
    DELETE_SLAVENODE(state, payload) {
        let id = payload[0];
        let numDeleted = payload[1];

        state.slaveNodes = state.slaveNodes.filter(function (obj) {
            return obj.id != id;
        })
    },
    SET_PARKINGSPOTS(state, parkingSpots) {
        state.parkingSpots = parkingSpots
    },
    SET_DBLOGS(state, dbLogs) {
        state.dbLogs = dbLogs
    },
    SET_PREFERENCES(state, preferences) {
        state.preferences = preferences
    },
    SET_SPOTTRSYNCS(state, spottrSyncs) {
        state.spottrSyncs = spottrSyncs;
    },
    UPDATE_SPOTTRSYNC(state, payload) {
        Vue.set(state.spottrSyncs, payload[0], payload[1])
    },
    SET_ACTIVEPARKINGLOT(state, lot) {
        state.activeParkingLot = lot;
    },
    SET_ACTIVEPARKINGLOT_PERIMETER(state, perimeter) {
        state.parkingLots[state.activeParkingLot].perimeter = perimeter;
    }
}