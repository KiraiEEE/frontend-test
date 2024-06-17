<template>
  <div v-if="isSuperAdmin">
    <link rel="stylesheet" href="./asset/animate.min.css" />
    
    <div class="branch-manager bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-8">
        <div class="flex gap-3">
          <div class="w-full">
            <label for="branchName" class="block text-gray-800 font-bold mb-2">Add New Branch</label>
            <input
              v-model="newBranch.branchName"
              id="branchName"
              placeholder="Enter branch name"
              class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div class="mt-6 text-center">
          <button
            @click="createBranch"
            :disabled="!newBranch.branchName"
            class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
            :class="{'opacity-50': !newBranch.branchName}"
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
              <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="branch in branches"
              :key="branch.branchID"
              class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><i class="fas fa-building mr-2"></i>{{ branch.branchName }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                <button
                  @click="editBranch(branch)"
                  :disabled="!branch.branchName"
                  class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                  :class="{'opacity-50': !branch.branchName}"
                >
                  <i class="fas fa-edit"></i> Edit
                </button>
                <button
                  @click="showDeleteConfirmation(branch.branchID)"
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
  </div>
  <div v-else>
    <h1 class="text-center text-xl font-bold mt-10">Access Denied</h1>
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
      newBranch: {
        branchName: '',
      },
      isEditing: false,
      showDeleteModal: false,
      currentBranchID: null,
    };
  },
  computed: {
    isSuperAdmin() {
      return localStorage.getItem('role') === 'superadmin';
    }
  },
  created() {
    this.fetchBranches();
  },
  methods: {
    async fetchBranches() {
      try {
        const backendUrl = localStorage.getItem('backendUrl');
        const response = await axios.get(`${backendUrl}/branches`);
        this.branches = response.data;
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    },
    async createBranch() {
      try {
        const backendUrl = localStorage.getItem('backendUrl');
        const response = await axios.post(`${backendUrl}/branches`, this.newBranch);
        this.branches.push(response.data);
        this.resetNewBranch();
      } catch (error) {
        console.error('Error creating branch:', error);
      }
    },
    async updateBranch() {
      try {
        const backendUrl = localStorage.getItem('backendUrl');
        await axios.put(`${backendUrl}/branches/${this.branch.branchID}`, this.branch);
        const index = this.branches.findIndex(item => item.branchID === this.branch.branchID);
        this.branches[index] = { ...this.branch };
        this.resetBranch();
      } catch (error) {
        console.error('Error updating branch:', error);
      }
    },
    editBranch(branch) {
      this.branch = { ...branch };
      this.isEditing = true;
    },
    async deleteBranch(branchID) {
      try {
        const backendUrl = localStorage.getItem('backendUrl');
        await axios.delete(`${backendUrl}/branches/${branchID}`);
        this.branches = this.branches.filter(item => item.branchID !== branchID);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting branch:', error);
      }
    },
    showDeleteConfirmation(branchID) {
      this.currentBranchID = branchID;
      this.showDeleteModal = true;
    },
    resetBranch() {
      this.branch = { branchName: '' };
      this.isEditing = false;
    },
    resetNewBranch() {
      this.newBranch = { branchName: '' };
    }
  },
};
</script>
