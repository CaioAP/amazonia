<template>
  <div id="app">
    <div class="container">
      <BaseBoard :selected="selected" />
      <div class="inputs"></div>
    </div>
    <div class="history"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import BaseBoard from './components/BaseBoard.vue';

const selected = reactive([]);
</script>

<style scoped>
#app {
  max-width: 66%;
  margin: auto;
}

.container {
  display: flex;
  min-width: 100%;
}
</style>
