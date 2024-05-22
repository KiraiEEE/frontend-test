<template>
  <div class="settings-page bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6">General Settings (Experimental)</h1>
    <div class="setting-item mb-4">
      <label for="notifyEmail" class="block text-gray-800 font-bold mb-2">Email Notifications</label>
      <input type="checkbox" id="notifyEmail" v-model="settings.notifyEmail" class="toggle-checkbox">
      <span class="ml-2 text-gray-600">Enable email notifications</span>
    </div>
    <div class="setting-item mb-4">
      <label for="themeColor" class="block text-gray-800 font-bold mb-2">Theme Color</label>
      <select id="themeColor" v-model="settings.themeColor" class="form-select block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>
    </div>
    <div class="setting-item mb-4">
      <label for="language" class="block text-gray-800 font-bold mb-2">Language</label>
      <select id="language" v-model="settings.language" class="form-select block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
        <option value="en">English</option>
        <option value="fr">French</option>
        <option value="es">Spanish</option>
      </select>
    </div>
    <button @click="saveSettings" class="mt-4 border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      Save Changes
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        notifyEmail: false,
        themeColor: 'blue',
        language: 'en'
      }
    };
  },
  methods: {
    saveSettings() {
      // Here you would typically make an API call to save the settings
      console.log('Settings saved:', this.settings);
      alert('Settings have been saved successfully!');
    }
  }
};
</script>

<style scoped>
.toggle-checkbox {
  transform: scale(1.5);
}
</style>
