<template>
  <li class="mb-2">
    <router-link :to="link" class="flex items-center px-3 py-2 text-gray-800 transition duration-300 ease-in-out rounded-md hover:bg-gray-100 hover:text-gray-900">
      <!-- Icon Container -->
      <div class="flex-shrink-0 mr-2">
        <div class="h-8 w-8 flex items-center justify-center rounded-md bg-gray-200 text-gray-600">
          <i :class="'fas fa-' + icon"></i>
        </div>
      </div>
      <!-- Title -->
      <span class="text-sm font-medium">{{ title }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    title: String,
    icon: String,
    link: String,
  },
}
</script>

<style>
/* You may need to customize the styling for the icon container based on your design */
</style>
