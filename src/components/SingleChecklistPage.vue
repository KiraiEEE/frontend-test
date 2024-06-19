<template>
  <div class="done-tasks-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="text-center">
      <label for="selectedDate" class="font-bold mr-2">Day:</label>
      <input type="date" id="selectedDate" v-model="selectedDate" class="border border-gray-300 p-2 rounded-lg">
    </div><br>
    <div v-if="filteredDoneTasks.length > 0" class="done-task-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">DoneTask</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Date</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Photo</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Status</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Problem</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Solution</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">User</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Room</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in filteredDoneTasks"
            :key="item.doneTaskID"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.taskName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ formatDateTime(item.date) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <img :src="`${backendUrl}/images/${item.photo}`" alt="Task Photo" class="w-20 h-20 object-cover rounded-md cursor-pointer" @click="showImage(item.photo)">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <span class="flex items-center">
                <i :class="item.okay ? 'fas fa-check-circle text-green-500' : 'fas fa-exclamation-circle text-red-500'"></i>
                <span class="ml-2">{{ item.okay ? 'OK' : 'Issue' }}</span>
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <template v-if="item.problem">
                {{ item.problem }}
              </template>
              <template v-else>
                <span>ø</span>
              </template>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <template v-if="item.solution">
                {{ item.solution }}
              </template>
              <template v-else>
                <span>ø</span>
              </template>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.roomName || 'Unknown Room' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                @click="showDeleteConfirmation(item.doneTaskID)"
                class="delete-btn ml-2 border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounceIn">
      <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Delete Done Task</h3>
          <p class="text-gray-800 mb-4">Are you sure you want to delete this done task?</p>
          <div class="text-center">
            <button @click="deleteDoneTask(currentDoneTaskID)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
            <button @click="showDeleteModal = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="pop">
      <div v-if="showImageModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50" @click.self="showImageModal = false">
        <img :src="`${backendUrl}/images/${currentImage}`" alt="Expanded Task Photo" class="max-w-full max-h-full p-4 animate__animated animate__zoomIn">
        <button @click="showImageModal = false" class="absolute top-0 right-0 m-4 text-white text-3xl">&times;</button>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      doneTasks: [],
      showDeleteModal: false,
      showImageModal: false,
      currentDoneTaskID: null,
      currentImage: '',
      backendUrl: localStorage.getItem('backendUrl') || 'http://localhost:3000',
      selectedDate: new Date().toISOString().substr(0, 10), // Default to today's date
    };
  },
  computed: {
    filteredDoneTasks() {
      return this.doneTasks.filter(task => this.formatDate(task.date) === this.selectedDate);
    }
  },
  created() {
    this.fetchDoneTasks();
  },
  methods: {
    async fetchDoneTasks() {
      try {
        const response = await axios.get(`${this.backendUrl}/donetasks`);
        const tasksWithDetails = await Promise.all(response.data.map(async task => {
          const taskName = await this.fetchTaskName(task.taskID,task.equipmentID);
          const username = await this.fetchUserName(task.userID);
          const roomName = await this.fetchRoomName(task.roomID) || 'Unknown Room';
          return { ...task, taskName, username, roomName };
        }));
        this.doneTasks = tasksWithDetails;
        console.log('Fetched Done Tasks:', this.doneTasks); // Log fetched tasks for debugging
      } catch (error) {
        console.error('Error fetching done tasks:', error);
      }
    },
    async fetchTaskName(taskID, equipmentID) {
      try {
        let response;
        if (taskID) {
          response = await axios.get(`${this.backendUrl}/tasks/${taskID}`);
          console.log('Task Name Response:', response.data); // Log the response data
          return response.data.taskTitle;
        } else if (equipmentID) {
          response = await axios.get(`${this.backendUrl}/equipments/${equipmentID}`);
          console.log('Equipment Name Response:', response.data); // Log the response data
          return response.data.equipmentName;
        }
        return 'No Task or Equipment ID provided';
      } catch (error) {
        console.error('Error fetching task or equipment name:', error);
        return 'Name Unavailable';
      }
    },
    async fetchUserName(userID) {
      try {
        const response = await axios.get(`${this.backendUrl}/users/${userID}`);
        return response.data.username || 'Unknown User';
      } catch (error) {
        console.error('Error fetching user name:', error);
        return 'Unknown User';
      }
    },
    async fetchRoomName(roomID) {
      try {
        const response = await axios.get(`${this.backendUrl}/rooms/${roomID}`);
        console.log('Room Name Response:', response.data); // Log the response data
        return response.data.roomName || 'Unknown Room';
      } catch (error) {
        console.error('Error fetching room name:', error);
        return 'Unknown Room';
      }
    },
    async deleteDoneTask(doneTaskID) {
      try {
        await axios.delete(`${this.backendUrl}/donetasks/${doneTaskID}`);
        this.doneTasks = this.doneTasks.filter(item => item.doneTaskID !== doneTaskID);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting done task:', error);
      }
    },
    showDeleteConfirmation(doneTaskID) {
      this.currentDoneTaskID = doneTaskID;
      this.showDeleteModal = true;
    },
    showImage(photo) {
      this.currentImage = photo;
      this.showImageModal = true;
    },
    formatDateTime(dateTime) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateTime).toLocaleDateString(undefined, options);
    },
    formatDate(date) {
      return new Date(date).toISOString().substr(0, 10);
    }
  },
};
</script>
