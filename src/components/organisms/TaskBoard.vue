<template>
    <div class="task-board">
        <div class="task-board-column" v-for="(column, status) in sortedTasks" :key="status">
            <div class="task-board-column-header">{{ getColumnTitle(status) }}</div>
            <TheButton size="small" @click="addTask(status)">Add Task
                <template #icon>
                    <IconAdd />
                </template>
            </TheButton>
            <VueDraggable class="task-board-tasklist" v-model="sortedTasks[status]" group="tasks" :item-key="'taskId'"
                :data-status="status" @update="onUpdate" @add="onAdd" @remove="onRemove" @dragstart="onDragStart"
                @dragend="onDragEnd">
                <div v-for="task in column" :key="task.taskId">
                    <TaskCard :task="task" :taskId="task.taskId" />
                </div>
            </VueDraggable>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import TaskCard from '@/components/molecules/TaskCard.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import IconAdd from '@/components/icons/IconAdd.vue';
import { useContactStore } from '@/stores/contact';
import { useTasksStore } from '@/stores/tasks';
import { useOverlayStore } from '@/stores/overlay';
import { VueDraggable } from 'vue-draggable-plus';

const contactStore = useContactStore();
const taskStore = useTasksStore();
const overlayStore = useOverlayStore();

await Promise.all([
    contactStore.fetchContacts(),
    taskStore.fetchTasks()
]);

const sortedTasks = ref({});
const isDragging = ref(false);

const getColumnTitle = computed(() => (status) => {
    const titleMap = {
        'to-do': 'Backlog',
        'progress': 'In Progress',
        'feedback': 'Awaiting Feedback',
        'done': 'Done',
    };
    return titleMap[status] || status;
});

watch(
    () => taskStore.getSortedTasks,
    (newTasks) => {
        if (!isDragging.value) {
            sortedTasks.value = JSON.parse(JSON.stringify(newTasks));
        }
    },
    { immediate: true }
);

onMounted(async () => {
    sortedTasks.value = taskStore.getSortedTasks;
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

async function addTask(status) {
    taskStore.setCurrentTaskStatus(status);
    overlayStore.toggleOverlay();
    overlayStore.setOverlayMode('createTask');
}

const onDragStart = () => {
    isDragging.value = true;
};

const onDragEnd = () => {
    isDragging.value = false;
};

</script>
<style lang="scss" scoped>
.task-board {
    @include flex($align: start);
    gap: 24px;
    height: 100%;
    flex-shrink: 0;
    min-width: fit-content;
    overflow-x: auto;
    padding: 16px;

    .task-board-column {
        @include flex($justify: start, $direction: column);
        gap: 16px;
        height: 100%;
        width: 252px;
        flex-shrink: 0;

        .task-board-column-header {
            @include flex($justify: start);
            font-weight: 700;
            width: 100%;
        }

        .task-board-tasklist {
            @include flex($justify: start, $direction: column);
            gap: 8px;
            height: fit-content;
            padding: 8px;
            width: 100%;
        }
    }
}
</style>