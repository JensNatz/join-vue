<template>
  <main class="board-view">
    <div class="board-view-container">
      <div class="board-view-column" v-for="(column, status) in sortedTasks" :key="status">
        <div class="board-view-column-header">{{ status }}</div>
        <div class="board-view-column-tasks" v-for="(task) in column">
          <TaskCard :task="task" />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { useContactStore } from '@/stores/contact';
import TaskCard from '@/components/molecules/TaskCard.vue';

const tasksStore = useTasksStore();
const contactStore = useContactStore();
const sortedTasks = ref({});

onBeforeMount(async () => {
  await tasksStore.fetchAndSortTasks();
  sortedTasks.value = tasksStore.sortedTasks;
  console.log(sortedTasks.value);
});
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