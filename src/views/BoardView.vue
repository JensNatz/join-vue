<template>
  <ToastMessage />
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
        <div class="loading-screen">
          <LoadingElement />
        </div>
      </template>
    </Suspense>
  </main>
  <TheDialog v-if="dialogStore.isVisible" />
</template>

<script setup>
import TaskBoard from '@/components/organisms/TaskBoard.vue';
import TheOverlay from '@/components/molecules/TheOverlay.vue';
import TaskOverview from '@/components/organisms/TaskOverview.vue';
import AddTaskForm from '@/components/organisms/AddTaskForm.vue';
import LoadingElement from '@/components/molecules/LoadingElement.vue';
import ToastMessage from '@/components/molecules/ToastMessage.vue';
import TheDialog from '@/components/molecules/TheDialog.vue';
import { useOverlayStore } from '@/stores/overlay';
import { useDialogStore } from '@/stores/dialog';
import { resetDatabase } from '@/services/securityService';

resetDatabase(); // Just for demo purposes

const overlayStore = useOverlayStore();
const dialogStore = useDialogStore();


</script>
<style lang="scss" scoped>
.board-view {
  padding: 24px;
  height: 100%;

  .loading-screen {
    @include flex();
    width: 100%;
    height: 100%;
  }
}
</style>