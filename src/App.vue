<template>
  <div id="app">
    <link href="path/to/fontawesome/css/all.min.css" rel="stylesheet">
    <component :is="selectedComponent" v-if="!showDashboard" @toggle-dashboard="showDashboard = true" />
    <DashboardLayout v-else />
  </div>
</template>

<script>
import DashboardLayout from './components/DashboardLayout.vue';
import LoginPage from './components/LoginPage.vue';

export default {
  name: 'App',
  components: {
    DashboardLayout,
    LoginPage
  },
  data() {
    return {
      showDashboard: true // Set this to true or false based on your condition
    };
  },
  computed: {
    selectedComponent() {
      return this.showDashboard ? 'DashboardLayout' : 'LoginPage';
    }
  }
}
</script>
