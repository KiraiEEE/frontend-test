<template>
  <div v-if="isSuperAdmin" class="reset-room-status text-center mt-12">
    <h1 class="text-2xl font-bold mb-4">Reset All Room Statuses</h1>
    <button 
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="confirmReset">
      {{ buttonText }}
    </button>
  </div>
  <div v-else class="text-center mt-12">
    <h1 class="text-xl font-bold text-red-500">Access Denied</h1>
    <p>You must be a superadmin to access this page.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResetRoomStatus',
  data() {
    return {
      buttonText: 'Reset All Rooms',
      confirmed: false,
      backendUrl: localStorage.getItem('backendUrl'),
      isSuperAdmin: localStorage.getItem('role') === 'superadmin'
    };
  },
  created() {
    if (this.isSuperAdmin) {
      alert('Warning: Resetting room statuses cannot be undone.');
    }
  },
  methods: {
    async confirmReset() {
      if (!this.confirmed) {
        this.buttonText = 'Click Again to Confirm';
        this.confirmed = true;
      } else {
        try {
          const response = await axios.post(`${this.backendUrl}/rooms/resetStatuses`);
          alert(response.data.message);
          this.buttonText = 'Reset All Rooms';
          this.confirmed = false;
        } catch (error) {
          alert('Failed to reset room statuses: ' + error.message);
        }
      }
    }
  }
}
</script>
