<template>
  <link rel="stylesheet" href="./asset/animate.min.css" />
  
  <div class="user-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8 text-center">
      <button
        @click="showAddUserModal = true"
        class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
      >
        Add User
      </button>
    </div>

    
    <div v-if="users.length > 0" class="user-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Photo</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Username</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Role</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Branch Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in users"
            :key="item.userID"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><img :src="`${backendUrl}/images/${item.photo}`" alt="User Photo" class="w-10 h-10 rounded-full"></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.role || 'No Role Assigned' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ getBranchName(item.branchID) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                @click="editUser(item)"
                class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                v-if="item.role === null"
                @click="assignRole(item, 'user')"
                class="ml-2 border border-green-500 text-green-500 font-bold py-2 px-4 rounded-full hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                Validate User
              </button>
              <button
                v-if="isSuperAdmin"
                @click="showDeleteConfirmation(item.userID)"
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
      <div v-if="showAddUserModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Add New User</h3>
          <div class="mb-4">
            <label for="newUsername" class="block text-gray-800 font-bold mb-2">Username</label>
            <input v-model="newUser.username" id="newUsername" placeholder="Enter username" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="newName" class="block text-gray-800 font-bold mb-2">Name</label>
            <input v-model="newUser.name" id="newName" placeholder="Enter name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="newUserRole" class="block text-gray-800 font-bold mb-2">Select Role</label>
            <select v-model="newUser.role" id="newUserRole" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
              <option disabled value="">Please select one</option>
              <option v-for="role in roles" :value="role" :key="role">{{ role }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="newUserEmail" class="block text-gray-800 font-bold mb-2">Email</label>
            <input v-model="newUser.email" id="newUserEmail" placeholder="Enter email" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="newUserBranchID" class="block text-gray-800 font-bold mb-2">Branch ID</label>
            <input v-model="newUser.branchID" id="newUserBranchID" placeholder="Enter branch ID" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="newUserPhoto" class="block text-gray-800 font-bold mb-2">Photo URL</label>
            <input v-model="newUser.photo" id="newUserPhoto" placeholder="Enter photo URL" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="text-center">
            <button @click="createUser" :disabled="!newUser.username || !newUser.name || !newUser.role || !newUser.email || !newUser.branchID || !newUser.photo" class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !newUser.username || !newUser.name || !newUser.role || !newUser.email || !newUser.branchID || !newUser.photo}">Add User</button>
            <button @click="showAddUserModal = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="bounceIn">
      <div v-if="isEditing" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Edit User</h3>
          <div class="mb-4">
            <label for="editUsername" class="block text-gray-800 font-bold mb-2">Username</label>
            <input v-model="user.username" id="editUsername" placeholder="Enter username" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editName" class="block text-gray-800 font-bold mb-2">Name</label>
            <input v-model="user.name" id="editName" placeholder="Enter name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editUserRole" class="block text-gray-800 font-bold mb-2">Select Role</label>
            <select v-model="user.role" id="editUserRole" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
              <option disabled value="">Please select one</option>
              <option v-for="role in roles" :value="role" :key="role">{{ role }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="editUserEmail" class="block text-gray-800 font-bold mb-2">Email</label>
            <input v-model="user.email" id="editUserEmail" placeholder="Enter email" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editUserBranchID" class="block text-gray-800 font-bold mb-2">Branch ID</label>
            <input v-model="user.branchID" id="editUserBranchID" placeholder="Enter branch ID" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editUserPhoto" class="block text-gray-800 font-bold mb-2">Photo URL</label>
            <input v-model="user.photo" id="editUserPhoto" placeholder="Enter photo URL" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="text-center">
            <button @click="updateUser" :disabled="!user.username || !user.name || !user.role || !user.email || !user.branchID || !user.photo" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !user.username || !user.name || !user.role || !user.email || !user.branchID || !user.photo}">Save Changes</button>
            <button @click="isEditing = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="bounceIn">
      <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Delete User</h3>
          <p class="text-gray-800 mb-4">Are you sure you want to delete this user?</p>
          <div class="text-center">
            <button @click="deleteUser(currentUserID)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
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
      users: [],
      roles: ['user', 'admin', 'superadmin'],
      user: {
        username: '',
        name: '',
        role: '',
        email: '',
        branchID: '',
        photo: '',
        
      },
      newUser: {
        username: '',
        name: '',
        role: '',
        email: '',
        branchID: '',
        photo: ''
      },
      isEditing: false,
      showAddUserModal: false,
      showDeleteModal: false,
      currentUserID: null,
      backendUrl: '',
      isSuperAdmin: localStorage.getItem('role') === 'superadmin',
      branches: {}
    };
  },
  created() {
    this.backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
    this.fetchUsers();
    this.fetchBranches();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`${this.backendUrl}/users`);
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchBranches() {
      try {
        const response = await axios.get(`${this.backendUrl}/branches`);
        this.branches = response.data.reduce((acc, branch) => {
          acc[branch.branchID] = branch.branchName;
          return acc;
        }, {});
      } catch (error) {
        console.error('Error fetching branches:', error);
      }
    },
    getBranchName(branchID) {
      return this.branches[branchID] || 'Unknown';
    },
    async createUser() {
      try {
        const response = await axios.post(`${this.backendUrl}/users`, this.newUser);
        this.users.push(response.data);
        this.resetNewUser();
        this.showAddUserModal = false;
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async updateUser() {
      try {
        await axios.put(`${this.backendUrl}/users/${this.user.userID}`, this.user);
        const index = this.users.findIndex(item => item.userID === this.user.userID);
        this.users[index] = { ...this.user };
        this.resetUser();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    editUser(item) {
      this.user = { ...item };
      this.isEditing = true;
    },
    async deleteUser(userID) {
      try {
        await axios.delete(`${this.backendUrl}/users/${userID}`);
        this.users = this.users.filter(item => item.userID !== userID);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    showDeleteConfirmation(userID) {
      this.currentUserID = userID;
      this.showDeleteModal = true;
    },
    resetUser() {
      this.user = { username: '', name: '', role: '', email: '', branchID: '', photo: '' };
      this.isEditing = false;
    },
    resetNewUser() {
      this.newUser = { username: '', name: '', role: '', email: '', branchID: '', photo: '' };
    },
    async assignRole(user, role) {
      user.role = role;
      try {
        await axios.put(`${this.backendUrl}/users/${user.userID}`, { role });
        const index = this.users.findIndex(item => item.userID === user.userID);
        this.users[index].role = role;
      } catch (error) {
        console.error('Error assigning role:', error);
      }
    }
  },
};
</script>