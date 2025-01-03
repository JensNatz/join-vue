<template>
    <div class="task-overview">
        <div class="task-overview-header">
            <div class="task-overview-meta">
                <TaskCategoryBadge :category="task.category" />
                <CloseIcon />
            </div>
            <h1>{{ task.title }}</h1>
        </div>
        <div class="task-overview-main">
            <p>{{ task.description }}</p>
            <div class="task-details">
                <div class="task-details-item">
                    <p class="task-label">Due Date:</p>
                    <p>{{ stringService.formatDate(task.date) }}</p>
                </div>
                <div class="task-details-item">
                    <p class="task-label">Priority:</p>
                    <PriorityBadge :priority="task.priority" />
                </div>
            </div>
            <div class="task-overview-assigned-to">
                <p class="task-label">Assigned To:</p>
                <div v-if="assignedContacts.length > 0" class="task-overview-assigned-to-list">
                    <div class="task-overview-assigned-to-item" v-for="contact in assignedContacts">
                        <InitialsBadge size="small" :colorCode="contact.colorcode" :name="contact.name" />
                        <p>{{ contact.name }}</p>
                    </div>
                </div>
                <div v-else>
                    <p>No assigned contacts</p>
                </div>
            </div>
            <div class="task-overview-subtasks">
                <p class="task-label">Subtasks:</p>
                <div v-if="task.subtasks.length > 0" class="task-overview-subtasks-list">
                    <div class="task-overview-subtasks-item" v-for="(subtask, index) in task.subtasks">
                        <TheCheckbox :checked="subtask.done"
                            @update:checked="(value) => handleSubtaskUpdate(index, value)" />
                        <span>{{ subtask.title }}</span>
                    </div>
                </div>
                <div v-else>
                    <p>No subtasks</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useTasksStore } from '@/stores/tasks';
import { stringService } from '@/services/stringService';
import TaskCategoryBadge from '@/components/atoms/TaskCategoryBadge.vue';
import TheCheckbox from '@/components/molecules/TheCheckbox.vue';
import PriorityBadge from '@/components/atoms/PriorityBadge.vue';
import CloseIcon from '@/components/molecules/CloseButton.vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import { ref, computed } from 'vue';
import { useContactStore } from '@/stores/contact';

const taskStore = useTasksStore();
const contactStore = useContactStore();

const task = ref(taskStore.getCurrentTask);

const assignedContacts = computed(() => {
    return task.value.assigned_to?.map(contact =>
        contactStore.getContactInfoById(contact)
    ) || [];
});

const handleSubtaskUpdate = async (index, value) => {
    task.value.subtasks[index].done = value;
    await taskStore.updateSubtaskStatus(taskStore.currentTaskId, index, value);
};

</script>
<style lang="scss">
.task-overview {
    @include flex($direction: column, $align: start, $justify: start);
    gap: 8px;
    background-color: $basic-white;
    width: 560px;
    border-radius: 16px;
    padding: 24px;
    max-height: 90vh;
    overflow: hidden;

    .task-overview-header {
        @include flex($direction: column, $align: start, $justify: start);
        gap: 24px;
        width: 100%;

        .task-overview-meta {
            @include flex($align: center, $justify: space-between);
            width: 100%;
        }
    }

    h1 {
        font-size: 48px;
        line-height: 56px;
        color: $basic-black;
    }

    .task-overview-main {
        width: 100%;
        padding-right: 16px;
        overflow-y: auto;
    }

    .task-label {
        font-weight: 700;
        color: $basic-black;
    }

    .task-details-item {
        @include flex($align: center, $justify: start);
        gap: 16px;
    }

    .task-overview-assigned-to-list {
        @include flex($direction: column, $align: start, $justify: start);

        .task-overview-assigned-to-item {
            @include flex($align: center, $justify: start);
            gap: 16px;
        }
    }

    .task-overview-subtasks-list {
        @include flex($direction: column, $align: start, $justify: start);
        gap: 8px;

        .task-overview-subtasks-item {
            @include flex($justify: start);
            gap: 16px;
            padding-left: 8px;
        }
    }
}
</style>
