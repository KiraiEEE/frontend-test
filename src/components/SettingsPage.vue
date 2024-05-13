<template>
  <div class="flex items-center justify-center p-12">
    <div class="mx-auto w-full max-w-[550px]">
      <form @submit.prevent="updateProfile">
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="name" class="mb-3 block text-base font-medium text-[#07074D]">
                Name
              </label>
              <input v-model="user.name" type="text" id="name" placeholder="Enter your name" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                Email
              </label>
              <input v-model="user.email" type="email" id="email" placeholder="Enter your email" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="username" class="mb-3 block text-base font-medium text-[#07074D]">
                Username
              </label>
              <input v-model="user.username" type="text" id="username" placeholder="Enter your username" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="password" class="mb-3 block text-base font-medium text-[#07074D]">
                New Password
              </label>
              <input v-model="user.password" type="password" id="password" placeholder="Enter new password" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md">
            </div>
          </div>
        </div>
        <div>
          <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">
            Update Profile
          </button>
        </div>
      </form>
    </div>
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
        this.user = {...response.data, password: ''}; // Clear password after fetching
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
