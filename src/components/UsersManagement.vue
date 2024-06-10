<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
  <div class="user-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8">
      <div class="flex gap-3">
        <div class="w-1/2">
          <label for="userName" class="block text-gray-800 font-bold mb-2">Add New User</label>
          <input
            v-model="newUser.userName"
            id="userName"
            placeholder="Enter user name"
            class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          />
        </div>
        <div class="w-1/2">
          <label for="userRole" class="block text-gray-800 font-bold mb-2">Select Role</label>
          <select
            v-model="newUser.role"
            id="userRole"
            class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          >
            <option disabled value="">Please select one</option>
            <option v-for="role in roles" :value="role" :key="role">
              {{ role }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-6 text-center">
        <button
          @click="createUser"
          :disabled="!newUser.userName || !newUser.role"
          class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          :class="{'opacity-50': !newUser.userName || !newUser.role}"
        >
          Add User
        </button>
      </div>
    </div>

    <div v-if="users.length > 0" class="user-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">User Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Role</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in users"
            :key="item.userID"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><i class="fas fa-user mr-2"></i>{{ item.userName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                @click="editUser(item)"
                :disabled="!item.userName || !item.role"
                class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                :class="{'opacity-50': !item.userName || !item.role}"
              >
                <i class="fas fa-edit"></i> Edit
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
      <div v-if="isEditing" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Edit User</h3>
          <div class="mb-4">
            <label for="editUserName" class="block text-gray-800 font-bold mb-2">User Name</label>
            <input v-model="user.userName" id="editUserName" placeholder="Enter user name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editUserRole" class="block text-gray-800 font-bold mb-2">Select Role</label>
            <select v-model="user.role" id="editUserRole" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
              <option disabled value="">Please select one</option>
              <option v-for="role in roles" :value="role" :key="role">{{ role }}</option>
            </select>
          </div>
          <div class="text-center">
            <button @click="updateUser" :disabled="!user.userName || !user.role" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !user.userName || !user.role}">Save Changes</button>
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
        roles: ['Admin', 'User', 'Guest'],
        user: {
          userName: '',
          role: '',
        },
        newUser: {
          userName: '',
          role: '',
        },
        isEditing: false,
        showDeleteModal: false,
        currentUserID: null,
        backendUrl: '',
        isSuperAdmin: localStorage.getItem('role') === 'superadmin'
      };
    },
    created() {
      this.backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
      this.fetchUsers();
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
      async createUser() {
        try {
          const response = await axios.post(`${this.backendUrl}/users`, this.newUser);
          this.users.push(response.data);
          this.resetNewUser();
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
        this.user = { userName: '', role: '' };
        this.isEditing = false;
      },
      resetNewUser() {
        this.newUser = { userName: '', role: '' };
      }
    },
  };
  </script>
