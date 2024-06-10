<template>
  <div class="settings-page bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold text-left text-gray-800 mb-6">Profile Settings</h1>
    <div class="mx-auto w-full max-w-[550px]">

      <form @submit.prevent="updateProfile" enctype="multipart/form-data">
        <div class="-mx-3 flex flex-wrap">
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="name" class="block text-gray-800 font-bold mb-2">
                Name
              </label>
              <input v-model="user.name" type="text" id="name" placeholder="Enter your name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="username" class="block text-gray-800 font-bold mb-2">
                Username
              </label>
              <input v-model="user.username" type="text" id="username" placeholder="Enter your username" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="email" class="block text-gray-800 font-bold mb-2">
                Email
              </label>
              <input v-model="user.email" type="email" id="email" placeholder="Enter your email" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}">
            </div>
          </div>
          <div class="w-full px-3" v-if="user.role === 'superadmin'">
            <div class="mb-5">
              <label for="branchID" class="block text-gray-800 font-bold mb-2">
                Branch
              </label>
              <select id="branchID" v-model="user.branchID" class="input-field form-select block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
                <option v-for="branch in branches" :value="branch.branchID" :key="branch.id">{{ branch.branchName }}</option>
              </select>
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="password" class="block text-gray-800 font-bold mb-2">
                New Password
              </label>
              <input v-model="user.password" type="password" id="password" placeholder="Enter new password" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
            </div>
          </div>
          <div class="w-full px-3">
            <div class="mb-5">
              <label for="photoUpload" class="block text-gray-800 font-bold mb-2">
                Update Photo
              </label>
              <input type="file" id="photoUpload" @change="handleFileUpload" accept="image/*" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent">
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50" type="submit">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
  <Notification v-if="showNotification" :message="notificationMessage" :show="showNotification" :type="notificationType" @hide="showNotification = false" />
</template>
<script>
import axios from 'axios';
import Notification from './NotifMsgBox.vue';

export default {
  name: 'SettingsPage',
  components: {
    Notification
  },
  data() {
    return {
      user: {
        name: '',
        email: '',
        username: '',
        password: '',
        branchID: '',
        role: ''
      },
      branches: [],
      photo: null,
      showNotification: false,
      notificationMessage: '',
      notificationType: 'success' // Default notification type
    };
  },
  created() {
    this.fetchUserData();
    this.fetchBranches();
  },
  methods: {
    async fetchUserData() {
      const userId = localStorage.getItem('userId');
      const backendUrl = localStorage.getItem('backendUrl');
      try {
        const response = await axios.get(`${backendUrl}/users/${userId}`);
        this.user = {...response.data, password: ''}; // Clear password after fetching
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        this.notificationMessage = 'Failed to fetch user data: ' + error.message;
        this.notificationType = 'warning';
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      }
    },
    async fetchBranches() {
      const backendUrl = localStorage.getItem('backendUrl');
      try {
        const response = await axios.get(`${backendUrl}/branches`);
        this.branches = response.data;
      } catch (error) {
        console.error('Failed to fetch branches:', error);
      }
    },
    handleFileUpload(event) {
      this.photo = event.target.files[0];
    },
    async updateProfile() {
      const userId = localStorage.getItem('userId');
      const backendUrl = localStorage.getItem('backendUrl');
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(this.user.email)) {
        this.notificationMessage = 'Invalid email format!';
        this.notificationType = 'warning';
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
        return;
      }
      const formData = new FormData();
      if (this.photo) {
        formData.append('image', this.photo);
        try {
          const uploadResponse = await axios.post(`${backendUrl}/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.user.photo = uploadResponse.data.fileName;
        } catch (error) {
          console.error('Failed to upload photo:', error);
          this.notificationMessage = 'Failed to upload photo: ' + error.message;
          this.notificationType = 'warning';
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 3000);
          return;
        }
      }
      try {
        await axios.put(`${backendUrl}/users/${userId}`, this.user);
        this.notificationMessage = 'Profile updated successfully!';
        this.notificationType = 'success';
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      } catch (error) {
        console.error('Failed to update profile:', error);
        this.notificationMessage = 'Failed to update profile: ' + error.message;
        this.notificationType = 'warning';
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000);
      }
    }
  }
}
</script>