<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div class="mb-4">
          <p class="text-gray-800 text-lg">{{ message }}</p>
        </div>
        <button
          @click="confirm"
          class="bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        >
          Confirm
        </button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    message: String,
    show: Boolean
  },
  methods: {
    confirm() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
