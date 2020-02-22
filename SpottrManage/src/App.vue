<template>
  <v-app id="app">
    <v-app-bar clipped-left app color="indigo" dark>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer fixed app clipped>
      <v-list dense>
        <v-list-item link to="/">
          <!-- <router-link to="/"/> -->
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/logs">
          <!-- <router-link to="/logs"/> -->
          <v-list-item-action>
            <v-icon>mdi-card-text</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<style lang="scss">
</style>
