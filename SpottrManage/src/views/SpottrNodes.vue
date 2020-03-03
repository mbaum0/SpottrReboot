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
              dense
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
              dense
            >
              <template v-slot:item.parkinglot="{ item }">{{getLotName(item.parkinglot)}}</template>
              <template v-slot:item.masternode="{ item }">{{getMasterNodeName(item.masternode)}}</template>
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
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedNode.nodename" label="Node Name"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedNode.location" label="Location"></v-text-field>
                </v-col>
                </v-row>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="editedNode.parkinglot"
                    :items="parkingLots"
                    item-text="lotname"
                    item-value="id"
                    label="Parking Lot"
                  ></v-select>
                </v-col>
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
    formTitle() {
      return this.editedMaster ? "Edit Uplink Node" : "Edit Sensor Node";
    }
  },
  data: () => ({
    dialog: false,
    editedIndex: -1,
    editedMaster: false, // true if editing a master
    editedNode: {
      nodename: "",
      parkinglot: 0,
      location: ""
    },
    defaultItem: {
      nodename: "",
      parkinglot: 0,
      location: ""
    },
    masterNodeHeaders: [
      { text: "Name", value: "nodename", sortable: false, width: "10%" },
      { text: "Parking Lot", value: "parkinglot", sortable: false },
      { text: "Location", value: "location", sortable: false },
      { text: "Number of Sensors", value: "numsensors", sortable: false },
      { text: "UUID", value: "spottrsyncid", sortable: false, width: "10%" },
      { text: "Actions", value: "action", sortable: false, width: "12%" }
    ],
    slaveNodeHeaders: [
      { text: "Name", value: "nodename", sortable: false, width: "10%" },
      { text: "Master Node", value: "masternode", sortable: false },
      { text: "Parking Lot", value: "parkinglot", sortable: false },
      { text: "Location", value: "location", sortable: false },
      { text: "Number of Sensors", value: "numsensors", sortable: false },
      { text: "UUID", value: "spottrsyncid", sortable: false, width: "10%" },
      { text: "Actions", value: "action", sortable: false, width: "12%" }
    ]
  }),
  methods: {
    ...mapActions([
      "deleteMasterNode",
      "deleteSlaveNode",
      "updateMasterNode",
      "updateSlaveNode"
    ]),
    log(item) {
      console.log(item);
    },
    delMasterNode(dbID) {
      confirm("Are you sure you want to delete this node?") &&
        this.deleteMasterNode(dbID);
    },
    delSlaveNode(dbID) {
      confirm("Are you sure you want to delete this node?") &&
        this.deleteSlaveNode(dbID);
    },
    editNode(item) {
      if (this.editedMaster) {
        this.editedIndex = this.masterNodes.indexOf(item);
      } else {
        this.editedIndex = this.slaveNodes.indexOf(item);
      }
      this.editedNode = Object.assign({}, item);
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      setTimeout(() => {
        this.editedNode = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    saveNode() {
      var params = {
        nodename: this.editedNode.nodename,
        parkinglot: this.editedNode.parkinglot,
        location: this.editedNode.location
      };

      if (this.editedMaster) {
        var nodeId = this.masterNodes[this.editedIndex].id;
        this.updateMasterNode([this.editedIndex, nodeId, params]);
      } else {
        var nodeId = this.slaveNodes[this.editedIndex].id;
        this.updateSlaveNode([this.editedIndex, nodeId, params]);
      }
      // new item
      this.closeDialog();
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
    },
    getMasterNodeName(dbID) {
      let masterNodeList = this.masterNodes.filter(function(obj) {
        return obj.id == dbID;
      });
      if (masterNodeList.length > 0) {
        return masterNodeList[0].nodename;
      } else {
        return null;
      }
    }
  },
  watch: {
    dialog(val) {
      val || this.closeDialog();
    }
  }
};
</script>