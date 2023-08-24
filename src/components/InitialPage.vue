<template>
  <div class="flex justify-center h-screen">
    <div class="grid content-center gap-20">
      <div class="text-white text-5xl">
        Task APP
      </div>
      <div class="flex justify-center">
        <button class="bg-red-700 hover:bg-red-500 text-white rounded-lg p-3" @click="dashboard">
          Enter ->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    dashboard() {
      this.$router.push('Dashboard');
    }
  }
}
</script>