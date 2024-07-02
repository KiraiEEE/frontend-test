<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
    integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  <nav class="navbar flex justify-between items-center h-20 px-8 border border-gray-300 sticky top-0 bg-white z-50" @click.self="closeMenus">
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
      <form @submit.prevent="submitSearch">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search"
          class="w-full bg-transparent px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-700 transition duration-300 ease-in-out"
        />
        <button type="submit" class="absolute right-0 top-0 mt-2 mr-2">
          <i class="fas fa-search text-gray-600 text-lg"></i>
        </button>
      </form>
    </div>

    <div class="flex items-center">
      <div class="relative group mr-4"> 
        <button @click.stop="toggleUserMenu" class="text-gray-600 text-lg focus:outline-none hover:text-gray-800 transition-colors duration-300">
           <img :src="userPhotoUrl" alt="User Avatar" class="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9 hover:opacity-75 transition-opacity duration-300">
        </button>
        <transition name="fast-slide-fade">
          <div
            v-show="isUserMenuVisible"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10"
            @mouseleave="closeMenus"
          >
            <router-link
              to="/settings"
              class="block px-4 py-2 text-gray-800 hover:bg-gray-200"
            >
              <i class="fas fa-cog mr-2"></i>Profile Settings
            </router-link>
            <router-link to="/about" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              <i class="fas fa-info-circle mr-2"></i>About
            </router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200">
              <i class="fas fa-sign-out-alt mr-2"></i>Logout
            </button>
          </div>
        </transition>

      </div>

      <div class="relative group">
        <button @click.stop="toggleNotificationsMenu" class="text-gray-600 text-lg focus:outline-none hover:text-gray-800 transition-colors duration-300">
          <i class="fas fa-bell fa-lg"></i>
        </button>
        <transition name="fast-slide-fade">
          <div
            v-show="isNotificationsMenuVisible"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden z-10"
            @mouseleave="closeMenus"
          >
            <p class="px-4 py-2 text-gray-800">Notifications</p>
            <div class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              MAIN-LTN-3 is <span class="text-red-500 font-bold">undone</span>
            </div>
            <div class="block px-4 py-2 text-gray-800 hover:bg-gray-200">
              BACKUP-LTN-3 is <span class="text-green-500 font-bold">done</span>
            </div>
          </div>
        </transition>
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
      isUserMenuVisible: false,
      isNotificationsMenuVisible: false,
      userRooms: [],
      searchQuery: ''
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      window.location.reload();
    },
    toggleSidebar() {
      this.$emit('toggle-sidebar');
    },
    toggleUserMenu() {
      this.isUserMenuVisible = !this.isUserMenuVisible;
      this.isNotificationsMenuVisible = false; // Close notifications menu when user menu is toggled
    },
    toggleNotificationsMenu() {
      this.isNotificationsMenuVisible = !this.isNotificationsMenuVisible;
      this.isUserMenuVisible = false; // Close user menu when notifications menu is toggled
      this.fetchUserRooms();
    },
    closeMenus() {
      this.isUserMenuVisible = false;
      this.isNotificationsMenuVisible = false;
    },
    fetchUserPhoto() {
      const userId = localStorage.getItem('userId');
      const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000'; // Default to localhost if not set
      axios.get(`${backendUrl}/users/${userId}`)
        .then(response => {
          const photoFilename = response.data.photo;
          this.userPhotoUrl = `${backendUrl}/images/${photoFilename}`;
        })
        .catch(error => {
          console.error('Error fetching user photo:', error);
        });
    },
    fetchUserRooms() {
      const userId = localStorage.getItem('userId');
      const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
      axios.get(`${backendUrl}/userrooms/${userId}`)
        .then(response => {
          this.userRooms = response.data.rooms;
        })
        .catch(error => {
          console.error('Error fetching user rooms:', error);
        });
    },
    submitSearch() {
      this.$router.push({ path: '/search', query: { q: this.searchQuery } });
    }
  },
  created() {
    this.fetchUserPhoto();
  }
};
</script>

<style>
.fast-slide-fade-enter-active, .fast-slide-fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}
.fast-slide-fade-enter, .fast-slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
