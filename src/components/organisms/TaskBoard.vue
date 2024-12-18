<template>
    <div class="task-board">
        <div class="task-board-column" v-for="(column, status) in sortedTasks" :key="status">
            <div class="task-board-column-header">{{ status }}</div>
            <VueDraggable class="task-board-tasklist" v-model="sortedTasks[status]" group="tasks" :item-key="'taskId'"
                :data-status="status" @update="onUpdate" @add="onAdd" @remove="onRemove">
                <div v-for="task in column" :key="task.taskId">
                    <TaskCard :task="task" :taskId="task.taskId" />
                </div>
            </VueDraggable>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useContactStore } from '@/stores/contact';
import { useTasksStore } from '@/stores/tasks';
import TaskCard from '../molecules/TaskCard.vue';
import { VueDraggable } from 'vue-draggable-plus';

const contactStore = useContactStore();
const taskStore = useTasksStore();
await Promise.all([
    contactStore.fetchContacts(),
    taskStore.fetchTasks()
]);

const sortedTasks = ref({});

onMounted(async () => {
    sortedTasks.value = taskStore.tasks;
});

async function onUpdate(evt) {
    const newOrder = evt.newIndex;
    const status = evt.data.status;

    for (let i = newOrder; i < sortedTasks.value[status].length; i++) {
        const task = sortedTasks.value[status][i];
        await taskStore.updateTaskOrder(task.taskId, i);
    }
}

async function onAdd(evt) {
    const newStatus = evt.to.dataset.status;
    const newOrder = evt.newIndex;
    const taskId = evt.data.taskId;

    for (let i = newOrder; i < sortedTasks.value[newStatus].length; i++) {
        const task = sortedTasks.value[newStatus][i];
        await taskStore.updateTaskOrder(task.taskId, i);
    }
    await taskStore.updateTaskStatus(taskId, newStatus);
}

async function onRemove(evt) {
    const oldStatus = evt.from.dataset.status;
    const oldOrder = evt.oldIndex;

    for (let i = oldOrder; i < sortedTasks.value[oldStatus].length; i++) {
        const task = sortedTasks.value[oldStatus][i];
        await taskStore.updateTaskOrder(task.taskId, i);
    }
}


</script>
<style lang="scss">
.task-board {
    @include flex($align: start);
    gap: 24px;
    height: 100%;

    .task-board-column {
        @include flex($justify: start, $direction: column);
        gap: 24px;
        height: 100%;
        width: 252px;
        flex-shrink: 0;

        .task-board-tasklist {
            @include flex($justify: start, $direction: column);
            gap: 8px;
            height: 100%;
            padding: 8px;
            width: 100%;
        }
    }
}
</style>