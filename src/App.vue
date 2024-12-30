<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Toast from "primevue/toast";
</script>

<template>
  <main class="main">
    <Toast />
    <RouterView />
  </main>
</template>

<style scoped></style>
