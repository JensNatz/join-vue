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

  .board-view-container {
    @include flex($align: start);
    gap: 24px;
  }

  .board-view-column {
    @include flex($direction: column);
    gap: 24px;
  }
}
</style>