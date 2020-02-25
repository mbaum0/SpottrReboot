<template>
    <v-content>
      <v-container   child-flex>
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
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Logs",
  props: {
    msg: String
  },
  computed: {
    ...mapState(["spottrSites", "dbLogs"]),
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