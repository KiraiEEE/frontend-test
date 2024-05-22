<template>
  <div class="search-page">
    <div class="search-bar-container">
      <input
        v-model="searchQuery"
        @keyup.enter="performSearch"
        type="text"
        placeholder="Search..."
        class="search-input"
      />
      <button @click="performSearch" class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <div class="search-results">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="!loading && results.length === 0" class="no-results">No results found.</div>
      <ul v-if="!loading && results.length > 0">
        <li v-for="result in results" :key="result.id" class="search-result-item">
          {{ result.name }}
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
      searchQuery: '',
      results: [],
      loading: false
    };
  },
  methods: {
    performSearch() {
      this.loading = true;
      const backendUrl = localStorage.getItem('backendUrl') || 'http://localhost:3000';
      axios.get(`${backendUrl}/search`, { params: { query: this.searchQuery } })
        .then(response => {
          this.results = response.data;
          this.loading = false;
        })
        .catch(error => {
          console.error('Error during search:', error);
          this.loading = false;
        });
    }
  }
}
</script>

<style scoped>
.search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.search-bar-container {
  display: flex;
  width: 100%;
  max-width: 600px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.search-button {
  padding: 10px;
  background-color: #007BFF;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 0 4px 4px 0;
}

.search-button i {
  font-size: 16px;
}

.loading {
  margin-top: 20px;
}

.no-results {
  margin-top: 20px;
}

.search-result-item {
  list-style: none;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
</style>
