import Vue from "vue";
import Vuex from "vuex";
import actions from './actions'
import mutations from './mutations'

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
  mutations,
  actions,
  modules: {},
});