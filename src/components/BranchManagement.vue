<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
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
    <transition name="bounceIn">
      <div v-if="isEditing" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Edit Branch</h3>
          <div class="mb-4">
            <label for="editBranchName" class="block text-gray-800 font-bold mb-2">Branch Name</label>
            <input v-model="branch.branchName" id="editBranchName" placeholder="Enter branch name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="text-center">
            <button @click="updateBranch" :disabled="!branch.branchName" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !branch.branchName}">Save Changes</button>
            <button @click="isEditing = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounceIn">
      <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Delete Branch</h3>
          <p class="text-gray-800 mb-4">Are you sure you want to delete this branch?</p>
          <div class="text-center">
            <button @click="deleteBranch(currentBranchID)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
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