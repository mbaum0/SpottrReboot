<template>
  <div style="height: 100%">
    <vl-map
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      style="height: 100%"
    >
      <vl-view
        :zoom.sync="zoom"
        :min-zoom="16"
        :max-zoom="20"
        :center.sync="center"
        :rotation.sync="rotation"
      ></vl-view>

      <vl-layer-vector :z-index="1">
        <vl-source-vector :features.sync="features" ident="the-source"></vl-source-vector>

        <vl-style-box>
          <vl-style-stroke color="green"></vl-style-stroke>
          <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
        </vl-style-box>
      </vl-layer-vector>

      <vl-interaction-draw type="Polygon" source="the-source">
        <vl-style-box>
          <vl-style-stroke color="blue"></vl-style-stroke>
          <vl-style-fill color="rgba(255,255,255,0.5)"></vl-style-fill>
        </vl-style-box>
      </vl-interaction-draw>

      <vl-feature v-if="parkingLot" id="polygon" :properties="{prop: 'value', prop2: 'value'}">
          <vl-geom-polygon :coordinates="JSON.parse(parkingLot.perimeter)"></vl-geom-polygon>
      </vl-feature>

      <!-- <vl-layer-tile id="osm">
        <vl-source-osm></vl-source-osm>
      </vl-layer-tile>-->

      <vl-layer-tile id="bingmaps">
        <vl-source-bingmaps :api-key="apiKey" :imagery-set="imagerySet"></vl-source-bingmaps>
      </vl-layer-tile>
    </vl-map>
  </div>
</template>

<script>
export default {
  name: 'lotMap',
  props: ['parkingLot'],
  data() {
    return {
      zoom: 16,
      center: [-77.675083, 43.084469],
      rotation: 0,
      geolocPosition: undefined,
      features: [],
      apiKey:
        "ArbsA9NX-AZmebC6VyXAnDqjXk6mo2wGCmeYM8EwyDaxKfQhUYyk0jtx6hX5fpMn",
      // personal key: Aq8F-19YIqmn0opUMFgL5AUoy2QcV-rE47w8hjlOaNlkHyafrj6sEXyNy9tq3UA3
      imagerySet: "AerialWithLabels"
    };
  }
};
</script>