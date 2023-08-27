<template>
  <div class="flex justify-center">
    <div class="grid content-center gap-40 h-screen">
      <div class="text-7xl italic bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Task APP
      </div>
      <div class="flex justify-center">
        <Button :text="'Enter ->'" class="bg-red-700 hover:bg-red-500 text-white" @click="dashboard"/>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './widgets/Button.vue';

  export default {
    components: {
      Button
    },
    methods: {
      dashboard() {
        this.$router.push('Dashboard');
      }
    }
  }
</script>