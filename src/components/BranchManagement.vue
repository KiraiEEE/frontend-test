<template>
  <div class="branch-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8">
      <div class="flex gap-3">
        <div class="w-full">
          <label for="branchName" class="block text-gray-800 font-bold mb-2">Add New Branch</label>
          <input
            v-model="branch.branchName"
            id="branchName"
            placeholder="Enter branch name"
            class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
      <div class="mt-6 text-center">
        <button
          @click="submitBranch"
          class="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Add Branch
        </button>
      </div>
    </div>

    <div v-if="branches.length > 0" class="branch-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Branch Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in branches"
            :key="item.branchID"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.branchName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
              <button
                @click="editBranch(item)"
                class="edit-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
              >
                Edit
              </button>
              <button
                @click="deleteBranch(item.branchID)"
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
      branches: [],
      branch: {
        branchName: '',
      },
      isEditing: false,
    };
  },
  created() {
    this.fetchBranches();
  },
  methods: {
    async fetchBranches() {
      try {
        const response = await axios.get('http://localhost:3000/branches');
        this.branches = response.data;
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    },
    async submitBranch() {
      if (this.isEditing) {
        await this.updateBranch();
      } else {
        await this.createBranch();
      }
    },
    async createBranch() {
      try {
        const response = await axios.post('http://localhost:3000/branches', this.branch);
        this.branches.push(response.data);
        this.resetBranch();
      } catch (error) {
        console.error('Error creating branch:', error);
      }
    },
    async updateBranch() {
      try {
        await axios.put(`http://localhost:3000/branches/${this.branch.branchID}`, this.branch);
        const index = this.branches.findIndex(item => item.branchID === this.branch.branchID);
        this.branches[index] = { ...this.branch };
        this.resetBranch();
      } catch (error) {
        console.error('Error updating branch:', error);
      }
    },
    editBranch(item) {
      this.branch = { ...item };
      this.isEditing = true;
    },
    async deleteBranch(branchID) {
      try {
        await axios.delete(`http://localhost:3000/branches/${branchID}`);
        this.branches = this.branches.filter(item => item.branchID !== branchID);
      } catch (error) {
        console.error('Error deleting branch:', error);
      }
    },
    resetBranch() {
      this.branch = { branchName: '' };
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.input-field {
  transition: border-color 0.2s, box-shadow 0.2s;
}
.input-field:focus {
  border-color: #805ad5;
  box-shadow: 0 0 0 1px #805ad5;
}
</style>
