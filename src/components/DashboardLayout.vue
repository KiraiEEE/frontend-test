<template>
  <div>
    <NavBar />
    <div class="flex">
      <SideBar :selectedItem="selectedItem" @updateSelectedItem="updateSelectedItem" />
      <div class="flex-1 bg-gray-50 p-4">
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
