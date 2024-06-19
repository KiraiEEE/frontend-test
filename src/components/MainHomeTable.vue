<template>
  <div class="py-8 w-4/5 mx-auto">
    <div class="shadow overflow-hidden rounded-lg border-b border-gray-300">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-200 text-gray-700">
          <tr>
            <th class="w-1/12 text-left py-3 px-4">
              <button @click="prevWeek" class="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition-all duration-300 ease-in-out">
                <i class="fas fa-chevron-left"></i> 
              </button>
            </th>
            <th class="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Task Frequency</th>
            <th v-for="day in displayedDays" :key="day" class="text-left py-3 px-4 uppercase font-semibold text-sm">{{ formatDate(day) }}</th>
            <th class="w-1/12 text-left py-3 px-4">
              <button @click="nextWeek" class="border border-gray-300 text-gray-700 font-bold py-2 px-4 rounded-full hover:bg-gray-300 transition-all duration-300 ease-in-out">
                <i class="fas fa-chevron-right"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="task in tasks" :key="task.taskID" :class="{'bg-gray-100': taskIndex % 2 === 1}">
            <td class="w-1/12"></td>
            <td class="w-1/3 text-left py-3 px-4">{{ task.taskTitle }}</td>
            <td v-for="day in displayedDays" :key="day" class="text-left py-3 px-4">
              <span :class="getTaskStatus(task.taskID, day) ? 'text-green-500' : 'text-red-500'">
                {{ getTaskStatus(task.taskID, day) ? '✔' : '✘' }}
              </span>
            </td>
            <td class="w-1/12"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MainHomeTable',
  data() {
    return {
      tasks: [],
      doneTasks: [],
      displayedDays: this.getLastSixDays(),
      backendUrl: localStorage.getItem('backendUrl') || 'http://localhost:3000',
    };
  },
  created() {
    this.fetchTasks();
    this.fetchDoneTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const response = await axios.get(`${this.backendUrl}/tasks`);
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async fetchDoneTasks() {
      try {
        const response = await axios.get(`${this.backendUrl}/donetasks`);
        this.doneTasks = response.data;
      } catch (error) {
        console.error('Error fetching done tasks:', error);
      }
    },
    getLastSixDays() {
      const days = [];
      for (let i = 5; i >= 0; i--) {
        const day = new Date();
        day.setDate(day.getDate() - i);
        days.push(day);
      }
      return days;
    },
    formatDate(date) {
      if (!(date instanceof Date && !isNaN(date))) {
        date = new Date(date);
      }
      return date.toISOString().substr(0, 10);
    },
    getTaskStatus(taskID, date) {
      const formattedDate = this.formatDate(date);
      return this.doneTasks.some(doneTask => doneTask.taskID === taskID && this.formatDate(new Date(doneTask.date)) === formattedDate);
    },
    prevWeek() {
      this.displayedDays = this.displayedDays.map(day => {
        const newDay = new Date(day);
        newDay.setDate(newDay.getDate() - 7);
        return newDay;
      });
    },
    nextWeek() {
      this.displayedDays = this.displayedDays.map(day => {
        const newDay = new Date(day);
        newDay.setDate(newDay.getDate() + 7);
        return newDay;
      });
    }
  }
};
</script>
