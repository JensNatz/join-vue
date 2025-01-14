<template>
    <div class="task-dashboard-indicator" :class="{ 'urgent': theme === 'urgent' }">
        <div class="header">
            <component :is="statusIcon" class="icon" />
            <span class="number">{{ isLoading ? '-' : numberOFTasksInStatus }}</span>
        </div>
        <div class="content">
            <span class="title">{{ title }}</span>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import IconTotalTasks from '@/components/icons/IconTotalTasks.vue';
import IconTodo from '@/components/icons/IconTodo.vue';
import IconProgress from '@/components/icons/IconProgress.vue';
import IconFeedback from '@/components/icons/IconFeedback.vue';
import IconDone from '@/components/icons/IconDone.vue';
import IconUrgent from '@/components/icons/IconUrgent.vue';
import { useTasksStore } from '@/stores/tasks';

const tasksStore = useTasksStore();
const isLoading = ref(true);

const initializeTasks = async () => {
    isLoading.value = true;
    await tasksStore.fetchTasks();
    isLoading.value = false;
};

initializeTasks();

const props = defineProps({
    status: {
        type: String,
        default: 'all',
        validator: (value) => ['to-do', 'progress', 'feedback', 'done', 'all'].includes(value)
    },
    theme: {
        type: String,
        default: 'default',
        validator: (value) => ['urgent', 'default'].includes(value)
    }
});

const numberOFTasksInStatus = computed(() => {
    let tasks;
    if (props.theme === 'urgent') {
        tasks = tasksStore.getTasksByPriority('high');
        return tasks.length;
    } else {
        if (props.status !== 'all') {
            tasks = tasksStore.getTasksByStatus(props.status);
        } else {
            tasks = Object.values(tasksStore.tasks);
        }
    }
    return tasks.length;
});

const title = computed(() => {
    if (props.theme === 'urgent') {
        return 'Urgent Tasks';
    }
    const titles = {
        'to-do': 'Tasks in Backlog',
        'progress': 'Tasks in Progress',
        'feedback': 'Tasks Awaiting Feedback',
        'done': 'Tasks Done',
        'all': 'Total Tasks'
    };
    return titles[props.status];
});

const statusIcon = computed(() => {
    if (props.theme === 'urgent') {
        return IconUrgent;
    }
    const icons = {
        'all': IconTotalTasks,
        'to-do': IconTodo,
        'progress': IconProgress,
        'feedback': IconFeedback,
        'done': IconDone
    };
    return icons[props.status];
});
</script>

<style lang="scss" scoped>
.task-dashboard-indicator {
    @include flex($direction: column, $justify: start);
    gap: 16px;
    width: 204px;
    height: 220px;
    background-color: $basic-white;
    border-radius: 20px;
    padding: 40px 16px 16px 16px;
    box-shadow: 0px 0px 4px 0px rgba($basic-black, 0.2);
    transition: all 0.125s ease-in-out;

    @media (max-width: $breakpoint-md) {
        width: 180px;
        height: 190px;
        padding: 32px 12px 12px 12px;
    }

    @media (max-width: $breakpoint-sm) {
        width: 90px;
        height: 130px;
        gap: 8px;
        padding: 16px 8px 8px 8px;
    }

    &:hover {
        box-shadow: 0px 0px 8px 0px rgba($basic-black, 0.2);
        scale: 1.015;
    }

    &.urgent {

        background-color: $primary-color;

        .number {
            color: $basic-white;
        }

        .content {
            .title {
                color: $basic-white;
            }
        }
    }

    .header {
        @include flex();
        gap: 16px;

        @media (max-width: $breakpoint-md) {
            gap: 12px;
        }

        @media (max-width: $breakpoint-sm) {
            gap: 8px;
        }

        .icon {
            @media (max-width: $breakpoint-md) {
                width: 56px;
                height: 56px;
            }


            @media (max-width: $breakpoint-sm) {
                width: 40px;
                height: 40px;
            }
        }

        .number {
            font-size: 48px;
            font-weight: 700;

            @media (max-width: $breakpoint-md) {
                font-size: 32px;
            }

            @media (max-width: $breakpoint-sm) {
                font-size: 24px;
            }
        }
    }

    .content {
        @include flex();

        .title {
            font-size: 20px;
            font-weight: 500;
            color: $primary-color;
            text-align: center;

            @media (max-width: $breakpoint-sm) {
                font-size: 14px;
            }
        }
    }


}
</style>
