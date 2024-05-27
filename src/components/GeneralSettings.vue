<template>
  <div class="settings-page bg-white p-6 rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6">General Settings (Experimental)</h1>
    <div class="setting-item mb-4">
      <label for="notifyEmail" class="block text-gray-800 font-bold mb-2">Email Notifications</label>
      <input type="checkbox" id="notifyEmail" v-model="settings.notifyEmail" class="toggle-checkbox">
      <span class="ml-2 text-gray-600">Enable email notifications</span>
    </div>

    <div class="setting-item mb-4">
      <label for="serverUrl" class="block text-gray-800 font-bold mb-2">Backend Server URI</label>
      <input type="text" id="serverUrl" v-model="settings.serverUrl" class="form-input block w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-md shadow-sm" placeholder="Enter server URL">
    </div>
    <button @click="saveSettings" class="mt-4 border border-blue-500 text-blue-500 font-bold py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
      Save Changes
    </button>
    <NotifMsgBox ref="notifMsgBox" :show="notifMsgBoxShow" :message="notifMsgBoxMessage" :type="notifMsgBoxType" @hide="handleNotifMsgBoxHide"/>
  </div>
</template>

<script>
import NotifMsgBox from './NotifMsgBox.vue';

export default {
  components: {
    NotifMsgBox
  },
  data() {
    return {
      settings: {
        notifyEmail: false,
        serverUrl: localStorage.getItem('backendUrl') || '',
        themeColor: 'blue',
        language: 'en'
      },
      notifMsgBoxShow: false,
      notifMsgBoxMessage: '',
      notifMsgBoxType: 'success'
    };
  },
  methods: {
    saveSettings() {
      // Here you would typically make an API call to save the settings
      console.log('Settings saved:', this.settings);
      localStorage.setItem('backendUrl', this.settings.serverUrl);
      this.showNotifMsgBox('Settings have been saved successfully!', 'success');
    },
    showNotifMsgBox(message, type) {
      this.notifMsgBoxMessage = message;
      this.notifMsgBoxType = type;
      this.notifMsgBoxShow = true;
    },
    handleNotifMsgBoxHide() {
      this.notifMsgBoxShow = false;
    }
  }
};
</script>

<style scoped>
.toggle-checkbox {
  transform: scale(1.5);
}
</style>
