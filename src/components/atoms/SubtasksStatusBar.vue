<template>
    <div class="subtasks-status-bar-wrapper">
        <div class="status-bar">
            <div class="status-bar-fill" :style="{ width: statusBarWidth }"></div>
        </div>
        <span class="subtasks-status-bar-text">{{ numberOfCompletedSubtasks }}</span>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useTasksStore } from '@/stores/tasks';

const props = defineProps({
    taskId: {
        type: String,
        required: true
    }
});

const taskStore = useTasksStore();

const subtasks = computed(() => {
    const task = taskStore.getTaskById(props.taskId);
    return task?.subtasks || [];
});

const completedSubtasks = computed(() =>
    subtasks.value.filter(subtask => subtask.done).length
);

const totalSubtasks = computed(() =>
    subtasks.value.length
);

const statusBarWidth = computed(() => {
    return `${(completedSubtasks.value / totalSubtasks.value) * 100}%`;
});

const numberOfCompletedSubtasks = computed(() => {
    return `${completedSubtasks.value} / ${totalSubtasks.value} Subtasks`;
});

</script>
<style lang="scss" scoped>
.subtasks-status-bar-wrapper {
    @include flex($justify: space-between);
    gap: 8px;
    width: 100%;

    .status-bar {
        width: 60%;
        height: 8px;
        background-color: $basic-grey;
        border-radius: 4px;

        .status-bar-fill {
            height: 100%;
            background-color: $primary-color;
            border-radius: 4px;
        }
    }

    .subtasks-status-bar-text {
        text-align: right;
        flex-shrink: 0;
        width: 40%;
        font-size: 12px;
        line-height: 12px;
        color: $basic-black;
    }
}
</style>