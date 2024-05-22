<template>
  <div class="flex justify-center items-center h-screen bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200">
    <div class="w-full max-w-lg p-8 shadow-lg rounded-lg bg-white">
      <form @submit.prevent="handleSignUp" enctype="multipart/form-data" class="space-y-4">
        <div class="mb-10 md:mb-10 text-center">
          <div class="inline-block max-w-[160px] mx-auto">
            <img src="@/assets/logo.png" alt="logo" />
          </div>
        </div>
        <!-- Backend URL Input -->
        <div class="mb-4">
          <label for="backendUrl" class="block text-gray-600">Backend URL</label>
          <input type="text" id="backendUrl" v-model="backendUrl" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" :placeholder="defaultBackendUrl">
        </div>
        <div class="flex justify-between gap-3">
          <div class="w-1/3">
            <label for="name" class="block text-gray-600">Name</label>
            <input type="text" id="name" v-model="name" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="w-1/3">
            <label for="username" class="block text-gray-600">Username</label>
            <input type="text" id="username" v-model="username" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="w-1/3">
            <label for="cin" class="block text-gray-600">CIN Number</label>
            <input type="text" id="cin" v-model="cin" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
        </div>
        <!-- Role and Email Selection -->
        <div class="flex justify-between gap-3">
          <div class="w-1/2">
            <label for="role" class="block text-gray-600">Role</label>
            <select id="role" v-model="role" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div class="w-1/2">
            <label for="email" class="block text-gray-600">Email</label>
            <input type="email" id="email" v-model="email" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
        </div>
        <!-- Password and Confirm Password next to each other -->
        <div class="flex justify-between gap-3">
          <div class="w-1/2">
            <label for="password" class="block text-gray-600">Password</label>
            <input type="password" id="password" v-model="password" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
          <div class="w-1/2">
            <label for="confirmPassword" class="block text-gray-600">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
        </div>
        <!-- Branch ID Selection and Photo Upload -->
        <div class="flex justify-between gap-3 mb-6">
          <div class="w-1/2">
            <label for="branchID" class="block text-gray-600">Branch</label>
            <select id="branchID" v-model="branchID" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
              <option v-for="branch in branches" :value="branch.branchID" :key="branch.id">{{ branch.branchName }}</option>
            </select>
          </div>
          <div class="w-1/2">
            <label for="photoUpload" class="block text-gray-600">Photo</label>
            <input type="file" id="photoUpload" @change="handleFileUpload" accept="image/*" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" required>
          </div>
        </div>
        <!-- Sign Up Button -->
        <div class="flex justify-center items-center">
          <button type="submit" class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Sign Up</span>
          </button>
        </div>
        <!-- Link to Login Page -->
        <p class="text-center mt-4">
          Already have an account? <a class="text-blue-500 hover:text-blue-700 cursor-pointer" @click="handleGoToLogin">Log in</a>
        </p>
      </form>
      <Notification v-if="showNotification" :message="notificationMessage" :type="notificationType" :show="showNotification" @hide="showNotification = false" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Notification from './NotifMsgBox.vue'; 

export default {
  name: 'SignUpPage',
  components: {
    Notification
  },
  data() {
    return {
      name: '',
      username: '',
      cin: '',
      role: 'user',
      email: '',
      password: '',
      confirmPassword: '',
      branchID: '',
      branches: [],
      photo: null,
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success', // Default notification type
      backendUrl: localStorage.getItem('backendUrl') || '',
      defaultBackendUrl: 'http://localhost:3000'
    };
  },
  methods: {
    async handleSignUp() {
      const url = this.backendUrl || this.defaultBackendUrl;
      localStorage.setItem('backendUrl', url); // Save backend URL to localStorage
      if (!this.photo) {
        this.notificationMessage = "Photo is required!";
        this.notificationType = 'warning'; // Set notification type to warning
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000); // Adjusted to match the notification box timing
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.notificationMessage = "Passwords do not match!";
        this.notificationType = 'warning'; // Set notification type to warning
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000); // Adjusted to match the notification box timing
        return;
      }
      const formData = new FormData();
      formData.append('image', this.photo);
      try {
        const uploadResponse = await axios.post(`${url}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const photoFilename = uploadResponse.data.fileName;
        const response = await axios.post(`${url}/users/signup`, {
          name: this.name,
          username: this.username,
          CIN: this.cin,
          role: this.role,
          email: this.email,
          password: this.password,
          branchID: this.branchID,
          photo: photoFilename
        });
        if (response.status === 201) {
          this.notificationMessage = "Signup successful!";
          this.notificationType = 'success'; // Ensure the notification type is success
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
            setTimeout(() => {
              window.location.reload(); // Reload the page after 3 seconds of showing the success message
            }, 10);
          }, 3000); // Adjusted to match the notification box timing
        } else {
          this.notificationMessage = response.data.message;
          this.notificationType = 'warning'; // Set notification type based on response
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 3000); // Adjusted to match the notification box timing
        }
      } catch (error) {
        console.error('Network error:', error);
        this.notificationMessage = 'Network error: ' + error.message;
        this.notificationType = 'warning'; // Set notification type to warning for errors
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000); // Adjusted to match the notification box timing
      }
    },
    handleFileUpload(event) {
      this.photo = event.target.files[0];
    },
    async fetchBranches() {
      try {
        const url = this.backendUrl || this.defaultBackendUrl;
        const response = await axios.get(`${url}/branches`);
        this.branches = response.data;
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    },
    handleGoToLogin() {
      window.location.reload();
    }
  },
  created() {
    this.fetchBranches();
  }
}
</script>