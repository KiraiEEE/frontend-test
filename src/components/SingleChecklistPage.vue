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
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Task ID</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Task Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Completion Date</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in doneTasks" :key="task.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ task.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ task.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ task.completedAt }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{'bg-green-100 text-green-800': task.status === 'completed', 'bg-red-100 text-red-800': task.status !== 'completed'}" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ task.status }}
              </span>
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
      doneTasks: []
    };
  },
  methods: {
    async fetchDoneTasksByDate() {
      try {
        const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
        const response = await axios.get(`${backendUrl}/donetasks/date`, { params: { date: this.selectedDate } });
        this.doneTasks = response.data;
      } catch (error) {
        console.error('Error fetching done tasks:', error);
        this.doneTasks = [];
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
