<template>
  <v-content>
    <v-container fluid style="height: 100%">
      <v-row style="height: 99%">
        <v-col cols="3">
          <v-card class="pa-2" outlined tile>
            <v-toolbar v-if="editLot==false" color="blue" dark>
              <v-toolbar-title>Parking Lots</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="addLot=true; focusNewLotField()">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-toolbar>

            <v-toolbar v-else color="red" dark>
              <v-btn icon @click="editLot=false">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <v-toolbar-title>Editing: {{parkingLots[activeParkingLot].lotname}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-form v-if="editLot" ref="editLotForm">
              <v-text-field
                v-model="parkingLots[activeParkingLot].lotname"
                label="Lot Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="parkingLots[activeParkingLot].perimeter"
                label="Perimeter"
                required
                append-icon="mdi-pencil"
                @click:append="drawLot=true"
              ></v-text-field>
              <v-btn class="ml-2" @click="editLot=false; saveParkingLot()">Save</v-btn>
              <v-btn class="ml-2" @click="editLot=false; delParkingLot()">Delete</v-btn>
            </v-form>

            <v-list v-if="editLot==false" style="max-height: 70vh" class="overflow-y-auto">
              <v-list-item-group color="primary" mandatory v-model="activeParkingLot">
                <v-list-item v-for="(lot, i) in parkingLots" :key="i">
                  <v-list-item-icon v-if="parkingLots[i].perimeter == null">
                    <v-icon color="red">mdi-alert</v-icon>
                  </v-list-item-icon>

                  <v-list-item-icon v-if="parkingLots[i].perimeter != null">
                    <v-icon color="green">mdi-hand-okay</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title v-text="lot.lotname"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click="activeParkingLot=i; editLot=true">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>

              <v-divider v-if="addLot" />
              <v-list-item v-if="addLot">
                <v-list-item-content>
                  <v-text-field v-model="newLotName" ref='newLotNameField' label="Lot Name" required></v-text-field>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="addLot">
                <v-btn-toggle class="pl-2 pr-12">
                  <v-btn @click="addLot=false" color="red" text>Cancel</v-btn>
                </v-btn-toggle>
                <div class="pl-12" />
                <v-btn-toggle class="pl-12">
                  <v-btn
                    :disabled="newLotName.length == 0"
                    color="primary"
                    ref="createLotBtn"
                    text
                    @click="addLot=false; createNewLot();"
                  >Save</v-btn>
                </v-btn-toggle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card class="pa-2" outlined tile :style="getMapCardStyle()">
            <vuelayers-map
              v-bind:parkingLot="parkingLots[activeParkingLot]"
              v-bind:drawLot="drawLot"
              @lotSave="drawLot=false"
              :mapCenter="mapCenter"
            ></vuelayers-map>
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
      "activeParkingLot",
      "preferences"
    ]),
    activeParkingLot: {
      set: function(lot) {
        this.setActiveParkingLot(lot);
        this.setFeatureCenter();
      },
      get: function() {
        return this.$store.state.activeParkingLot;
      }
    }
  },
  methods: {
    ...mapActions(["setActiveParkingLot", "createParkingLot", "updateParkingLot", "deleteParkingLot"]),
    focusNewLotField() {
      // timeout to wait for field existance
      setTimeout(() => {
        // scroll to button and focus on field
        this.$refs.createLotBtn.$el.scrollIntoView()
        this.$refs.newLotNameField.focus();
      })
    },
    createNewLot() {
      var params = {
        lotname: this.newLotName,
        spottrsite: this.$store.state.preferences.defaultSpottrSite,
        perimeter: null
      };
      this.createParkingLot(params);
      this.newLotName = "";
    },
    setFeatureCenter() {
      var lot = this.parkingLots[this.activeParkingLot];
      if (lot.perimeter != null) {
        var coords = JSON.parse(lot.perimeter)[0];
        var long = 0;
        var lat = 0;
        // minus one because of duplicated final coordinate
        for(let i = 0; i < coords.length-1; i++) {
          long += coords[i][0];
          lat += coords[i][1]
        }
        long /= coords.length-1;
        lat /= coords.length-1;
        this.mapCenter = [long, lat]
      } else {
        this.mapCenter = null;
      }
    },
    getMapCardStyle() {
      if (this.drawLot) {
        return "height:100%; z-index:10";
      } else {
        return "height:100%;";
      }
    },
    saveParkingLot() {
      var params = {
        lotname: this.parkingLots[this.activeParkingLot].lotname,
        spottrsite: this.preferences.defaultSpottrSite,
        perimeter: this.parkingLots[this.activeParkingLot].perimeter
      }

      var lotId = this.parkingLots[this.activeParkingLot].id
      this.updateParkingLot([lotId, params])
    },
    delParkingLot() {
      var lotId = this.parkingLots[this.activeParkingLot].id;
      this.deleteParkingLot(lotId)
    },
  },
  components: {
    "vuelayers-map": Maps
  },
  data: () => ({
    drawLot: false,
    addLot: false,
    newLotName: "",
    editLot: false,
    mapCenter: [0, 0]
  })
};
</script>
