<template>
  <div class="flex justify-center h-screen">
    <div class="grid content-center gap-20">
      <div class="text-5xl text-black">
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