<!-- HomePage.vue -->

<template>
  <div>

    <div class="flex flex-row justify-center space-x-4">
        <div class="flex flex-row justify-center space-x-4">
          <!-- Dynamic colored cards based on room status -->
          <div v-for="room in rooms" :key="room.id" :class="{'bg-red-500': room.status === 0, 'bg-green-500': room.status === 1, 'bg-yellow-500': room.status === 2, 'p-1': true, 'rounded-lg': true, 'text-white': true}">
            <p>{{ room.roomName }}</p>
          </div>
        </div>
    </div>

<div className="h-screen bg-white-100 p-6">

      
      <!-- { /*variation light set*/ } -->
       <div  class='flex bg-white shadow-md justify-start md:justify-center rounded-lg overflow-x-scroll mx-auto py-4 px-2  md:mx-12'>
        
          <div class='flex group hover:bg-purple-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16'>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-900 group-hover:text-purple-900 text-sm transition-all	duration-300'> Sun </p>
                     <p class='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all	duration-300'> 11 </p>
                  </div>
              </div>
          </div>
        
        <div class='flex group hover:bg-purple-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16'>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-900 group-hover:text-purple-900 text-sm transition-all	duration-300'> Mon </p>
                     <p class='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all	duration-300'> 12 </p>
                  </div>
              </div>
          </div>
        
        <div class='flex group hover:bg-purple-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16'>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-900 group-hover:text-purple-900 text-sm transition-all	duration-300'> Tue </p>
                     <p class='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all	duration-300'> 13</p>
                  </div>
              </div>
          </div>
        
          <div class='flex group bg-purple-300 shadow-lg light-shadow rounded-lg mx-1 cursor-pointer justify-center relative w-16 content-center'>
            <span class="flex h-3 w-3 absolute -top-1 -right-1">
              <span class="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-purple-400 "></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-purple-900 text-sm'> Wed </p>
                     <p class='text-purple-900  mt-3 font-bold'> 14 </p>
                  </div>
              </div>
          </div>
        
        <div class='flex group hover:bg-purple-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all	duration-300 content-center	 cursor-pointer justify-center w-16'>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-900 group-hover:text-purple-900 text-sm transition-all	duration-300'> Thu </p>
                     <p class='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all	duration-300'> 15 </p>
                  </div>
              </div>
          </div>
        
        <div class='flex group hover:bg-purple-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16'>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-900 group-hover:text-purple-900 text-sm transition-all	duration-300'> Fri </p>
                     <p class='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all	duration-300'> 16 </p>
                  </div>
              </div>
          </div>
          
        <div class='flex group hover:bg-purple-100 hover:shadow-lg hover-light-shadow rounded-lg mx-1 transition-all	duration-300	 cursor-pointer justify-center w-16'>
              <div class='flex items-center px-4 py-4'>
                  <div class='text-center'>
                     <p class='text-gray-900 group-hover:text-purple-900 text-sm transition-all	duration-300'> Sat </p>
                     <p class='text-gray-900 group-hover:text-purple-900 mt-3 group-hover:font-bold transition-all	duration-300'> 17 </p>
                  </div>
              </div>
          </div>
          
        
      </div>
      

      
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      rooms: []
    };
  },
  created() {
    this.fetchRooms();
  },
  methods: {
    async fetchRooms() {
      try {
        const response = await axios.get('http://localhost:3000/rooms');
        this.rooms = response.data;
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    }
  }
}
</script>