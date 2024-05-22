<template>
  <transition 
    enter-active-class="animate__animated animate__fadeInDown" 
    leave-active-class="animate__animated animate__fadeOutUp"
    @after-enter="handleAfterEnter" 
    @after-leave="handleAfterLeave"
  >
    <div v-if="show" class="fixed top-4 right-4 z-50 p-4 bg-white border-blue-500 border-2 shadow-lg rounded-lg">
      <p>{{ message }}</p>
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
    }
  },
  methods: {
    handleAfterEnter() {
      setTimeout(() => {
        this.$emit('hide');
      }, 1000);
    },
    handleAfterLeave() {
      this.$emit('hidden');
    }
  }
}
</script>

<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
</style>

