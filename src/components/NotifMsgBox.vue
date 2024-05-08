<template>
  <transition name="slide-fade" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
    <div v-if="show" class="fixed top-4 right-4 z-50 p-4 bg-white shadow-md rounded-lg">
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
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
