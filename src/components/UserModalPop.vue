<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" @click.self="close">
    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <h3 class="text-lg leading-6 font-medium text-gray-900">{{ mode === 'add' ? 'Add New User' : 'Edit User' }}</h3>
      <form class="mt-2">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Name</label>
          <input type="text" v-model="localUser.name" id="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input type="email" v-model="localUser.email" id="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="cin">CIN</label>
          <input type="text" v-model="localUser.CIN" id="cin" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role">Role</label>
          <input type="text" v-model="localUser.role" id="role" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="branchID">Branch ID</label>
          <input type="text" v-model="localUser.branchID" id="branchID" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
          <input type="text" v-model="localUser.username" id="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="save">
            {{ mode === 'add' ? 'Add' : 'Save' }}
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" @click="close">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({
        name: '',
        email: '',
        CIN: '',
        role: '',
        branchID: '',
        username: ''
      })
    },
    mode: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      localUser: JSON.parse(JSON.stringify(this.user))
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    save() {
      this.$emit('save', this.localUser);
    }
  }
}
</script>

