<!-- SideBar.vue -->

<template>
  <aside class="hidden md:block bg-white md:w-64 md:border-r md:border-gray-100 overflow-y-auto md:overflow-y-visible">
    <!-- Sidebar content -->
    <ul class="py-6">
      <!-- Sidebar items -->
      <SidebarItem title="Home" icon="home" link="/" />
      <SidebarItem title="Checklist Management" icon="check-square" link="/checklist" />
      <SidebarItem title="User Management" icon="user" link="/users" />
      <SidebarItem title="Equipment Management" icon="archive" link="/equipment" />
      <SidebarItem title="Documentation Management" icon="book" link="/documentation" />
      <SidebarItem title="Checklist Customizer" icon="list-ol" link="/customize" />
      <SidebarItem title="Settings" icon="cog" link="/settings" />
    </ul>
  </aside>
</template>

<script>
import SidebarItem from './SidebarItem.vue';

export default {
  name: 'SideBar',
  components: {
    SidebarItem,
  },
  
}
</script>