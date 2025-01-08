<template>
  <TheOverlay>
    <TaskOverview v-if="overlayStore.overlayMode === 'showTask'" />
    <AddTaskForm v-if="overlayStore.overlayMode === 'createTask' || overlayStore.overlayMode === 'editTask'" />
  </TheOverlay>
  <main class="board-view">
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
import TheOverlay from '@/components/molecules/TheOverlay.vue';
import TaskOverview from '@/components/organisms/TaskOverview.vue';
import AddTaskForm from '@/components/organisms/AddTaskForm.vue';
import { useOverlayStore } from '@/stores/overlay';

const overlayStore = useOverlayStore();

</script>
<style lang="scss">
.board-view {
  padding: 24px;
  height: 100%;

}
</style>