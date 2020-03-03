<template>
  <v-content>
    <v-container fluid style="height: 100%">
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-toolbar dense dark color="blue-grey">
              <v-toolbar-title>Uplink Nodes</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-data-table
              disable-pagination
              hide-default-footer
              :headers="masterNodeHeaders"
              :items="masterNodes"
            >
              <template v-slot:item.parkinglot="{ item }">{{getLotName(item.parkinglot)}}</template>
              <template v-slot:item.action="{ item }">
                <v-btn icon>
                  <v-icon small class="mr-2" @click="log(item)">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon small @click="delMasterNode(item.id)">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card>
            <v-toolbar dense dark color="blue-grey">
              <v-toolbar-title>Sensor Nodes</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              disable-pagination
              hide-default-footer
              :headers="slaveNodeHeaders"
              :items="slaveNodes"
            >
              <template v-slot:item.parkinglot="{ item }">{{getLotName(item.parkinglot)}}</template>
              <template v-slot:item.action="{ item }">
                <v-btn icon>
                  <v-icon small class="mr-2" @click="log(item)">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon small @click="delSlaveNode(item.id)">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "SpottrNodes",
  computed: {
    ...mapState(["masterNodes", "slaveNodes", "parkingLots"])
  },
  data: () => ({
    masterNodeHeaders: [
      { text: "Name", value: "nodename", sortable: false },
      { text: "Parking Lot", value: "parkinglot", sortable: false },
      { text: "Location", value: "location", sortable: false },
      { text: "Number of Sensors", value: "numsensors", sortable: false },
      { text: "UUID", value: "spottrsyncid", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ],
    slaveNodeHeaders: [
      { text: "Name", value: "nodename", sortable: false },
      { text: "Master Node", value: "masternode", sortable: false },
      { text: "Parking Lot", value: "parkinglot", sortable: false },
      { text: "Location", value: "location", sortable: false },
      { text: "Number of Sensors", value: "numsensors", sortable: false },
      { text: "UUID", value: "spottrsyncid", sortable: false },
      { text: "Actions", value: "action", sortable: false }
    ]
  }),
  methods: {
    ...mapActions(["deleteMasterNode", "deleteSlaveNode"]),
    log(item) {
      console.log(item);
    },
    delMasterNode(dbID) {
      this.deleteMasterNode(dbID);
    },
    delSlaveNode(dbID) {
      this.deleteSlaveNode(dbID);
    },
    getLotName(dbID) {
      // get the parking lot name from a database ID
      let lots = this.parkingLots.filter(function(obj) {
        return obj.id == dbID;
      });
      if (lots.length > 0) {
        return lots[0].lotname;
      } else {
        return null;
      }
    }
  }
};
</script>