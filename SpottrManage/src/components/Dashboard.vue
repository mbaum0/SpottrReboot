<template>
  <v-app id="inspire">

    <v-app-bar clipped-left app color="indigo" dark>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer fixed app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-card-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height" fluid>
        <v-data-table disable-pagination hide-default-footer :headers="dbLogHeaders" :items="dbLogs" class="elevation-1">
          <template v-slot:item.note="{ item }">
            <v-chip v-if="item.error" :color="getErrColor(item.error)" dark>ERR: {{ item.note }}</v-chip>
            <v-chip v-else-if="item.note">{{ item.note }}</v-chip>
          </template>
          <template v-slot:item.event="{ item }">
            <v-chip :color="getMethodColor(item.event)" dark> {{ item.event }}</v-chip>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Dashboard",
  props: {
    msg: String
  },
  computed: {
    ...mapState(["spottrSites", "dbLogs"]),
    ...mapGetters(["spottrSites"])
  },
  mounted() {
    this.$store.dispatch("fetchAllSpottrSites");
    this.$store.dispatch("fetchAllParkingLots");
    this.$store.dispatch("fetchAllMasterNodes");
    this.$store.dispatch("fetchAllSlaveNodes");
    this.$store.dispatch("fetchAllParkingSpots");
    this.$store.dispatch("fetchAllDbLogs");
  },
  methods: {
    getErrColor (err) {
      if (err) {return 'red'} else {return 'green'}
    },
    getMethodColor (method) {
      if (method == "UPDATE") {return 'blue'}
      else if (method == "DELETE") {return 'red'}
      else if (method == "INSERT") {return 'green'}
      else {return ''}
    }
  },
  data: () => ({
    drawer: null,
    dbLogHeaders: [
      { text: "Timestamp", value: "timestamp"},
      { text: "Event", value: "event", sortable: false},
      { text: "Resource #", value: "res_num", sortable: false},
      { text: "Resource type", value: "type", sortable: false},
      { text: "Note", value: "note", sortable: false}
    ]
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>