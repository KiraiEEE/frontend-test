<template>
  <link rel="stylesheet" href="./asset/animate.min.css" />

<div class="documentation-manager bg-white p-6 rounded-lg shadow-lg">
  <div class="mb-8">
    <div class="text-center text-red-600 font-bold mb-4">
      This is an experimental page and should have future updates.
    </div>
    <div class="flex gap-3">
      <div class="w-1/2">
        <label for="documentName" class="block text-gray-800 font-bold mb-2">Add New Document</label>
        <input
          v-model="newDocument.documentName"
          id="documentName"
          placeholder="Enter document name"
          class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          required
        />
      </div>
      <div class="w-1/2">
        <label for="userID" class="block text-gray-800 font-bold mb-2">Select User</label>
        <select
          v-model="newDocument.userID"
          id="userID"
          class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          required
        >
          <option disabled value="">Please select one</option>
          <option v-for="user in users" :value="user.userID" :key="user.userID">
            {{ user.userName }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-6 text-center">
      <button
        @click="createDocument"
        :disabled="!newDocument.documentName || !newDocument.userID"
        class="border border-violet-600 text-violet-600 font-bold py-2 px-4 rounded-full hover:bg-violet-600 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50"
        :class="{'opacity-50': !newDocument.documentName || !newDocument.userID}"
      >
        Add Document
      </button>
    </div>
  </div>

  <div v-if="documents.length > 0" class="document-container">
    <table class="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">Document Name</th>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">User</th>
          <th class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in documents"
          :key="item.documentID"
          class="bg-white border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150"
        >
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800"><i class="fas fa-file-alt mr-2"></i>{{ item.documentName }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ getUserName(item.userID) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
            <button
              v-if="isSuperAdmin || (isAdmin && item.userID === currentUserID)"
              @click="editDocument(item)"
              :disabled="!item.documentName || !item.userID"
              class="edit-btn border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out"
              :class="{'opacity-50': !item.documentName || !item.userID}"
            >
              <i class="fas fa-edit"></i> Edit
            </button>
            <button
              v-if="isSuperAdmin"
              @click="showDeleteConfirmation(item.documentID)"
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
        <h3 class="text-lg font-bold mb-4">Edit Document</h3>
        <div class="mb-4">
          <label for="editDocumentName" class="block text-gray-800 font-bold mb-2">Document Name</label>
          <input v-model="document.documentName" id="editDocumentName" placeholder="Enter document name" class="input-field form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
        </div>
        <div class="mb-4">
          <label for="editUserID" class="block text-gray-800 font-bold mb-2">Select User</label>
          <select v-model="document.userID" id="editUserID" class="block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent" required>
            <option disabled value="">Please select one</option>
            <option v-for="user in users" :value="user.userID" :key="user.userID">{{ user.userName }}</option>
          </select>
        </div>
        <div class="text-center">
          <button @click="updateDocument" :disabled="!document.documentName || !document.userID" class="border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out" :class="{'opacity-50': !document.documentName || !document.userID}">Save Changes</button>
          <button @click="isEditing = false" class="ml-4 border border-gray-500 text-gray-500 font-bold py-2 px-4 rounded-full hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Cancel</button>
        </div>
      </div>
    </div>
  </transition>
  <transition name="bounceIn">
    <div v-if="showDeleteModal" class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg animate__animated animate__bounceIn">
        <h3 class="text-lg font-bold mb-4">Delete Document</h3>
        <p class="text-gray-800 mb-4">Are you sure you want to delete this document?</p>
        <div class="text-center">
          <button @click="deleteDocument(currentDocumentID)" class="border border-red-600 text-red-600 font-bold py-2 px-4 rounded-full hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out">Confirm</button>
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
      documents: [],
      users: [],
      document: {
        documentName: '',
        userID: null,
      },
      newDocument: {
        documentName: '',
        userID: null,
      },
      isEditing: false,
      showDeleteModal: false,
      currentDocumentID: null,
      backendUrl: '',
      isSuperAdmin: localStorage.getItem('role') === 'superadmin',
      isAdmin: localStorage.getItem('role') === 'admin',
      currentUserID: null
    };
  },
  created() {
    this.backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
    this.fetchDocuments();
    this.fetchUsers();
    this.fetchCurrentUserID();
  },
  methods: {
    async fetchDocuments() {
      try {
        const response = await axios.get(`${this.backendUrl}/documents`);
        this.documents = response.data;
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get(`${this.backendUrl}/users`);
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchCurrentUserID() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${this.backendUrl}/users/${userId}`);
        this.currentUserID = response.data.userID;
      } catch (error) {
        console.error('Error fetching current user ID:', error);
      }
    },
    async createDocument() {
      try {
        const response = await axios.post(`${this.backendUrl}/documents`, this.newDocument);
        this.documents.push(response.data);
        this.resetNewDocument();
      } catch (error) {
        console.error('Error creating document:', error);
      }
    },
    async updateDocument() {
      try {
        await axios.put(`${this.backendUrl}/documents/${this.document.documentID}`, this.document);
        const index = this.documents.findIndex(item => item.documentID === this.document.documentID);
        this.documents[index] = { ...this.document };
        this.resetDocument();
      } catch (error) {
        console.error('Error updating document:', error);
      }
    },
    editDocument(item) {
      this.document = { ...item };
      this.isEditing = true;
    },
    async deleteDocument(documentID) {
      try {
        await axios.delete(`${this.backendUrl}/documents/${documentID}`);
        this.documents = this.documents.filter(item => item.documentID !== documentID);
        this.showDeleteModal = false;
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    },
    showDeleteConfirmation(documentID) {
      this.currentDocumentID = documentID;
      this.showDeleteModal = true;
    },
    resetDocument() {
      this.document = { documentName: '', userID: null };
      this.isEditing = false;
    },
    resetNewDocument() {
      this.newDocument = { documentName: '', userID: null };
    },
    getUserName(userID) {
      const user = this.users.find(u => u.userID === userID);
      return user ? user.userName : 'Unknown';
    }
  },
};
</script>
