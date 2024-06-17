<template>
    <li>
      <div class="flex items-center px-4 py-2 text-gray-600 cursor-default">
        <i :class="'fas fa-' + icon + ' mr-2'"></i>{{ title }}
      </div>
      <ul class="space-y-1">
        <slot></slot>
      </ul>
    </li>
  </template>
  
  <script>
  export default {
    name: 'SidebarGroup',
    props: {
      title: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    }
  }
  </script>
  