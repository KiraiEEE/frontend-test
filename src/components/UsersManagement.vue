<template>
  <div class="users-management p-6">
    <h1 class="text-3xl font-bold mb-4">All Users</h1>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="toggleAddUserModal">Add New User</button>
    <table class="min-w-full mt-4">
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CIN</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="bg-white border-b">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ user.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.CIN }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.role }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.branchID }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ user.username }}</td>
        </tr>
      </tbody>
    </table>
    <transition name="fade">
      <div class="modal fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center" v-if="showAddUserModal">
        <div class="modal-content bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-4">Add New User</h2>
          <form @submit.prevent="addUser">
            <div class="form-group mb-4">
              <label for="name" class="block text-gray-700">Name:</label>
              <input id="name" type="text" v-model="newUser.name" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-group mb-4">
              <label for="email" class="block text-gray-700">Email:</label>
              <input id="email" type="email" v-model="newUser.email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-group mb-4">
              <label for="cin" class="block text-gray-700">CIN:</label>
              <input id="cin" type="text" v-model="newUser.CIN" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-group mb-4">
              <label for="role" class="block text-gray-700">Role:</label>
              <input id="role" type="text" v-model="newUser.role" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-group mb-4">
              <label for="branchID" class="block text-gray-700">Branch ID:</label>
              <input id="branchID" type="text" v-model="newUser.branchID" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-group mb-4">
              <label for="username" class="block text-gray-700">Username:</label>
              <input id="username" type="text" v-model="newUser.username" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-group mb-6">
              <label for="password" class="block text-gray-700">Password:</label>
              <input id="password" type="password" v-model="newUser.password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            </div>
            <div class="form-actions flex justify-between">
              <button type="submit" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Submit</button>
              <button type="button" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="toggleAddUserModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UsersManagement',
  data() {
    return {
      users: [],
      showAddUserModal: false,
      newUser: {
        name: '',
        email: '',
        CIN: '',
        role: '',
        branchID: '',
        username: '',
        password: ''
      }
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data;
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },
    async addUser() {
      try {
        const response = await axios.post('http://localhost:3000/users', this.newUser);
        this.users.push(response.data);
        this.resetNewUser();
        this.toggleAddUserModal();
      } catch (error) {
        console.error('Failed to add user:', error);
      }
    },
    toggleAddUserModal() {
      this.showAddUserModal = !this.showAddUserModal;
    },
    resetNewUser() {
      this.newUser = { name: '', email: '', CIN: '', role: '', branchID: '', username: '', password: '' };
    }
  }
}
</script>

<style scoped>
.users-management .add-user-btn {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.users-management .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.users-management .modal-content {
  margin-top: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>