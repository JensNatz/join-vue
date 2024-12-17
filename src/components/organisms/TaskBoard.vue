<template>
    <div class="task-board">
        <div class="task-board-column" v-for="(column, status) in sortedTasks" :key="status">
            <div class="task-board-column-header">{{ status }}</div>
            <VueDraggable class="task-board-column-tasks" v-model="sortedTasks[status]" group="tasks"
                :item-key="'taskId'" :data-status="status" @update="onUpdate" @add="onAdd" @remove="onRemove">
                <div v-for="task in column" :key="task.taskId">
                    <TaskCard :task="task" :taskId="task.taskId" />
                </div>
            </VueDraggable>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';
import { useContactStore } from '@/stores/contact';
import TaskCard from '../molecules/TaskCard.vue';
import { VueDraggable } from 'vue-draggable-plus';

const tasksStore = useTasksStore();
const contactStore = useContactStore();
await Promise.all([
    tasksStore.fetchTasks(),
    contactStore.fetchContacts()
]);

const sortedTasks = computed(() => {
    const tasks = tasksStore.getTasksSortedByStatus;
    return Object.entries(tasks).reduce((acc, [status, tasksObj]) => {
        acc[status] = Object.entries(tasksObj).map(([id, task]) => ({
            ...task,
            taskId: id
        }));
        return acc;
    }, {});
});

function onUpdate(evt) {
    console.log('update', evt.data.taskId, evt.oldIndex, evt.newIndex, evt.data.status);
    tasksStore.updateTaskOrder(evt.data.taskId, evt.newIndex, evt.data.status);
}

function onAdd(evt) {
    const newStatus = evt.to.dataset.status;
    const oldStatus = evt.from.dataset.status;
    tasksStore.updateTaskOrder(evt.data.taskId, evt.newIndex, newStatus, evt.oldIndex, oldStatus);
}

function onRemove(evt) {
    console.log('remove', evt.data.taskId);
}

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