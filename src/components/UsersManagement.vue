<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
  <div class="user-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8">
      <button @click="showAddUserModal(true)" class="border border-green-500 text-green-500 font-bold py-2 px-4 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
        <i class="fas fa-plus"></i> 
      </button>
    </div>

    <div v-if="users.length > 0" class="user-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Photo</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Username</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Email</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Role</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Branch</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><img :src="`http://localhost:3000/images/${user.photo}`" alt="User Photo" class="h-10 w-10 rounded-full"></td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ user.branchID }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                @click="editUser(user.id)"
                class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              >
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                @click="showDeleteConfirmation(user.id)"
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
      <div v-if="showAddUser" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">{{ editing ? 'Edit User' : 'Add New User' }}</h3>
          <form @submit.prevent="editing ? updateUser() : createUser()">
            <div class="mb-4">
              <label for="photo" class="block text-gray-800 font-bold mb-2">Photo</label>
              <input type="file" @change="handleFileUpload" id="photo" class="block w-full text-sm text-gray-800 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100">
            </div>
            <div class="mb-4">
              <label for="name" class="block text-gray-800 font-bold mb-2">Name</label>
              <input v-model="newUser.name" id="name" placeholder="Enter name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
            </div>
            <div class="mb-4">
              <label for="username" class="block text-gray-800 font-bold mb-2">Username</label>
              <input v-model="newUser.username" id="username" placeholder="Enter username" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
            </div>
            <div class="mb-4">
              <label for="email" class="block text-gray-800 font-bold mb-2">Email</label>
              <input v-model="newUser.email" id="email" type="email" placeholder="Enter email" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
            </div>
            <div class="mb-4">
              <label for="password" class="block text-gray-800 font-bold mb-2">Password</label>
              <input v-model="newUser.password" id="password" type="password" placeholder="Enter new password" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
            </div>
            <div class="mb-4">
              <label for="role" class="block text-gray-800 font-bold mb-2">Role</label>
              <select v-model="newUser.role" id="role" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
                <option disabled value="">Please select one</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="branch" class="block text-gray-800 font-bold mb-2">Branch</label>
              <input v-model="newUser.branchID" id="branch" type="number" placeholder="Enter branch ID" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
            </div>
            <div class="text-center">
              <button type="submit" class="border border-green-500 text-green-500 font-bold py-2 px-4 rounded-full hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">{{ editing ? 'Update' : 'Add' }} User</button>
              <button @click="cancelEdit" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
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
  data() {
    return {
      users: [],
      newUser: {
        name: '',
        username: '',
        email: '',
        password: '',
        role: '',
        branchID: null,
        photo: '',
      },
      showAddUser: false,
      showDeleteModal: false,
      currentUserID: null,
      editing: false,
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
        console.error('Error fetching users:', error);
      }
    },
    async createUser() {
      try {
        const formData = new FormData();
        formData.append('photo', this.newUser.photo);
        formData.append('name', this.newUser.name);
        formData.append('username', this.newUser.username);
        formData.append('email', this.newUser.email);
        formData.append('password', this.newUser.password);
        formData.append('role', this.newUser.role);
        formData.append('branchID', this.newUser.branchID);

        const uploadResponse = await axios.post('http://localhost:3000/upload', formData);
        this.newUser.photo = uploadResponse.data.fileName;

        const response = await axios.post('http://localhost:3000/users', this.newUser);
        this.users.push(response.data);
        this.showAddUser = false;
        this.resetNewUser();
      } catch (error) {
        console.error('Error creating user:', error);
      }
    },
    async editUser(userID) {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userID}`);
        this.newUser = response.data;
        this.showAddUserModal(true, true);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    },
    async updateUser() {
      try {
        const formData = new FormData();
        formData.append('photo', this.newUser.photo);
        formData.append('name', this.newUser.name);
        formData.append('username', this.newUser.username);
        formData.append('email', this.newUser.email);
        formData.append('password', this.newUser.password);
        formData.append('role', this.newUser.role);
        formData.append('branchID', this.newUser.branchID);

        const uploadResponse = await axios.post('http://localhost:3000/upload', formData);
        this.newUser.photo = uploadResponse.data.fileName;

        await axios.put(`http://localhost:3000/users/${this.newUser.id}`, this.newUser);
        this.fetchUsers();
        this.showAddUser = false;
        this.resetNewUser();
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async deleteUser(userID) {
      try {
        await axios.delete(`http://localhost:3000/users/${userID}`);
        this.users = this.users.filter(user => user.id !== userID);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    showDeleteConfirmation(userID) {
      this.currentUserID = userID;
      this.showDeleteModal = true;
    },
    resetNewUser() {
      this.newUser = { name: '', username: '', email: '', password: '', role: '', branchID: null, photo: '' };
    },
    showAddUserModal(show, edit = false) {
      this.showAddUser = show;
      this.editing = edit;
      if (!show && !edit) {
        this.resetNewUser();
      }
    },
    cancelEdit() {
      this.showAddUser = false;
      this.resetNewUser();
    },
    handleFileUpload(event) {
      this.newUser.photo = event.target.files[0];
    }
  },
};
</script>

