<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  
  <div class="equipment-manager bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-8">
      <div class="flex gap-3">
        <div class="w-1/2">
          <label for="equipmentName" class="block text-gray-800 font-bold mb-2">Add New Equipment</label>
          <input
            v-model="newEquipment.equipmentName"
            id="equipmentName"
            placeholder="Enter equipment name"
            class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          />
        </div>
        <div class="w-1/2">
          <label for="roomID" class="block text-gray-800 font-bold mb-2">Select Room</label>
          <select
            v-model="newEquipment.roomID"
            id="roomID"
            class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          >
            <option disabled value="">Please select one</option>
            <option v-for="room in rooms" :value="room.roomID" :key="room.roomID">
              {{ room.roomName }}
            </option>
          </select>
        </div>
        <div class="w-1/2">
          <label for="checklistID" class="block text-gray-800 font-bold mb-2">Select Checklist Type</label>
          <select
            v-model="newEquipment.checklistID"
            id="checklistID"
            class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            required
          >
            <option disabled value="">Please select one</option>
            <option v-for="checklist in checklists" :value="checklist.checklistID" :key="checklist.checklistID">
              {{ checklist.checklistType }}
            </option>
          </select>
        </div>
      </div>
      <div class="mt-6 text-center">
        <button
          @click="createEquipment"
          :disabled="!newEquipment.equipmentName || !newEquipment.roomID || !newEquipment.checklistID"
          class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
          :class="{'opacity-50': !newEquipment.equipmentName || !newEquipment.roomID || !newEquipment.checklistID}"
        >
          Add Equipment
        </button>
      </div>
    </div>

    <div v-if="equipments.length > 0" class="equipment-container">
      <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-gray-200">
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Equipment Name</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Room</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Checklist Type</th>
            <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in equipments"
            :key="item.equipmentID"
            class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><i class="fas fa-tools mr-2"></i>{{ item.equipmentName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ getRoomName(item.roomID) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ getChecklistType(item.checklistID) }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
              <button
                @click="editEquipment(item)"
                :disabled="!item.equipmentName || !item.roomID || !item.checklistID"
                class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
                :class="{'opacity-50': !item.equipmentName || !item.roomID || !item.checklistID}"
              >
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                @click="showDeleteConfirmation(item.equipmentID)"
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
          <h3 class="text-lg font-bold mb-4">Edit Equipment</h3>
          <div class="mb-4">
            <label for="editEquipmentName" class="block text-gray-800 font-bold mb-2">Equipment Name</label>
            <input v-model="equipment.equipmentName" id="editEquipmentName" placeholder="Enter equipment name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
          </div>
          <div class="mb-4">
            <label for="editRoomID" class="block text-gray-800 font-bold mb-2">Select Room</label>
            <select v-model="equipment.roomID" id="editRoomID" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
              <option disabled value="">Please select one</option>
              <option v-for="room in rooms" :value="room.roomID" :key="room.roomID">{{ room.roomName }}</option>
            </select>
          </div>
          <div class="mb-4">
            <label for="editChecklistID" class="block text-gray-800 font-bold mb-2">Select Checklist Type</label>
            <select v-model="equipment.checklistID" id="editChecklistID" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
              <option disabled value="">Please select one</option>
              <option v-for="checklist in checklists" :value="checklist.checklistID" :key="checklist.checklistID">{{ checklist.checklistType }}</option>
            </select>
          </div>
          <div class="text-center">
            <button @click="updateEquipment" :disabled="!equipment.equipmentName || !equipment.roomID || !equipment.checklistID" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !equipment.equipmentName || !equipment.roomID || !equipment.checklistID}">Save Changes</button>
            <button @click="isEditing = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
          </div>
        </div>
      </div>
    </transition>
    <transition name="bounceIn">
      <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
          <h3 class="text-lg font-bold mb-4">Delete Equipment</h3>
          <p class="text-gray-800 mb-4">Are you sure you want to delete this equipment?</p>
          <div class="text-center">
            <button @click="deleteEquipment(currentEquipmentID)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
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
        equipments: [],
        rooms: [],
        checklists: [],
        equipment: {
          equipmentName: '',
          roomID: null,
          checklistID: null,
        },
        newEquipment: {
          equipmentName: '',
          roomID: null,
          checklistID: null,
        },
        isEditing: false,
        showDeleteModal: false,
        currentEquipmentID: null,
      };
    },
    created() {
      this.fetchEquipments();
      this.fetchRooms();
      this.fetchChecklists();
    },
    methods: {
      async fetchEquipments() {
        try {
          const response = await axios.get('http://localhost:3000/equipments');
          this.equipments = response.data;
        } catch (error) {
          console.error('Error fetching equipments:', error);
        }
      },
      async fetchRooms() {
        try {
          const response = await axios.get('http://localhost:3000/rooms');
          this.rooms = response.data;
        } catch (error) {
          console.error('Error fetching rooms:', error);
        }
      },
      async fetchChecklists() {
        try {
          const response = await axios.get('http://localhost:3000/checklists');
          this.checklists = response.data;
        } catch (error) {
          console.error('Error fetching checklists:', error);
        }
      },
      async createEquipment() {
        try {
          const response = await axios.post('http://localhost:3000/equipments', this.newEquipment);
          this.equipments.push(response.data);
          this.resetNewEquipment();
        } catch (error) {
          console.error('Error creating equipment:', error);
        }
      },
      async updateEquipment() {
        try {
          await axios.put(`http://localhost:3000/equipments/${this.equipment.equipmentID}`, this.equipment);
          const index = this.equipments.findIndex(item => item.equipmentID === this.equipment.equipmentID);
          this.equipments[index] = { ...this.equipment };
          this.resetEquipment();
        } catch (error) {
          console.error('Error updating equipment:', error);
        }
      },
      editEquipment(item) {
        this.equipment = { ...item };
        this.isEditing = true;
      },
      async deleteEquipment(equipmentID) {
        try {
          await axios.delete(`http://localhost:3000/equipments/${equipmentID}`);
          this.equipments = this.equipments.filter(item => item.equipmentID !== equipmentID);
          this.showDeleteModal = false;
        } catch (error) {
          console.error('Error deleting equipment:', error);
        }
      },
      showDeleteConfirmation(equipmentID) {
        this.currentEquipmentID = equipmentID;
        this.showDeleteModal = true;
      },
      resetEquipment() {
        this.equipment = { equipmentName: '', roomID: null, checklistID: null };
        this.isEditing = false;
      },
      resetNewEquipment() {
        this.newEquipment = { equipmentName: '', roomID: null, checklistID: null };
      },
      getRoomName(roomID) {
        const room = this.rooms.find(r => r.roomID === roomID);
        return room ? room.roomName : 'Unknown';
      },
      getChecklistType(checklistID) {
        const checklist = this.checklists.find(c => c.checklistID === checklistID);
        return checklist ? checklist.checklistType : 'Unknown';
      }
    },
  };
  </script>

