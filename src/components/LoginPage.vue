<template>
  <div class="bg-gray-100 flex justify-center items-center h-screen">
      <!-- Left: Image -->
    <div class="w-1/2 h-screen hidden lg:block">
      <img src="../assets/forlogin.webp" alt="Placeholder Image" class="object-cover w-full h-full">
    </div>
    <!-- Right: Login Form -->
    <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <h1 class="text-2xl font-semibold mb-4">Login</h1>
      <form @submit.prevent="handleLogin">
        <!-- Backend URL Input -->
        <div class="mb-4">
          <label for="backendUrl" class="block text-gray-600">Backend URL</label>
          <input type="text" id="backendUrl" v-model="backendUrl" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" :placeholder="defaultBackendUrl">
        </div>
        <!-- Username Input -->
        <div class="mb-4">
          <label for="username" class="block text-gray-600">Username</label>
          <input type="text" id="username" v-model="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="username">
        </div>
        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input type="password" id="password" v-model="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autocomplete="current-password">
        </div>
        <!-- Forgot Password Link -->
        <div class="mb-6 text-blue-500">
          <a href="#" class="hover:underline">Forgot Password?</a>
        </div>
        <!-- Login Button -->
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Login</button>
      </form>
      <!-- Sign up Link -->
      <div class="mt-6 text-blue-500 text-center">
        <a href="#" @click="handleSignupClick" class="hover:underline">Sign up</a>
      </div>
      <!-- MsgBox for displaying messages -->
      <MsgBox ref="msgBox" :show="msgBoxShow" :message="msgBoxMessage" :type="msgBoxType" @hide="handleMsgBoxHide"/>
    </div>
  </div>
  </template>
  
  <script>
  import MsgBox from './NotifMsgBox.vue';
  
  export default {
    name: 'LoginPage',
    components: {
      MsgBox
    },
    data() {
      return {
        username: '',
        password: '',
        backendUrl: localStorage.getItem('backendUrl') || '',
        defaultBackendUrl: 'http://localhost:3000',
        msgBoxShow: false,
        msgBoxMessage: '',
        msgBoxType: 'success'
      };
    },
    methods: {
      async handleLogin() {
        try {
          const url = this.backendUrl || this.defaultBackendUrl;
          localStorage.setItem('backendUrl', url); // Save backend URL to localStorage
          const response = await fetch(`${url}/users/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          });
          const data = await response.json();
          if (response.ok) {
            if (data.role !== "user") {
              localStorage.setItem('userId', data.userId);
              localStorage.setItem('role', data.role); // Save role to localStorage
              this.$emit('auth-success', { userId: data.userId, role: data.role });
            } else {
              this.showMsgBox('Access restricted to Admin only.', 'warning');
            }
          } else {
            if (data.message === "User not found") {
              this.showMsgBox('User not found. Please check your username and password.', 'warning');
            } else {
              console.error(data.message);
            }
          }
        } catch (error) {
          console.error('Network error:', error);
        }
      },
      handleSignupClick() {
        this.$emit('signup-click');
      },
      showMsgBox(message, type) {
        this.msgBoxMessage = message;
        this.msgBoxType = type;
        this.msgBoxShow = true;
      },
      handleMsgBoxHide() {
        this.msgBoxShow = false;
      }
    }
  }
  </script>
