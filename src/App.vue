<template>
  <v-app>
    <v-main>
      <v-container>
        <project-dashboard />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import ProjectDashboard from './views/ProjectDashboard.vue';

export default {
  name: 'App',
  components: {
    ProjectDashboard
  }
}
</script>

<style>
@import '~vuetify/styles';
@import '~@mdi/font/css/materialdesignicons.css';
</style>
