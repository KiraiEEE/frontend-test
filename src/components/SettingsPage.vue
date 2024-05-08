<!-- SettigsPage.vue -->

<template>
  <div>
   <div class="max-w-2xl mx-auto bg-white-100 p-16">

    <form @submit.prevent="handleUpdate">
        <div class="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
                <!-- Profile Picture container -->
                <div class="relative">
                    <label for="profile_pic" class="block mb-2 text-sm font-medium text-gray-800">Profile Picture</label>
                    <!-- Hidden file input -->
                    <input type="file" id="profile_pic" accept="image/*" class="absolute w-full h-full opacity-0">
                    <!-- Picture container -->
                    <div class="w-40 h-40 bg-gray-200 flex justify-center items-center rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300">
                        <div class="w-16 h-16 bg-gray-300 rounded-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                                <path fill-rule="evenodd" d="M2 10c0 3.807 3.134 7 7 7s7-3.193 7-7c0-3.807-3.134-7-7-7s-7 3.193-7 7zm1 0c0-3.31 2.691-6 6-6s6 2.69 6 6c0 3.31-2.691 6-6 6s-6-2.69-6-6z" clip-rule="evenodd" />
                            </svg>
                        </div>
                    </div>
                    <!-- Hover overlay -->
                    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fill-rule="evenodd" d="M2 10c0 3.807 3.134 7 7 7s7-3.193 7-7c0-3.807-3.134-7-7-7s-7 3.193-7 7zm1 0c0-3.31 2.691-6 6-6s6 2.69 6 6c0 3.31-2.691 6-6 6s-6-2.69-6-6z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
            <div>
                <label for="full_name" class="block mb-2 text-sm font-medium text-gray-800">Full name</label>
                <input type="text" id="full_name" v-model="fullName" class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required>
            </div>

            <div>
                <label for="department" class="block mb-2 text-sm font-medium text-gray-800">Department</label>
                <input type="text" id="department" v-model="department" class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="LTN-*" required>
            </div>

            <div>
                <label for="cin" class="block mb-2 text-sm font-medium text-gray-800">CIN (Identification Number)</label>
                <input type="text" id="cin" v-model="cin" class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="123456789" required>
            </div>
            <div>
                <label for="code" class="block mb-2 text-sm font-medium text-gray-800">Code</label>
                <input type="text" id="code" v-model="code" class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="ABC123" required>
            </div>

            <div>
                <label for="password" class="block mb-2 text-sm font-medium text-gray-800">Password</label>
                <input type="password" id="password" v-model="password" class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            </div>
            <div>
                <label for="retype_password" class="block mb-2 text-sm font-medium text-gray-800">Retype Password</label>
                <input type="password" id="retype_password" v-model="retypePassword" class="bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
            </div>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save Changes</button>
    </form>
    
</div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      fullName: '',
      department: '',
      cin: '',
      code: '',
      password: '',
      retypePassword: ''
    };
  },
  methods: {
    async handleUpdate() {
      if (this.password !== this.retypePassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.put(`http://localhost:3000/users/${userId}`, {
          fullName: this.fullName,
          department: this.department,
          cin: this.cin,
          code: this.code,
          password: this.password
        });
        if (response.status === 200) {
          alert("Update successful!");
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Network error: ' + error.message);
      }
    }
  }
}
</script>