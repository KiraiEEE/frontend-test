<!-- HomePage.vue -->
<template>

  <div>

  
    <div class="flex flex-col items-center ">
    <div class="bg-white p-3 pl-7 pr-7 shadow rounded-lg">
      <div class="text-lg font-semibold text-gray-800">{{ currentDate }}</div>
      <div class="text-sm text-gray-600">{{ currentTime }}</div>
    </div>
  </div>

  

  <br>

  
  <div class="flex flex-col items-center">
    <div class="flex justify-center space-x-4 mb-4">
      <div v-for="room in rooms" :key="room.id" 
           :class="{
             'bg-red-500': room.status === 0,
             'bg-green-500': room.status === 1,
             'bg-yellow-500': room.status === 2,
             'bg-black': room.status === null,
             'p-2': true,
             'rounded-xl': true,
             'text-white': true,
           }">
        <p class="text-center">{{ room.roomName.replace(/-/g, ' ') }}</p>
      </div>
    </div>
    <div class="flex justify-start space-x-2 items-center">
      <div class="flex items-center">
        <span class="h-2 w-2 bg-red-500 rounded-full mr-1"></span>
        <p class="text-black text-xs">Not checked</p>
      </div>
      <div class="flex items-center">
        <span class="h-2 w-2 bg-yellow-500 rounded-full mr-1"></span>
        <p class="text-black text-xs">Getting checked</p>
      </div>
      <div class="flex items-center">
        <span class="h-2 w-2 bg-green-500 rounded-full mr-1"></span>
        <p class="text-black text-xs">Checked</p>
      </div>
      <div class="flex items-center">
        <span class="h-2 w-2 bg-black rounded-full mr-1"></span>
        <p class="text-black text-xs">Null</p>
      </div>
    </div>
    </div>
  </div>

  <br>
  <MainHomeTable />

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
      currentTime: new Date().toLocaleTimeString()
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