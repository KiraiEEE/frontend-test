<!-- NavBar.vue -->

<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <nav class="navbar flex justify-between items-center h-20 px-8 border border-gray-300">
    <div class="flex items-center">
      <button @click="toggleSidebar" class="mr-4">
        <i class="fas fa-bars text-gray-600 text-lg"></i>
      </button>
      <router-link to="/">
        <img
          src="@/assets/mainlogolow.svg"
          alt="Logo"
          class="h-8 mr-4"
        />
      </router-link>
    </div>

    <div class="search relative w-full md:w-auto mr-4">
      <input
        type="text"
        placeholder="Search"
        class="w-full bg-transparent px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-700 transition duration-300 ease-in-out"
      />
      <button class="absolute right-0 top-0 mt-2 mr-2">
        <i class="fas fa-search text-gray-600 text-lg"></i>
      </button>
    </div>

    <div class="flex items-center">
      <div class="relative group mr-4"> 
        <button class="text-gray-600 text-lg focus:outline-none hover:text-gray-800 transition-colors duration-300">
           <img :src="userPhotoUrl" alt="User Avatar" class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 hover:opacity-75 transition-opacity duration-300">
        </button>
        <div
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
          <router-link
            to="/settings"
            class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
          >
            Settings
          </router-link>
          <router-link to="/about" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            About
          </router-link>
          <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
            Logout
          </button>
        </div>
      </div>

      <div class="relative group">
        <button class="text-gray-600 text-lg focus:outline-none hover:text-gray-800 transition-colors duration-300">
          <i class="fas fa-bell fa-lg"></i>
        </button>
        <div
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10 invisible group-hover:visible group-focus:visible transition-opacity duration-300 ease-in-out"
        >
          <p class="px-4 py-2 text-gray-800">Notifications</p>
          <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
            See All Notifications
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: "NavBar",
  data() {
    return {
      userPhotoUrl: '',
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('userId');
      window.location.reload();
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    fetchUserPhoto() {
      const userId = localStorage.getItem('userId');
      axios.get(`http://localhost:3000/users/${userId}`)
        .then(response => {
          const photoFilename = response.data.photo;
          this.userPhotoUrl = `http://localhost:3000/images/${photoFilename}`;
        })
        .catch(error => {
          console.error('Error fetching user photo:', error);
        });
    }
  },
  created() {
    this.fetchUserPhoto();
  }
};
</script>
