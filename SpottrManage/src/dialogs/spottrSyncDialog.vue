<template>
  <v-dialog v-model="visible" persistent max-width="800px">
    <v-card>
      <v-card-title>SpottrSync Requests</v-card-title>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">UUID</th>
              <th class="text-left">State</th>
              <th class="text-left">Accept</th>
              <th class="text-left">Reject</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in spottrSyncs" :key="item.uuid">
              <td>{{ item.uuid }}</td>
              <td :style="getStateStyle(item.state)">{{ getStateText(item.state) }}</td>
              <td>
                <v-btn small raised color="primary" :disabled="item.state == 1" @click="respondSyncRequest(index, true)">Accept</v-btn>
              </td>
              <td>
                <v-btn small raised color="error" :disabled="item.state == 2" @click="respondSyncRequest(index, false)">Reject</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn small color="primary" @click.stop="visible=false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "SpottrSyncDialog",
  props: { value: Boolean },
  computed: {
    ...mapState(["spottrSyncs"]),
    visible: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions([
      "updateSpottrSync"
    ]),
      getStateText(state) {
          if (state == 0) {
              return "Pending"
          } else if (state == 1) {
              return "Approved"
          } else if (state ==2 ) {
              return "Rejected"
          } else {
              return state
          }
      },
      getStateStyle(state) {
        if (state == 0) {
          return "color: orange; font-weight: bold;"
        } else if (state == 1) {
          return "color: green; font-weight: bold;"
        } else if (state == 2) {
          return "color: red; font-weight: bold;"
        } else {
          return ""
        }
      },
      respondSyncRequest(reqIndex, accept) {
        //reqIndex the array index of the req
        //accept = true to accept, false to reject
        var reqUUID = this.spottrSyncs[reqIndex].id
        var params = {}
        if (accept) {
          params["state"] = 1
        } else {
          params["state"] = 2
        }

        this.updateSpottrSync([reqIndex, reqUUID, params])
      }
  },
  data: () => ({})
};
</script>