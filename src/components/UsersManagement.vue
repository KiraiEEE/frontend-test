<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">

  <div class="users-management p-6">
    <button 
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center"
      @click="openUserModal('add')"
    >
      <i class="fas fa-user-plus mr-2"></i>
      Add User
    </button>

    <table class="min-w-full mt-4">
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CIN</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <div class="flex justify-center items-center space-x-4">
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-full flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110"
                @click="openUserModal('edit', user)">
                <i class="fas fa-pen mr-1"></i>
                Edit
              </button>

              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full flex items-center justify-center transition duration-300 ease-in-out transform hover:scale-110"
                @click="confirmDelete(user.id)">
                <i class="fas fa-trash-alt mr-1"></i>
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <UserModalPop v-if="showUserModal" :user="editableUser" @close="closeUserModal" @save="handleSave"/>
  </div>
</template>


<script>
import axios from 'axios';
import UserModalPop from './UserModalPop.vue';

export default {
  name: 'UsersManagement',
  components: {
    UserModalPop
  },
  data() {
    return {
      users: [],
      showUserModal: false,
      currentUser: null,
      editableUser: null,
      branches: []
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
    openUserModal(mode, user = null) {
      this.currentUser = user;
      this.editableUser = { ...user };
      this.showUserModal = true;
    },
    closeUserModal() {
      this.showUserModal = false;
      this.editableUser = null;
    },
    async confirmDelete(userId) {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await axios.delete(`http://localhost:3000/users/${userId}`);
          this.users = this.users.filter(user => user.id !== userId);
        } catch (error) {
          console.error('Failed to delete user:', error);
        }
      }
    },
    async handleSave(user) {
      if (user.id) {
        try {
          await axios.put(`http://localhost:3000/users/${user.id}`, user);
          const index = this.users.findIndex(u => u.id === user.id);
          if (index !== -1) {
            this.users[index] = user;
          }
        } catch (error) {
          console.error('Failed to update user:', error);
        }
      } else {
        try {
          const response = await axios.post('http://localhost:3000/users', user);
          this.users.push(response.data);
        } catch (error) {
          console.error('Failed to add user:', error);
        }
      }
      this.closeUserModal();
    }
  }
}
</script>