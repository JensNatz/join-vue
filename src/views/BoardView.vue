<template>
  <main class="board-view">
    <div class="board-view-controls">
      <div class="board-view-controls-button">
        <TheButton>Add Task</TheButton>
      </div>
    </div>
    <Suspense>
      <template #default>
        <TaskBoard />
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
  </main>
</template>

<script setup>
import TaskBoard from '@/components/organisms/TaskBoard.vue';
import TheButton from '@/components/atoms/TheButton.vue';
</script>
<style lang="scss">
.board-view {
  padding: 24px;
  height: 100%;

}
</style>