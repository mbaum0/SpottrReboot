<template>
  <div class="manage">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  computed: {
      ...mapState(['spottrSites']),
      ...mapGetters(['spottrSites'])
  },
  mounted() {
      this.$store.dispatch('fetchAllSpottrSites')
      this.$store.dispatch('fetchAllParkingLots')
      this.$store.dispatch('fetchAllMasterNodes')
      this.$store.dispatch('fetchAllSlaveNodes')
      this.$store.dispatch('fetchAllParkingSpots')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>