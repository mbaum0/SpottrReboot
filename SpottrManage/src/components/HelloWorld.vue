<template>
  <v-content>
    <v-container fluid>
      <v-row dense>
        <v-col cols="3">
          <v-card class="pa-2" outlined tile>
            <v-list>
              <v-subheader>Parking Lots</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item v-for="(lot, i) in parkingLots" :key="i">
                  <v-list-item-icon>
                    <v-icon v-text="lot.lotname"></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title v-text="lot.name"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <vuelayers-map></vuelayers-map>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import Maps from "./Map";
export default {
  name: "HelloWorld",
  computed: {
    ...mapState(["parkingLots", "masterNodes", "slaveNodes"])
  },
  components: {
    "vuelayers-map": Maps
  },
  data: () => ({
    cards: [
      {
        title: "Parking Lots",
        src:
          "https://graceluccy.files.wordpress.com/2012/10/custom-line-striping.jpg",
        flex: 4
      },
      {
        title: "Spottr Nodes",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        flex: 4
      },
      {
        title: "Settings",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        flex: 4
      }
    ]
  })
};
</script>
