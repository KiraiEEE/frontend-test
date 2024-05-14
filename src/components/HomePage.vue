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

  
  <div class="flex justify-center space-x-4">
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



  </div>
</template>

<script>
import axios from 'axios';

export default {
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
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axios.get('http://localhost:3000/rooms');
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
    }
  }
}
</script>