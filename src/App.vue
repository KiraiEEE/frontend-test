<template>
  <div id="app">
    <DashboardLayout v-if="isLoggedIn" />
    <LoginPage v-else @auth-success="handleLogin" />
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
      isLoggedIn: false
    };
  },
  methods: {
    handleLogin(event) {
      this.isLoggedIn = true;
      localStorage.setItem('userId', event.userId);
    },
    checkLoginStatus() {
      const user = localStorage.getItem('userId');
      this.isLoggedIn = !!user;
    }
  },
  created() {
    this.checkLoginStatus();
  }
}
</script>
