<template>
  <div class="checklist-customizer">
    <form @submit.prevent="submitChecklist">
      <input v-model="checklist.checklistType" placeholder="Enter checklist type" class="input-field"/>
      <button type="submit" class="submit-btn">Save Checklist</button>
    </form>
    <div v-if="checklists.length > 0">
      <ul>
        <li v-for="item in checklists" :key="item.id">
          {{ item.checklistType }}
          <button @click="editChecklist(item)">Edit</button>
          <button @click="deleteChecklist(item.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      checklists: [],
      checklist: {
        checklistType: ''
      },
      isEditing: false
    };
  },
  created() {
    this.fetchChecklists();
  },
  methods: {
    async fetchChecklists() {
      try {
        const response = await axios.get('http://localhost:3000/checklists');
        this.checklists = response.data;
      } catch (error) {
        console.error('Error fetching checklists:', error);
      }
    },
    async submitChecklist() {
      if (this.isEditing) {
        await this.updateChecklist();
      } else {
        await this.createChecklist();
      }
    },
    async createChecklist() {
      try {
        const response = await axios.post('http://localhost:3000/checklists', this.checklist);
        this.checklists.push(response.data);
        this.checklist.checklistType = ''; // Reset input
      } catch (error) {
        console.error('Error creating checklist:', error);
      }
    },
    async updateChecklist() {
      try {
        await axios.put(`http://localhost:3000/checklists/${this.checklist.id}`, this.checklist);
        const index = this.checklists.findIndex(item => item.id === this.checklist.id);
        this.checklists[index] = {...this.checklist};
        this.resetChecklist();
      } catch (error) {
        console.error('Error updating checklist:', error);
      }
    },
    editChecklist(item) {
      this.checklist = {...item};
      this.isEditing = true;
    },
    async deleteChecklist(id) {
      try {
        await axios.delete(`http://localhost:3000/checklists/${id}`);
        this.checklists = this.checklists.filter(item => item.id !== id);
      } catch (error) {
        console.error('Error deleting checklist:', error);
      }
    },
    resetChecklist() {
      this.checklist = { checklistType: '' };
      this.isEditing = false;
    }
  }
}
</script>