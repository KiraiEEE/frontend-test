<template>
  <div>
    <NavBar @toggle-sidebar="toggleSidebar" class="sticky top-0 z-50" />
    <div class="flex">
      <transition
        name="slide"
        enter-active-class="animate-slide-in"
        leave-active-class="animate-slide-out"
      >
        <SideBar v-if="sidebarOpen" :selectedItem="selectedItem" @updateSelectedItem="updateSelectedItem" class="w-64 sticky top-0" />
      </transition>
      <div class="flex-grow bg-gray-50 p-4 transition-all duration-300 ease-in-out">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import SideBar from './SideBar.vue'

export default {
  components: {
    NavBar,
    SideBar
  },
  data() {
    return {
      selectedItem: 'HomePage',
      sidebarOpen: true
    }
  },
  methods: {
    updateSelectedItem(item) {
      this.selectedItem = item;
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
}
</script>

<style scoped>
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-slide-in {
  animation: slideIn 0.5s ease forwards;
}

.animate-slide-out {
  animation: slideOut 0.5s ease forwards;
}

/* Improved sidebar styling */
.SideBar {
  width: 256px; /* Fixed width for better control */
  background-color: #f3f4f6; /* Lighter background for better contrast */
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  z-index: 1000; /* Ensures sidebar is above other content */
}
</style>
