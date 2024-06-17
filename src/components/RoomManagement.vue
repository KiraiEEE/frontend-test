<template>
    <link rel="stylesheet" href="./asset/animate.min.css" />
  
  <div class="room-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8">
      <div class="flex gap-3">
        <div class="w-1/2">
          <label for="roomName" class="block text-gray-800 font-bold mb-2">Add New Room</label>
          <input
            v-model="newRoom.roomName"
            id="roomName"
            placeholder="Enter room name"
            class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          />
        </div>
        <div class="w-1/2">
          <label for="branchID" class="block text-gray-800 font-bold mb-2">Select Branch</label>
          <select
            v-model="newRoom.branchID"
            id="branchID"
            class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          >
            <option disabled value="">Please select one</option>
            <option v-for="branch in branches" :value="branch.branchID" :key="branch.branchID">
              {{ branch.branchName }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-6 text-center">
        <button
          @click="createRoom"
          :disabled="!newRoom.roomName || !newRoom.branchID"
          class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          :class="{'opacity-50': !newRoom.roomName || !newRoom.branchID}"
        >
          Add Room
        </button>
      </div>
    </div>

    <div v-if="rooms.length > 0" class="room-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Room Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Branch</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in rooms"
            :key="item.roomID"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><i class="fas fa-server mr-2"></i>{{ item.roomName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ getBranchName(item.branchID) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                v-if="isSuperAdmin || (isAdmin && item.branchID === userBranchID)"
                @click="editRoom(item)"
                :disabled="!item.roomName || !item.branchID"
                class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                :class="{'opacity-50': !item.roomName || !item.branchID}"
              >
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                v-if="isSuperAdmin"
                @click="showDeleteConfirmation(item.roomID)"
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
          <h3 class="text-lg font-bold mb-4">Edit Room</h3>
          <div class="mb-4">
            <label for="editRoomName" class="block text-gray-800 font-bold mb-2">Room Name</label>
            <input v-model="room.roomName" id="editRoomName" placeholder="Enter room name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editBranchID" class="block text-gray-800 font-bold mb-2">Select Branch</label>
            <select v-model="room.branchID" id="editBranchID" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
              <option disabled value="">Please select one</option>
              <option v-for="branch in branches" :value="branch.branchID" :key="branch.branchID">{{ branch.branchName }}</option>
            </select>
          </div>
          <div class="text-center">
            <button @click="updateRoom" :disabled="!room.roomName || !room.branchID" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !room.roomName || !room.branchID}">Save Changes</button>
            <button @click="isEditing = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounceIn">
      <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Delete Room</h3>
          <p class="text-gray-800 mb-4">Are you sure you want to delete this room?</p>
          <div class="text-center">
            <button @click="deleteRoom(currentRoomID)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
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
        rooms: [],
        branches: [],
        room: {
          roomName: '',
          branchID: null,
        },
        newRoom: {
          roomName: '',
          branchID: null,
        },
        isEditing: false,
        showDeleteModal: false,
        currentRoomID: null,
        backendUrl: '',
        isSuperAdmin: localStorage.getItem('role') === 'superadmin',
        isAdmin: localStorage.getItem('role') === 'admin',
        userBranchID: null
      };
    },
    created() {
      this.backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
      this.fetchRooms();
      this.fetchBranches();
      this.fetchUserBranchID();
    },
    methods: {
      async fetchRooms() {
        try {
          const response = await axios.get(`${this.backendUrl}/rooms`);
          this.rooms = response.data;
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      },
      async fetchBranches() {
        try {
          const response = await axios.get(`${this.backendUrl}/branches`);
          this.branches = response.data;
        } catch (error) {
          console.error('Error fetching branches:', error);
        }
      },
      async fetchUserBranchID() {
        try {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(`${this.backendUrl}/users/${userId}`);
          this.userBranchID = response.data.branchID;
        } catch (error) {
          console.error('Error fetching user branch ID:', error);
        }
      },
      async createRoom() {
        try {
          const response = await axios.post(`${this.backendUrl}/rooms`, this.newRoom);
          this.rooms.push(response.data);
          this.resetNewRoom();
        } catch (error) {
          console.error('Error creating room:', error);
        }
      },
      async updateRoom() {
        try {
          await axios.put(`${this.backendUrl}/rooms/${this.room.roomID}`, this.room);
          const index = this.rooms.findIndex(item => item.roomID === this.room.roomID);
          this.rooms[index] = { ...this.room };
          this.resetRoom();
        } catch (error) {
          console.error('Error updating room:', error);
        }
      },
      editRoom(item) {
        this.room = { ...item };
        this.isEditing = true;
      },
      async deleteRoom(roomID) {
        try {
          await axios.delete(`${this.backendUrl}/rooms/${roomID}`);
          this.rooms = this.rooms.filter(item => item.roomID !== roomID);
          this.showDeleteModal = false;
        } catch (error) {
          console.error('Error deleting room:', error);
        }
      },
      showDeleteConfirmation(roomID) {
        this.currentRoomID = roomID;
        this.showDeleteModal = true;
      },
      resetRoom() {
        this.room = { roomName: '', branchID: null };
        this.isEditing = false;
      },
      resetNewRoom() {
        this.newRoom = { roomName: '', branchID: null };
      },
      getBranchName(branchID) {
        const branch = this.branches.find(b => b.branchID === branchID);
        return branch ? branch.branchName : 'Unknown';
      }
    },
  };
  </script>
