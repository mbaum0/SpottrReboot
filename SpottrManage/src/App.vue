<template>
  <v-app>
    <v-content>
      <Dashboard/>
    </v-content>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import Dashboard from './components/Dashboard';

export default {
  name: 'App',

  components: {
    //HelloWorld,
    Dashboard
  },

  data: () => ({
    //
  }),
};
</script>
