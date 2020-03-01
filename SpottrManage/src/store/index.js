import Vue from "vue";
import Vuex from "vuex";
import { repositoryFactory } from "./repositories/repoFactory";


const spottrSiteRepo = repositoryFactory.get('spottrSite');
const parkingLotRepo = repositoryFactory.get('parkingLot');
const masterNodeRepo = repositoryFactory.get('masterNode');
const slaveNodeRepo = repositoryFactory.get('slaveNode');
const parkingSpotRepo = repositoryFactory.get('parkingSpot');
const dbLogRepo = repositoryFactory.get('dbLog');
const preferenceRepo = repositoryFactory.get('preference')
const spottrSyncRepo = repositoryFactory.get('spottrSync')

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeParkingLot: 0,
    spottrSites: [],
    parkingLots: [],
    masterNodes: [],
    slaveNodes: [],
    parkingSpots: [],
    dbLogs: [],
    spottrSyncs: [],
    preferences: {},
  },
  mutations: {
    SOCKET_DBLOG(state, data) {
      state.dbLogs.push(data)
    },
    SOCKET_SPOTTRSYNC(state, data) {
      state.spottrSyncs.push(data)
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
      Vue.set(satte.parkingLots, payload[0], payload[1])
      //state.parkingLots[payload[0]] = payload[1];
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
    SET_SLAVENODES(state, slaveNodes) {
      state.slaveNodes = slaveNodes
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
  },
  actions: {
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
    async fetchAllPreferences( { commit }) {
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
    async createParkingLot({ commit }, params) {
      commit('ADD_PARKINGLOT', (await parkingLotRepo.create(params)).data)
    },
    async updateParkingLot({ commit }, payload) {
      // payload is an array 0: index of parkingLot in array, 1: id of the parkingLot, 2: payload object
      console.log(payload)
      commit('UPDATE_PARKINGLOT', [payload[0], (await parkingLotRepo.update(payload[1], payload[2])).data])
    },
    async deleteParkingLot({ commit }, id) {
      commit('DELETE_PARKINGLOT', [id, (await parkingLotRepo.delete(id)).data])
    },
    async updateSpottrSync({ commit }, payload) {
      // payload is an array 0: index of syncReq in array, 1: uuid of the synReq, 2: payload object
      commit('UPDATE_SPOTTRSYNC', [payload[0], (await spottrSyncRepo.update(payload[1], payload[2])).data])
    }
  },
  getters: {
    spottrSites: state => {
      return state.spottrSites;
    }
  },
  modules: {},
});