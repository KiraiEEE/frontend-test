<template>
  <div class="settings-page p-6">
    <h1 class="text-2xl font-bold mb-4">Edit Profile</h1>
    <form @submit.prevent="updateProfile">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input v-model="user.name" type="text" id="name" placeholder="Enter your name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="user.email" type="email" id="email" placeholder="Enter your email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input v-model="user.username" type="text" id="username" placeholder="Enter your username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="user.password" type="password" id="password" placeholder="Enter new password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Update Profile
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SettingsPage',
  data() {
    return {
      user: {
        name: '',
        email: '',
        username: '',
        password: ''
      }
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    },
    async updateProfile() {
      const userId = localStorage.getItem('userId');
      try {
        await axios.put(`http://localhost:3000/users/${userId}`, this.user);
        alert('Profile updated successfully!');
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  }
}
</script>

<style scoped>
.settings-page {
  max-width: 600px;
  margin: auto;
}
</style>
