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
                  <v-icon small class="mr-2" @click="editedMaster=true;editNode(item)">mdi-pencil</v-icon>
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
                  <v-icon small class="mr-2" @click="editedMaster=false;editNode(item)">mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon small @click="delSlaveNode(item.id)">mdi-delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="dialog" max-width="500px">
        <!-- <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedNode.nodename" label="Node Name"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedNode.parkinglot" label="Parking Lot"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedNode.location" label="Location"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedNode.carbs" label="Carbs (g)"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field v-model="editedNode.protein" label="Protein (g)"></v-text-field>
                </v-col> -->
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="saveNode">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-content>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "SpottrNodes",
  computed: {
    ...mapState(["masterNodes", "slaveNodes", "parkingLots"]),
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedMaster: false, // true if editing a master
    editedNode: {
      nodename: '',
      parkinglot: 0,
      location: ''
    },
    defaultItem: {
      nodename: '',
      parkinglot: 0,
      location: ''
    },
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
    ...mapActions(["deleteMasterNode", "deleteSlaveNode", "updateMasterNode", "udpateSlaveNode"]),
    log(item) {
      console.log(item);
    },
    delMasterNode(dbID) {
      confirm('Are you sure you want to delete this node?') && this.deleteMasterNode(dbID);
    },
    delSlaveNode(dbID) {
      confirm('Are you sure you want to delete this node?') && this.deleteSlaveNode(dbID);
    },
    editNode (item) {
      this.editedIndex = this.masterNodes.indexOf(item)
      this.editedNode = Object.assign({}, item)
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
      setTimeout(() => {
        this.editedNode = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    saveNode () {
      var params = {
        nodename: this.editedNode.nodename,
        parkinglot: this.editedNode.parkinglot,
        location: this.editedNode.location
      };
      
      if (this.editedMaster) {
        var nodeId = this.masterNodes[this.editedIndex].id
        this.updateMasterNode([this.editedIndex, nodeId, params])
      } else {
        var nodeId = this.slaveNodes[this.editedIndex].id
        this.updateSlaveNode([this.editedIndex, nodeId, params])
      }
      // new item
      this.closeDialog()
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
  },
  watch: {
    dialog (val) {
      val || this.closeDialog()
    }
  }
};
</script>