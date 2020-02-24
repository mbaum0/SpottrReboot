<template>
  <v-content>
    <v-container fluid style="height: 100%">
      <v-row style="height: 99%">
        <v-col cols="3">
          <v-card class="pa-2" outlined tile>

            <v-toolbar color="blue" dark>

              <v-toolbar-title>Parking Lots</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list>
              <v-list-item-group color="primary" mandatory v-model="activeParkingLot">
                <v-list-item v-for="(lot, i) in parkingLots" :key="i">
                  <v-list-item-icon>
                    <v-icon color="red">mdi-alert</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="lot.lotname"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click>
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card class="pa-2" outlined tile style="height:100%">
            <vuelayers-map v-bind:parkingLot="parkingLots[activeParkingLot]"></vuelayers-map>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Maps from "../components/Map";
export default {
  name: "ParkingLots",
  computed: {
    ...mapState([
      "parkingLots",
      "masterNodes",
      "slaveNodes",
      "activeParkingLot"
    ]),
    activeParkingLot: {
      set: function(lot) {
        this.setActiveParkingLot(lot);
      },
      get: function() {
        return this.$store.state.activeParkingLot;
      }
    }
  },
  methods: {
    ...mapActions(["setActiveParkingLot"])
  },
  components: {
    "vuelayers-map": Maps
  },
  data: () => ({})
};
</script>
