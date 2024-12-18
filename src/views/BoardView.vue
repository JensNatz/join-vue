<template>
  <TheOverlay>
    <TaskOverview v-if="overlayStore.overlayMode === 'showTask'" />
  </TheOverlay>
  <main class="board-view">
    <div class="board-view-controls">
      <div class="board-view-controls-button">
        <TheButton @click="addTask">Add Task</TheButton>
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
import TheOverlay from '@/components/molecules/TheOverlay.vue';
import TaskOverview from '@/components/organisms/TaskOverview.vue';
import { useOverlayStore } from '@/stores/overlay';

const overlayStore = useOverlayStore();

async function addTask() {
  console.log('addTask');
  overlayStore.toggleOverlay();
  overlayStore.setOverlayMode('createTask');
}
</script>
<style lang="scss">
.board-view {
  padding: 24px;
  height: 100%;

}
</style>