// Main.js

import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/tailwind.css';

// Import Font Awesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faBell } from '@fortawesome/free-solid-svg-icons'

// Add Font Awesome icons to the library
library.add(faUser, faBell)

// Import your components/pages here
import HomePage from './components/HomePage.vue'
import UsersManagement from './components/UsersManagement.vue'
import ChecklistManagement from './components/ChecklistManagement.vue'
import EquipmentManagement from './components/EquipmentManagement.vue'
import DocumentationManagement from './components/DocumentationManagement.vue'
import SettingsPage from './components/SettingsPage.vue'
import ChecklistCustomizer from './components/ChecklistCustomizer.vue';
import AboutApp from './components/AboutApp.vue';
import BranchManagement from './components/BranchManagement.vue';
import RoomManagement from './components/RoomManagement.vue';
import GeneralSettings from './components/GeneralSettings.vue';
import ResetRoomStatus from './components/ResetRoomStatus.vue';
import SingleChecklistPage from './components/SingleChecklistPage.vue';


// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    //{ path: '/login', component: LoginPage, meta: { fullPage: true } },
    { path: '/', component: HomePage },
    { path: '/users', component: UsersManagement },
    { path: '/checklist', component: ChecklistManagement },
    { path: '/equipments', component: EquipmentManagement },
    { path: '/documentations', component: DocumentationManagement },
    { path: '/settings', component: SettingsPage },
    { path: '/customize', component: ChecklistCustomizer },
    { path: '/about', component: AboutApp},
    { path: '/branches', component: BranchManagement }, // Route for BranchManagement
    { path: '/rooms', component: RoomManagement }, // Route for RoomManagement
    { path: '/settings/general', component: GeneralSettings }, // Route for GeneralSettings
    { path: '/reset-room-status', component: ResetRoomStatus }, // Route for ResetRoomStatus



    { path: '/single-checklist', component: SingleChecklistPage }, // Route for SingleChecklistPage
  ]
})

// Create a Vue app instance with your root component (App.vue) and router
const app = createApp(App)

// Use Font Awesome icon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

// Mount your Vue app instance to the DOM, targeting the element with id 'app'
app.mount('#app')
