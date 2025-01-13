<template>
    <div class="task-card" @click="onTaskCardClick">
        <TaskCategoryBadge :category="task.category" />
        <h2>{{ stringService.truncate(task.title, 30) }}</h2>
        <span>{{ stringService.truncate(task.description, 50) }}</span>
        <SubtasksStatusBar v-if="task.subtasks && task.subtasks.length > 0" :taskId="taskId" />
        <div class="task-card-bottom">
            <div class="task-card-assigned-to">
                <template v-if="task.assigned_to" v-for="contactId in displayedContacts">
                    <InitialsBadge size="small" v-bind="getContactInfo(contactId)" />
                </template>
                <template v-if="hasMoreContacts">
                    <InitialsBadge size="small" :number="remainingContactsCount" />
                </template>
            </div>
            <PriorityBadge :priority="task.priority" />
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import SubtasksStatusBar from '@/components/atoms/SubtasksStatusBar.vue';
import PriorityBadge from '@/components/atoms/PriorityBadge.vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import TaskCategoryBadge from '@/components/atoms/TaskCategoryBadge.vue';
import { stringService } from '@/services/stringService';
import { useContactStore } from '@/stores/contact';
import { useTasksStore } from '@/stores/tasks';
import { useOverlayStore } from '@/stores/overlay';

const props = defineProps({
    task: {
        type: Object,
        required: true
    },
    taskId: {
        type: String,
        required: true
    }
});

const MAX_DISPLAYED_CONTACTS = 4;

const contactStore = useContactStore();
const tasksStore = useTasksStore();
const overlayStore = useOverlayStore();

const getContactInfo = (contactId) => {
    const contactInfo = contactStore.getContactInfoById(contactId);
    return {
        name: contactInfo.name,
        colorCode: contactInfo.colorcode
    };
};

const displayedContacts = computed(() => {
    if (props.task.assigned_to?.length > MAX_DISPLAYED_CONTACTS) {
        return props.task.assigned_to.slice(0, MAX_DISPLAYED_CONTACTS - 1);
    }
    return props.task.assigned_to || [];
});

const hasMoreContacts = computed(() => {
    return props.task.assigned_to?.length > MAX_DISPLAYED_CONTACTS - 1;
});

const remainingContactsCount = computed(() => {
    return props.task.assigned_to?.length - (MAX_DISPLAYED_CONTACTS - 1);
});

const onTaskCardClick = () => {
    tasksStore.setCurrentTaskId(props.taskId);
    overlayStore.toggleOverlay();
    overlayStore.setOverlayMode('showTask');
};

</script>
<style lang="scss" scoped>
.task-card {
    @include flex($direction: column, $align: start, $justify: start);
    width: 252px;
    padding: 16px;
    gap: 16px;
    border-radius: 8px;
    background-color: $basic-white;
    box-shadow: 0px 0px 10px 3px rgba($basic-black, 0.08);
    cursor: grab;

    &.dragging {
        opacity: 0.5;
        cursor: grabbing;
    }

    h2 {
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
        color: $primary-color;
    }

    span {
        font-size: 14px;
        line-height: 14px;
        color: $basic-black;
    }

    .task-card-bottom {
        @include flex($justify: space-between);
        gap: 16px;
        width: 100%;

        .task-card-assigned-to {
            @include flex($justify: start);

            &>*:not(:first-child) {
                margin-left: -8px;
            }
        }
    }
}
</style>