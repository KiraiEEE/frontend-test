<template>
  <div class="search-results bg-white p-6 rounded-lg shadow-lg">
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
    <div v-else class="text-center text-gray-700">
      <p>No tasks found matching the search criteria.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: this.$route.query.q || '',
      doneTasks: [],
      filteredDoneTasks: [],
      backendUrl: localStorage.getItem('backendUrl') || 'http://localhost:3000',
    };
  },
  watch: {
    searchQuery(newQuery, oldQuery) {
      if (newQuery !== oldQuery) {
        this.filterTasks();
      }
    }
  },
  methods: {
    fetchDoneTasks() {
      axios.get(`${this.backendUrl}/donetasks`)
        .then(response => {
          this.doneTasks = response.data;
          this.filterTasks();
        })
        .catch(error => {
          console.error('Error fetching done tasks:', error);
        });
    },
    filterTasks() {
      this.filteredDoneTasks = this.doneTasks.filter(task =>
        task.username.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        task.roomName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  created() {
    this.fetchDoneTasks();
  }
};
</script>
