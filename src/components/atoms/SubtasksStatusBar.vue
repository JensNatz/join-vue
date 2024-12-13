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

const props = defineProps({
    subtasks: {
        type: Array,
        required: true
    }
});

const statusBarWidth = computed(() => {
    const completedTasks = props.subtasks.filter(task => task.done).length;
    return `${(completedTasks / props.subtasks.length) * 100}%`;
});

const numberOfCompletedSubtasks = computed(() => {
    return `${props.subtasks.filter(task => task.done).length} / ${props.subtasks.length} Subtasks`;
});


</script>
<style lang="scss">
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