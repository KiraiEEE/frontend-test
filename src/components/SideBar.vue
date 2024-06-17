<template>
  <aside class="hidden md:flex flex-col bg-white text-gray-800 md:w-64 md:border-r md:border-gray-300 overflow-y-auto md:overflow-y-visible">
    <ul class="py-6 space-y-4">
      <SidebarItem title="Home" icon="home" link="/" />
      <SidebarGroup title="Structure & Resources" icon="building">
        <template v-if="isSuperAdmin">
          <SidebarItem title="Branches" icon="code-branch" link="/branches" />
        </template>
        <SidebarItem title="Rooms" icon="door-open" link="/rooms" />
        <SidebarItem title="Users" icon="users" link="/users" />
        <SidebarItem title="Equipments" icon="tools" link="/equipments" />
      </SidebarGroup>
      <SidebarGroup title="Checklists" icon="check-square">
        <SidebarItem title="Done Tasks" icon="check-circle" link="/single-checklist" />
        <SidebarItem title="Tasks Editor" icon="edit" link="/customize" />
        <SidebarItem title="Checklists Editor" icon="tasks" link="/checklist" />
        <SidebarItem title="Documentations" icon="file-alt" link="/documentations" />
      </SidebarGroup>
      <SidebarGroup title="Settings" icon="cog">
        <SidebarItem title="Profile" icon="user-circle" link="/settings" />
        <SidebarItem title="General" icon="sliders-h" link="/settings/general" />
      </SidebarGroup>
    </ul>
  </aside>
</template>

<script>
import SidebarItem from './SidebarItem.vue';
import SidebarGroup from './SidebarGroup.vue';

export default {
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarGroup,
  },
  computed: {
    isSuperAdmin() {
      return localStorage.getItem('role') === 'superadmin';
    }
  }
}
</script>

<style scoped>
aside {
  transition: width 0.3s ease-in-out;
}
</style>
