import { repositoryFactory } from "./repositories/repoFactory";

const spottrSiteRepo = repositoryFactory.get('spottrSite');
const parkingLotRepo = repositoryFactory.get('parkingLot');
const masterNodeRepo = repositoryFactory.get('masterNode');
const slaveNodeRepo = repositoryFactory.get('slaveNode');
const parkingSpotRepo = repositoryFactory.get('parkingSpot');
const dbLogRepo = repositoryFactory.get('dbLog');
const preferenceRepo = repositoryFactory.get('preference')
const spottrSyncRepo = repositoryFactory.get('spottrSync')

export default {
    async fetchAllSpottrSites({ commit }) {
        commit('SET_SPOTTRSITES', (await spottrSiteRepo.fetchAll()).data.SpottrSites)
    },
    async fetchAllParkingLots({ commit }) {
        commit('SET_PARKINGLOTS', (await parkingLotRepo.fetchAll()).data.ParkingLots)
    },
    async fetchAllMasterNodes({ commit }) {
        commit('SET_MASTERNODES', (await masterNodeRepo.fetchAll()).data.MasterNodes)
    },
    async fetchAllSlaveNodes({ commit }) {
        commit('SET_SLAVENODES', (await slaveNodeRepo.fetchAll()).data.SlaveNodes)
    },
    async fetchAllParkingSpots({ commit }) {
        commit('SET_PARKINGSPOTS', (await parkingSpotRepo.fetchAll()).data.ParkingSpots)
    },
    async fetchAllDbLogs({ commit }) {
        commit('SET_DBLOGS', (await dbLogRepo.fetchAll()).data.DbLogs)
    },
    async fetchAllPreferences({ commit }) {
        commit('SET_PREFERENCES', (await preferenceRepo.fetchAll()).data.Preferences)
    },
    async fetchAllSpottrSyncs({ commit }) {
        commit('SET_SPOTTRSYNCS', (await spottrSyncRepo.fetchAll()).data.SpottrSyncs)
    },
    setActiveParkingLot({ commit }, lot) {
        commit('SET_ACTIVEPARKINGLOT', lot)
    },
    setActiveParkingLotPerimeter({ commit }, perimeter) {
        commit('SET_ACTIVEPARKINGLOT_PERIMETER', perimeter)
    },
    async updateMasterNode({ commit }, payload) {
        // payload is an array 0: index of masterNode in array, 1: id of the masterNode, 2: payload object
        commit('UPDATE_MASTERNODE', [payload[0], (await masterNodeRepo.update(payload[1], payload[2])).data])
    },
    async updateSlaveNode({ commit }, payload) {
        // payload is an array 0: index of slaveNode in array, 1: id of the slaveNode, 2: payload object
        commit('UPDATE_SLAVENODE', [payload[0], (await slaveNodeRepo.update(payload[1], payload[2])).data])
    },
    async createParkingLot({ commit }, params) {
        commit('ADD_PARKINGLOT', (await parkingLotRepo.create(params)).data)
    },
    async updateParkingLot({ commit }, payload) {
        // payload is an array 0: index of parkingLot in array, 1: id of the parkingLot, 2: payload object
        commit('UPDATE_PARKINGLOT', [payload[0], (await parkingLotRepo.update(payload[1], payload[2])).data])
    },
    async deleteParkingLot({ commit }, id) {
        commit('DELETE_PARKINGLOT', [id, (await parkingLotRepo.delete(id)).data])
    },
    async deleteMasterNode({ commit }, id) {
        commit('DELETE_MASTERNODE', [id, (await masterNodeRepo.delete(id)).data])
    },
    async deleteSlaveNode({ commit }, id) {
        commit('DELETE_SLAVENODE', [id, (await slaveNodeRepo.delete(id)).data])
    },
    async updateSpottrSync({ commit }, payload) {
        // payload is an array 0: index of syncReq in array, 1: uuid of the synReq, 2: payload object
        commit('UPDATE_SPOTTRSYNC', [payload[0], (await spottrSyncRepo.update(payload[1], payload[2])).data])
    }
}