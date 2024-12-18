<template>
  <TheOverlay>

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
import { postToDatabase } from '@/services/databaseService';
import TheOverlay from '@/components/molecules/TheOverlay.vue';
import { useOverlayStore } from '@/stores/overlay';

const overlayStore = useOverlayStore();

async function addTask() {
  console.log('addTask');
  overlayStore.toggleOverlay();
  overlayStore.setOverlayMode('createTask');
  // await postToDatabase('tasks', {
  //   assigned_to: [
  //     "-O4ixFVzFa9T33PR02PH"
  //   ],
  //   category: "Technical Task",
  //   date: "2024-11-08",
  //   description: "Dummy Task",
  //   order: 11,
  //   priority: "medium",
  //   status: "to-do",
  //   subtasks: [
  //     {
  //       done: true,
  //       title: "This is a test subtask"
  //     }
  //   ],
  //   title: "Hello World",
  // });
}
</script>
<style lang="scss">
.board-view {
  padding: 24px;
  height: 100%;

}
</style>