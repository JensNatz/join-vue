<template>
    <div class="task-board">
        <div class="task-board-column" v-for="(column, status) in sortedTasks" :key="status" @dragover.prevent
            @drop="onDrop(status)">
            <div class="task-board-column-header">{{ status }}</div>
            <div class="task-board-column-tasks" v-for="(task, index) in column" :key="index">
                <TaskCard :task="task" :taskId="index" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { useContactStore } from '@/stores/contact';
import TaskCard from '../molecules/TaskCard.vue';

const tasksStore = useTasksStore();
const contactStore = useContactStore();
await Promise.all([
    tasksStore.fetchTasks(),
    contactStore.fetchContacts()
]);

const sortedTasks = computed(() => tasksStore.getTasksSortedByStatus);

const onDrop = async (newStatus) => {
    const result = await tasksStore.updateTaskStatus(tasksStore.dragTaskId, newStatus);
    tasksStore.setDragTaskId(null);

    if (result.success) {
        console.log("success");
    } else {
        console.log("error");
    }
};
</script>
<style lang="scss">
.task-board {
    @include flex($align: start);
    gap: 24px;

    .task-board-column {
        @include flex($direction: column);
        gap: 24px;
        background-color: aquamarine;
        min-height: 100px;
    }
}
</style>