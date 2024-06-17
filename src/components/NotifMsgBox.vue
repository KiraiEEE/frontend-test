<template>
  <transition 
    enter-active-class="animate__animated animate__fadeInDown" 
    leave-active-class="animate__animated animate__fadeOutUp"
    @after-enter="handleAfterEnter" 
    @after-leave="handleAfterLeave"
  >
    <div v-if="show" class="fixed top-0 left-0 right-0 z-50">
      <div class="mx-auto w-full max-w-md p-2">
        <div :class="{'bg-yellow-100 border-t-4 border-yellow-500 text-yellow-900': type === 'warning', 'bg-green-100 border-t-4 border-green-500 text-green-900': type === 'success'}" class="rounded-b px-4 py-3 shadow-md" role="alert">
          <div class="flex">
            <div class="py-1">
              <svg :class="{'fill-current h-6 w-6 text-yellow-500': type === 'warning', 'fill-current h-6 w-6 text-green-500': type === 'success'}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 20a10 10 0 110-20 10 10 0 010 20zm0-18a8 8 0 100 16 8 8 0 000-16zm1 4v5H9V6h2zm0 8v2H9v-2h2z"/></svg>
            </div>
            <div>
              <p class="font-bold">Notification</p>
              <p class="text-sm">{{ message }}</p>
            </div>
            <div class="ml-auto pl-4">
              <svg class="fill-current h-6 w-6 text-green-500 cursor-pointer" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="handleClose"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 12.196 7.349 14.849a1.2 1.2 0 1 1-1.697-1.697L8.196 10 5.652 7.349a1.2 1.2 0 1 1 1.697-1.697L10 8.196l2.651-2.847a1.2 1.2 0 1 1 1.697 1.697L11.804 10l2.544 2.651a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotifMsgBox',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'success' // 'success' or 'warning'
    }
  },
  methods: {
    handleAfterEnter() {
      setTimeout(() => {
        this.$emit('hide');
      }, 3000);
    },
    handleAfterLeave() {
      this.$emit('hidden');
    },
    handleClose() {
      this.$emit('hide');
    }
  }
}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>

