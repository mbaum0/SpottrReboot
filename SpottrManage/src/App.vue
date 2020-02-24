<template>
  <v-app id="app">
    <v-app-bar clipped-left app color="blue" dark>
      <v-toolbar-title class="title">Spottr Manage</v-toolbar-title>
      <v-avatar>
        <img :src="require('./assets/ottr.png')" alt="John" />
      </v-avatar>
      <v-spacer />

      <span class="title">
        Site:
        <span v-if="activeSite" class="font-italic">{{ activeSite.sitename  }} [{{ activeSite.address }}]</span>
      </span>

      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list>
          <template v-for="site in spottrSites">
            <v-list-item v-bind:key="site.sitename" @click="setActiveSite(site)">
              <v-list-item-title>{{ site.sitename }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer fixed app clipped>
      <v-list dense>
        <v-list-item link to="/">
          <!-- <router-link to="/"/> -->
          <v-list-item-action>
            <v-icon>mdi-car</v-icon>
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
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
</style>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  props: {},
  computed: {
    ...mapState(["spottrSites", "activeSite"])
  },
  methods: {
    ...mapActions(["setActiveSite"])
  },
  mounted() {
    this.$store.dispatch("fetchAllSpottrSites");
    this.$store.dispatch("fetchAllParkingLots");
    this.$store.dispatch("fetchAllMasterNodes");
    this.$store.dispatch("fetchAllSlaveNodes");
    this.$store.dispatch("fetchAllParkingSpots");
    this.$store.dispatch("fetchAllDbLogs");
    this.$store.dispatch("fetchAllPreferences");
  }
};
</script>