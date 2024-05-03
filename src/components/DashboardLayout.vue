<!-- DashboardLayout.vue is the main layout component for the dashboard. It includes a navbar, sidebar, and main content area where different pages will be displayed based on the selected sidebar item. -->

<template>
  <div>
    <NavBar />
    <div class="flex">
      <SideBar :selectedItem="selectedItem" @updateSelectedItem="updateSelectedItem" />

      <!-- Main Content -->
      <div class="flex-1 bg-gray-50 p-4">
        <!-- Use router-view to switch between pages -->
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
      selectedItem: 'HomePage'
    }
  },
  methods: {
    updateSelectedItem(item) {
      this.selectedItem = item;
    }
  }
}
</script>
