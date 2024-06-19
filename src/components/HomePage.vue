<template>
  <div class="p-8 bg-white rounded-lg shadow-lg">

    <div class="mb-8 flex items-center justify-center space-x-3">
        <div class="p-2 bg-gray-200 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0l4.5 4.5M12 12H7.5m12 0a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
          </svg>
        </div>
        <div>
          <div class="text-lg font-semibold text-gray-800">{{ currentDate }}</div>
          <div class="text-sm text-gray-600">{{ currentTime }}</div>
        </div>
    </div>

    <div class="flex flex-col items-center">
      <div class="flex justify-center space-x-4 mb-4">
        <div v-for="room in rooms" :key="room.id" 
             :class="{
               'bg-red-500': room.status === 0,
               'bg-green-500': room.status === 1,
               'bg-yellow-500': room.status === 2,
               'bg-gray-500': room.status === null,
               'p-3': true,
               'rounded-lg': true,
               'text-white': true,
               'shadow-md': true
             }">
          <p class="text-center">{{ room.roomName.replace(/-/g, ' ') }}</p>
        </div>
      </div>
      <div class="flex justify-start space-x-2 items-center">
        <div class="flex items-center">
          <span class="h-3 w-3 bg-red-500 rounded-full mr-2"></span>
          <p class="text-sm text-gray-800">Not checked</p>
        </div>
        <div class="flex items-center">
          <span class="h-3 w-3 bg-yellow-500 rounded-full mr-2"></span>
          <p class="text-sm text-gray-800">Getting checked</p>
        </div>
        <div class="flex items-center">
          <span class="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
          <p class="text-sm text-gray-800">Checked</p>
        </div>
        <div class="flex items-center">
          <span class="h-3 w-3 bg-gray-500 rounded-full mr-2"></span>
          <p class="text-sm text-gray-800">Null</p>
          <a v-if="isSuperAdmin" href="/reset-room-status" class="text-blue-500 text-xs ml-4">   reset</a>
        </div>
      </div>
    </div>

    <MainHomeTable />
  </div>

</template>
<script>
import axios from 'axios';
import MainHomeTable from './MainHomeTable.vue';

export default {
  components: {
    MainHomeTable
  },
  data() {
    return {
      rooms: [],
      currentDate: new Date().toLocaleDateString(),
      currentTime: new Date().toLocaleTimeString(),
      isSuperAdmin: localStorage.getItem('role') === 'superadmin'
    };
  },
  created() {
    this.fetchRooms();
    this.updateTime();
    this.refreshRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const backendUrl = localStorage.getItem('backendUrl');
        const response = await axios.get(`${backendUrl}/rooms`);
        this.rooms = response.data;
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    },
    updateTime() {
      setInterval(() => {
        this.currentDate = new Date().toLocaleDateString();
        this.currentTime = new Date().toLocaleTimeString();
      }, 1000);
    },
    refreshRooms() {
      setInterval(() => {
        this.fetchRooms();
      }, 10000); // Refresh room data every 10 seconds
    }
  }
}
</script>