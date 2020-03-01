<template>
  <v-app id="app">
    <v-app-bar clipped-left app color="blue" dark>
      <v-toolbar-title class="title">Spottr Manage</v-toolbar-title>
      <v-avatar>
        <img :src="require('./assets/ottr.png')" alt="John" />
      </v-avatar>
      <v-spacer />

      <span class="title">
        <span
          v-if="preferences['defaultSpottrSite']"
          class="font-italic"
        >{{ spottrSites[preferences.defaultSpottrSite].sitename }} [{{ spottrSites[preferences.defaultSpottrSite].address }}]</span>
      </span>
    </v-app-bar>

    <!-- DIALOGS -->
    <SpottrSyncDialog v-model="spottrSyncDialogVisible" />

    <v-navigation-drawer :mini-variant="mininav" fixed app clipped>
      <v-list dense>
        <v-list-item link to="/">
          <!-- <router-link to="/"/> -->
          <v-list-item-action>
            <v-icon>mdi-parking</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Parking Lots</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/logs">
          <!-- <router-link to="/logs"/> -->
          <v-list-item-action>
            <v-icon>mdi-card-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click.stop="spottrSyncDialogVisible=true">
          <!-- <router-link to="/logs"/> -->
          <v-list-item-action>
            <v-icon :color="spottrIconColor">mdi-car</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Spottr Sync</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
</style>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import SpottrSyncDialog from "./dialogs/spottrSyncDialog";

export default {
  name: "App",
  props: {},
  components: {
    SpottrSyncDialog: SpottrSyncDialog
  },
  computed: {
    ...mapState(["spottrSites", "preferences", "spottrSyncs"])
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type.includes("SPOTTRSYNC")) {
        
        // icon is green if all requests have been answered
        this.spottrIconColor = "green"
        for (var i = 0; i < this.spottrSyncs.length;i++) {
          if (this.spottrSyncs[i].state == 0){
            this.spottrIconColor = "orange";
            break;
          }
        }
      }
    });
  },
  data: () => ({
    mininav: true,
    spottrIconColor: "green",
    spottrSyncDialogVisible: false
  }),
  methods: {
    ...mapActions([""])
  },
  mounted() {
    this.$store.dispatch("fetchAllSpottrSites");
    this.$store.dispatch("fetchAllParkingLots");
    this.$store.dispatch("fetchAllMasterNodes");
    this.$store.dispatch("fetchAllSlaveNodes");
    this.$store.dispatch("fetchAllParkingSpots");
    this.$store.dispatch("fetchAllDbLogs");
    this.$store.dispatch("fetchAllPreferences");
    this.$store.dispatch("fetchAllSpottrSyncs");
  }
};
</script>