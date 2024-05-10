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
//import LoginPage from './components/LoginPage.vue';
// import SignUpPage from './components/SignUpPage.vue';

// Create a router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    //{ path: '/login', component: LoginPage, meta: { fullPage: true } },
    { path: '/', component: HomePage },
    { path: '/users', component: UsersManagement },
    { path: '/checklist', component: ChecklistManagement },
    { path: '/equipment', component: EquipmentManagement },
    { path: '/documentation', component: DocumentationManagement },
    { path: '/settings', component: SettingsPage },
    { path: '/customize', component: ChecklistCustomizer },
    // { path: '/signup', component: SignUpPage}
  ]
})

// Create a Vue app instance with your root component (App.vue) and router
const app = createApp(App)

// Use Font Awesome icon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)

// Mount your Vue app instance to the DOM, targeting the element with id 'app'
app.mount('#app')
