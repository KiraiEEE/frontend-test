<template>
  <link rel="stylesheet" href="./asset/animate.min.css" />

  <div class="checklist-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8">
      <div class="flex gap-3">
        <div class="w-full">
          <label for="checklistType" class="block text-gray-800 font-bold mb-2">Add New Checklist (Manual Configuration)</label>
          <input
            v-model="newChecklist.checklistType"
            id="checklistType"
            placeholder="Enter checklist type"
            class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          />
        </div>
      </div>
      <div class="mt-6 text-center">
        <button
          @click="createChecklist"
          :disabled="!newChecklist.checklistType"
          class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          :class="{'opacity-50': !newChecklist.checklistType}"
        >
          Add Checklist
        </button>
      </div>
    </div>

    <div v-if="checklists.length > 0" class="checklist-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Checklist Type</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in checklists"
            :key="item.checklistId"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><i class="fas fa-list mr-2"></i>{{ item.checklistType }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                @click="editChecklist(item)"
                :disabled="!item.checklistType"
                class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                :class="{'opacity-50': !item.checklistType}"
              >
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                v-if="role === 'superadmin'"
                @click="showDeleteConfirmation(item.checklistId)"
                class="delete-btn ml-2 border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <transition name="bounceIn">
      <div v-if="isEditing" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Edit Checklist</h3>
          <div class="mb-4">
            <label for="editChecklistType" class="block text-gray-800 font-bold mb-2">Checklist Type</label>
            <input v-model="checklist.checklistType" id="editChecklistType" placeholder="Enter checklist type" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="text-center">
            <button @click="updateChecklist" :disabled="!checklist.checklistType" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !checklist.checklistType}">Save Changes</button>
            <button @click="isEditing = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounceIn">
      <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Delete Checklist</h3>
          <p class="text-gray-800 mb-4">Are you sure you want to delete this checklist?</p>
          <div class="text-center">
            <button @click="deleteChecklist(currentChecklistId)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
            <button @click="showDeleteModal = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        checklists: [],
        checklist: {
          checklistType: '',
        },
        newChecklist: {
          checklistType: '',
        },
        isEditing: false,
        showDeleteModal: false,
        currentChecklistId: null,
        backendUrl: '',
        role: ''
      };
    },
    created() {
      this.backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
      this.role = localStorage.getItem('role') || '';
      this.fetchChecklists();
    },
    methods: {
      async fetchChecklists() {
        try {
          const response = await axios.get(`${this.backendUrl}/checklists`);
          this.checklists = response.data;
        } catch (error) {
          console.error('Error fetching checklists:', error);
        }
      },
      async createChecklist() {
        try {
          const response = await axios.post(`${this.backendUrl}/checklists`, this.newChecklist);
          this.checklists.push(response.data);
          this.resetNewChecklist();
        } catch (error) {
          console.error('Error creating checklist:', error);
        }
      },
      async updateChecklist() {
        try {
          await axios.put(`${this.backendUrl}/checklists/${this.checklist.checklistId}`, this.checklist);
          const index = this.checklists.findIndex(item => item.checklistId === this.checklist.checklistId);
          this.checklists[index] = { ...this.checklist };
          this.resetChecklist();
        } catch (error) {
          console.error('Error updating checklist:', error);
        }
      },
      editChecklist(item) {
        this.checklist = { ...item };
        this.isEditing = true;
      },
      async deleteChecklist(checklistId) {
        try {
          await axios.delete(`${this.backendUrl}/checklists/${checklistId}`);
          this.checklists = this.checklists.filter(item => item.checklistId !== checklistId);
          this.showDeleteModal = false;
        } catch (error) {
          console.error('Error deleting checklist:', error);
        }
      },
      showDeleteConfirmation(checklistId) {
        this.currentChecklistId = checklistId;
        this.showDeleteModal = true;
      },
      resetChecklist() {
        this.checklist = { checklistType: '' };
        this.isEditing = false;
      },
      resetNewChecklist() {
        this.newChecklist = { checklistType: '' };
      }
    },
  };
</script>