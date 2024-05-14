<template>
  <li>
    <router-link :to="link" class="flex items-center px-4 py-2 text-gray-700 transition duration-300 ease-in-out rounded-lg hover:bg-gray-100 hover:text-gray-900">
      <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md mr-3">
        <i :class="'fas fa-' + icon"></i>
      </div>
      <span class="text-sm font-medium">{{ title }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
li {
  margin-bottom: 0.5rem;
}
</style>
