<template>
  <div style="height: 100%;">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 100%;"
    >
      <vl-view
        :zoom.sync="zoom"
        :min-zoom="16"
        :max-zoom="20"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-layer-vector id="draw-pane" v-if="drawLot">
        <!-- <vl-source-vector ident="draw-target" :features.sync="drawnFeatures"> -->
        <vl-source-vector ident="draw-target" :features.sync="drawnFeatures">
          <vl-style-box>
            <vl-style-stroke color="red" :width="3"></vl-style-stroke>
            <vl-style-fill color="rgba(255,200,255,0.5)"></vl-style-fill>
          </vl-style-box>
        </vl-source-vector>
      </vl-layer-vector>

      <vl-interaction-draw
        v-if="drawLot"
        @drawend="onDrawStop()"
        @drawstart="onDrawStart()"
        source="draw-target"
        type="Polygon"
      ></vl-interaction-draw>
      <vl-interaction-modify v-if="drawLot" source="draw-target"></vl-interaction-modify>
      <vl-interaction-snap v-if="drawLot" source="draw-target" :priority="10"></vl-interaction-snap>

      <vl-feature v-if="currentLot && !drawLot">
        <vl-geom-polygon :coordinates="currentLot"></vl-geom-polygon>
                  <vl-style-box>
            <vl-style-stroke color="green" :width="2"></vl-style-stroke>
            <vl-style-fill color="rgba(255,200,255,0.2)"></vl-style-fill>
          </vl-style-box>
      </vl-feature>

      <vl-layer-tile id="bingmaps">
        <vl-source-bingmaps :api-key="apiKey" :imagery-set="imagerySet"></vl-source-bingmaps>
      </vl-layer-tile>
    </vl-map>

    <v-snackbar v-model="drawLot" :top="false" :timeout="0">
      Editing lot
      <v-btn color="pink" :disabled="drawing" text @click="$emit('lotSave');">Save</v-btn>
    </v-snackbar>

    <v-overlay :z-index="-1" :value="drawLot"></v-overlay>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import GeoJSON from "../../node_modules/ol/format/GeoJSON";
export default {
  name: "lotMap",
  props: ["parkingLot", "drawLot", "mapCenter"],
  watch: {
    mapCenter: function(newVal, oldVal) {
      if (newVal != null) {
        this.center = newVal;
        this.zoom = 18;
      }
    },
    drawLot: function(newVal, oldVal) {
      if (newVal) {
        console.log("start edit");
      } else {
        console.log("stop edit");
        this.currentLot = this.drawnFeatures[0].geometry.coordinates;
        this.setActiveParkingLotPerimeter(
          JSON.stringify(this.drawnFeatures[0].geometry.coordinates)
        );
      }
    },
    parkingLot: function(newValue, oldVal) {
      var oldPoly = {
        type: "Feature",
        id: "0",
        geometry: {
          type: "Polygon",
          coordinates: JSON.parse(this.parkingLot.perimeter)
        }
      };
      if (oldPoly.geometry.coordinates == null){
        oldPoly.geometry.coordinates = [[]]
      }
      this.drawnFeatures[0] = oldPoly;
      this.currentLot = JSON.parse(this.parkingLot.perimeter);
    }
  },
  methods: {
    ...mapActions(["setActiveParkingLotPerimeter"]),
    onDrawStart() {
      this.drawnFeatures = [];
      this.drawing = true;
      console.log("start");
      //this.drawnFeatures[0] = oldPoly;
    },
    onDrawStop() {
      this.drawing = false;
      console.log("done");
    }
  },
  data() {
    return {
      zoom: 16,
      center: [-77.675083, 43.084469],
      rotation: 0,
      geolocPosition: undefined,
      drawnFeatures: [],
      currentLot: undefined,
      drawing: false,
      apiKey:
        "ArbsA9NX-AZmebC6VyXAnDqjXk6mo2wGCmeYM8EwyDaxKfQhUYyk0jtx6hX5fpMn",
      // personal key: Aq8F-19YIqmn0opUMFgL5AUoy2QcV-rE47w8hjlOaNlkHyafrj6sEXyNy9tq3UA3
      imagerySet: "AerialWithLabels"
    };
  }
};
</script>