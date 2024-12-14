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
import { computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { useContactStore } from '@/stores/contact';
import TaskCard from '@/components/molecules/TaskCard.vue';

const tasksStore = useTasksStore();
const contactStore = useContactStore();

await Promise.all([
  tasksStore.fetchTasks(),
  contactStore.fetchContacts()
]);


const sortedTasks = computed(() => tasksStore.getTasksSortedByStatus);

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