<template>
  <div class="checklist-customizer bg-white p-6 rounded-lg shadow-lg">
    <form @submit.prevent="submitChecklist" class="mb-8">
      <div class="mb-4">
        <label for="checklistType" class="block text-gray-800 font-bold mb-2">
          Add New Checklist (you have to configure it manually)
        </label>
        <input
          v-model="checklist.checklistType"
          id="checklistType"
          placeholder="Enter checklist type/name"
          class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        class="submit-btn bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        Add Checklist
      </button>
    </form>

    <div v-if="checklists.length > 0" class="checklist-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Type</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in checklists" :key="item.checklistID" class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.checklistType }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button
                @click="editChecklist(item)"
                class="edit-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                @click="deleteChecklist(item.checklistID)"
                class="delete-btn ml-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      checklists: [],
      checklist: {
        checklistType: ''
      },
      isEditing: false
    };
  },
  created() {
    this.fetchChecklists();
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
    async submitChecklist() {
      if (this.isEditing) {
        await this.updateChecklist();
      } else {
        await this.createChecklist();
      }
    },
    async createChecklist() {
      try {
        const response = await axios.post('http://localhost:3000/checklists', this.checklist);
        this.checklists.push(response.data);
        this.checklist.checklistType = ''; // Reset input
      } catch (error) {
        console.error('Error creating checklist:', error);
      }
    },
    async updateChecklist() {
      try {
        await axios.put(`http://localhost:3000/checklists/${this.checklist.checklistID}`, this.checklist);
        const index = this.checklists.findIndex(item => item.checklistID === this.checklist.checklistID);
        this.checklists[index] = {...this.checklist};
        this.resetChecklist();
      } catch (error) {
        console.error('Error updating checklist:', error);
      }
    },
    editChecklist(item) {
      this.checklist = {...item};
      this.isEditing = true;
    },
    async deleteChecklist(checklistID) {
      try {
        await axios.delete(`http://localhost:3000/checklists/${checklistID}`);
        this.checklists = this.checklists.filter(item => item.checklistID !== checklistID);
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    },
    resetChecklist() {
      this.checklist = { checklistType: '' };
      this.isEditing = false;
    }
  }
}
</script>
