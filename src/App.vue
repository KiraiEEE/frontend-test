<template>
  
  <div id="app">
    <DashboardLayout v-if="isLoggedIn" />
    <LoginPage v-else-if="!isLoggedIn && !showSignupPage" @auth-success="handleLogin" @signup-click="handleSignupClick" />
    <SignupPage v-else @signup-success="handleSignupSuccess" @go-to-login="handleGoToLogin" />
  </div>
</template>

<script>
import DashboardLayout from './components/DashboardLayout.vue';
import LoginPage from './components/LoginPage.vue';
import SignupPage from './components/SignUpPage.vue';

export default {
  name: 'App',
  components: {
    DashboardLayout,
    LoginPage,
    SignupPage
  },
  data() {
    return {
      isLoggedIn: false,
      showSignupPage: false
    };
  },
  methods: {
    handleLogin(event) {
      this.isLoggedIn = true;
      localStorage.setItem('userId', event.userId);
    },
    handleSignupClick() {
      this.showSignupPage = true;
    },
    handleSignupSuccess(event) {
      this.isLoggedIn = true;
      localStorage.setItem('userId', event.userId);
      this.showSignupPage = false;
    },
    handleGoToLogin() {
      this.showSignupPage = false;
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
