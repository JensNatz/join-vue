<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/organisms/TheHeader.vue'
import NavBar from '@/components/organisms/NavBar.vue'
</script>

<template>
  <div class="app">
    <TheHeader />
    <div class="app-content">
      <NavBar />
      <div class="page-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  @include flex($direction: column);
  height: 100vh;
}

.app-content {
  flex: 1;
  width: 100%;
  @include flex($align: flex-start);
  overflow: hidden;

  @media (max-width: $breakpoint-lg) {
    @include flex($direction: column-reverse);
  }

  .page-content {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
  }
}
</style>
