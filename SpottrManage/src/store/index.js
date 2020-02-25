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
    preferences: {},
  },
  mutations: {
    SOCKET_DBLOG(state, data) {
      state.dbLogs.push(data)
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
      state.parkingLots[payload[0]] = payload[1];
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
      console.log(payload)
      commit('UPDATE_PARKINGLOT', (await parkingLotRepo.update(payload[0], payload[1])).data)
    }
  
  },
  getters: {
    spottrSites: state => {
      return state.spottrSites;
    }
  },
  modules: {},
});