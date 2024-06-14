<template>
  <div class="done-tasks-report">
    <h1 class="text-2xl font-bold text-center my-4">Done Tasks Report</h1>
    <div class="flex justify-center my-4">
      <input type="date" v-model="selectedDate" class="form-input px-4 py-2 border rounded">
      <button @click="fetchDoneTasksByDate" class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Fetch Tasks
      </button>
    </div>
    <div v-if="doneTasks.length > 0">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Task Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Problem</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Solution</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">User</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Room</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Photo</th>
            <th v-if="isSuperAdmin" class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in doneTasks" :key="task.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ task.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{'bg-green-100 text-green-800': task.okay, 'bg-red-100 text-red-800': !task.okay}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                <i :class="{'fas fa-check': task.okay, 'fas fa-exclamation-triangle': !task.okay}"></i>
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ task.problem }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ task.solution }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ task.user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ task.room.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <img :src="`/images/${task.photo}`" alt="Task Photo" class="h-10 w-10 rounded-full">
            </td>
            <td v-if="isSuperAdmin" class="px-6 py-4 whitespace-nowrap">
              <button @click="showDeleteConfirmation(task.id)" class="delete-btn ml-2 border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-500">No tasks found for selected date.</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10), // default today's date
      doneTasks: [],
      isSuperAdmin: localStorage.getItem('role') === 'superadmin'
    };
  },
  methods: {
    async fetchDoneTasksByDate() {
      try {
        const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
        const response = await axios.get(`${backendUrl}/donetasks/date`, { params: { date: this.selectedDate } });
        this.doneTasks = response.data.map(async task => {
          const user = await axios.get(`${backendUrl}/users/${task.userID}`);
          const room = await axios.get(`${backendUrl}/rooms/${task.roomID}`);
          return {
            ...task,
            user: user.data,
            room: room.data,
            name: task.equipmentID ? (await axios.get(`${backendUrl}/equipments/${task.equipmentID}`)).data.name : (await axios.get(`${backendUrl}/tasks/${task.taskID}`)).data.name
          };
        });
      } catch (error) {
        console.error('Error fetching done tasks:', error);
        this.doneTasks = [];
      }
    },
    showDeleteConfirmation(taskId) {
      if (confirm('Are you sure you want to delete this task?')) {
        this.deleteDoneTask(taskId);
      }
    },
    async deleteDoneTask(taskId) {
      try {
        const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
        await axios.delete(`${backendUrl}/donetasks/${taskId}`);
        this.doneTasks = this.doneTasks.filter(task => task.id !== taskId);
      } catch (error) {
        console.error('Error deleting done task:', error);
      }
    }
  }
}
</script>

<style scoped>
.done-tasks-report table {
  width: 100%;
  border-collapse: collapse;
}
.done-tasks-report th, .done-tasks-report td {
  border: 1px solid #ddd;
  padding: 8px;
}
.done-tasks-report th {
  background-color: #f3f3f3;
}
</style>
