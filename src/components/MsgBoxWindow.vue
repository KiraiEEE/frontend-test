<template>
  <transition name="fade">
    <div v-if="show" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 rounded-lg shadow-lg max-w-sm w-full" role="alert">
        <p class="font-bold">Informational message</p>
        <p class="text-sm">{{ message }}</p>
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
