<template>
  <div class="p-6">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="checklist">
        Select Checklist
      </label>
      <select v-model="selectedChecklistId" @change="filterTasksByChecklist" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
        <option value="" disabled>Select a Checklist</option>
        <option v-for="checklist in checklists" :key="checklist.checklistID" :value="checklist.checklistID">
          {{ checklist.checklistType }}
        </option>
      </select>
    </div>
    <div v-if="filteredTasks.length > 0" class="mt-4">
      <h2 class="text-lg font-semibold mb-2">Tasks for Selected Checklist</h2>
      <ul class="list-disc pl-5">
        <li v-for="task in filteredTasks" :key="task.taskID">
          {{ task.taskTitle }}
        </li>
      </ul>
    </div>
    <div v-else class="mt-4 text-gray-700">
      No tasks found for this checklist.
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      checklists: [],
      tasks: [],
      selectedChecklistId: '',
      filteredTasks: []
    };
  },
  created() {
    this.fetchChecklists();
    this.fetchTasks();
  },
  methods: {
    async fetchChecklists() {
      try {
        const response = await axios.get('http://localhost:3000/checklists');
        this.checklists = response.data;
      } catch (error) {
        console.error('Error fetching checklists:', error);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    filterTasksByChecklist() {
      if (this.selectedChecklistId) {
        this.filteredTasks = this.tasks.filter(task => task.checklistID === parseInt(this.selectedChecklistId));
      } else {
        this.filteredTasks = [];
      }
    }
  }
}
</script>

<style scoped>
.select-dropdown {
  background-color: white;
  border: 1px solid #d1d5db; /* Gray-300 */
  border-radius: 0.375rem; /* 6px */
  padding: 0.5rem 1rem; /* 8px 16px */
}
</style>

