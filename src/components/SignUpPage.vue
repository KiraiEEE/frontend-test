<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="w-full max-w-lg p-8 shadow-lg rounded-lg">
      <h1 class="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
      <form @submit.prevent="handleSignUp" class="space-y-4">
        <!-- Name, Username, CIN in one row -->
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
        <!-- Branch ID Selection -->
        <div class="mb-6">
          <label for="branchID" class="block text-gray-600">Branch</label>
          <select id="branchID" v-model="branchID" class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
            <option v-for="branch in branches" :value="branch.branchID" :key="branch.id">{{ branch.branchName }}</option>
          </select>
        </div>
        <!-- Sign Up Button -->
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">Sign Up</button>
      </form>
      <Notification v-if="showNotification" :message="notificationMessage" :show="showNotification" @hide="showNotification = false" />
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
      showNotification: false,
      notificationMessage: ''
    };
  },
  methods: {
    async handleSignUp() {
      if (this.password !== this.confirmPassword) {
        this.notificationMessage = "Passwords do not match!";
        this.showNotification = true;
        return;
      }
      try {
        const response = await axios.post('http://localhost:3000/users/signup', {
          name: this.name,
          username: this.username,
          CIN: this.cin,
          role: this.role,
          email: this.email,
          password: this.password,
          branchID: this.branchID  // Ensuring the selected branchID is sent
        });
        if (response.status === 201) {
          this.notificationMessage = "Signup successful!";
          this.showNotification = true;
          this.$router.push('/login');
        } else {
          this.notificationMessage = response.data.message;
          this.showNotification = true;
        }
      } catch (error) {
        console.error('Network error:', error);
        this.notificationMessage = 'Network error: ' + error.message;
        this.showNotification = true;
      }
    },
    async fetchBranches() {
      try {
        const response = await axios.get('http://localhost:3000/branches');
        this.branches = response.data;
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    }
  },
  created() {
    this.fetchBranches();
  }
}
</script>