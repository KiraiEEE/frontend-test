<template>
  <link rel="stylesheet" href="./asset/animate.min.css" />

<div class="task-manager bg-white p-6 rounded-lg shadow-lg">
  <div class="mb-8">
    <div class="flex gap-3">
      <div class="w-1/2">
        <label for="checklistSelect" class="block text-gray-800 font-bold mb-2">Select Checklist</label>
        <select
          v-model="selectedChecklistID"
          id="checklistSelect"
          class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          @change="fetchTasks"
          required
        >
          <option v-for="checklist in checklists" :value="checklist.checklistID" :key="checklist.checklistID">
            {{ checklist.checklistType }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-6 text-center">
      <button
        @click="showTaskModal()"
        class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
      >
        Add Task
      </button>
    </div>
  </div>

  <div v-if="tasks.length > 0" class="task-container">
    <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Task Title</th>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="task in tasks"
          :key="task.taskID"
          class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ task.taskTitle }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
            <button
              @click="editTask(task)"
              class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
            >
              <i class="fas fa-edit"></i> Edit
            </button>
            <button
              @click="showDeleteConfirmation(task.taskID)"
              class="delete-btn ml-2 border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
            >
              <i class="fas fa-trash-alt"></i> Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<transition name="bounceIn">
  <div v-if="isEditing || isAdding" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
      <h3 class="text-lg font-bold mb-4">{{ isEditing ? 'Edit Task' : 'Add Task' }}</h3>
      <div class="mb-4">
        <label for="taskTitle" class="block text-gray-800 font-bold mb-2">Task Title</label>
        <input v-model="newTask.taskTitle" id="taskTitle" placeholder="Enter task title" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
      </div>
      <div class="mb-4">
        <label for="checklistSelectModal" class="block text-gray-800 font-bold mb-2">Select Checklist</label>
        <select v-model="newTask.checklistID" id="checklistSelectModal" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          <option v-for="checklist in checklists" :value="checklist.checklistID" :key="checklist.checklistID">
            {{ checklist.checklistType }}
          </option>
        </select>
      </div>
      <div class="text-center">
        <button @click="isEditing ? updateTask() : createTask()" :disabled="!newTask.taskTitle" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !newTask.taskTitle}">Save Changes</button>
        <button @click="closeTaskModal()" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
      </div>
    </div>
  </div>
</transition>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
      checklists: [],
      selectedChecklistID: null,
      newTask: {
        taskTitle: '',
        checklistID: null,
      },
      isEditing: false,
      isAdding: false,
      showDeleteModal: false,
      currentTaskID: null,
      backendUrl: '',
    };
  },
  created() {
    this.backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
    this.fetchChecklists();
    this.fetchTasks();
  },
  methods: {
    async fetchChecklists() {
      try {
        const response = await axios.get(`${this.backendUrl}/checklists`);
        this.checklists = response.data;
        this.selectedChecklistID = this.checklists[0].checklistID;
      } catch (error) {
        console.error('Error fetching checklists:', error);
      }
    },
    async fetchTasks() {
      try {
        const response = await axios.get(`${this.backendUrl}/tasks?checklistID=${this.selectedChecklistID}`);
        this.tasks = response.data;
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async createTask() {
      try {
        const response = await axios.post(`${this.backendUrl}/tasks`, { ...this.newTask, checklistID: this.selectedChecklistID });
        this.tasks.push(response.data);
        this.closeTaskModal();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    editTask(task) {
      this.newTask = { ...task };
      this.isEditing = true;
    },
    async updateTask() {
      try {
        await axios.put(`${this.backendUrl}/tasks/${this.newTask.taskID}`, this.newTask);
        const index = this.tasks.findIndex(t => t.taskID === this.newTask.taskID);
        this.tasks[index] = { ...this.newTask };
        this.closeTaskModal();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async deleteTask(taskID) {
      try {
        await axios.delete(`${this.backendUrl}/tasks/${taskID}`);
        this.tasks = this.tasks.filter(t => t.taskID !== taskID);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
    showDeleteConfirmation(taskID) {
      this.currentTaskID = taskID;
      this.showDeleteModal = true;
    },
    showTaskModal() {
      this.isAdding = true;
      this.newTask = { taskTitle: '', checklistID: this.selectedChecklistID };
    },
    closeTaskModal() {
      this.isEditing = false;
      this.isAdding = false;
      this.newTask = { taskTitle: '', checklistID: null };
    },
  },
};
</script>