<template>
    <div class="task-overview">
        <div class="task-overview-header">
            <div class="task-overview-meta">
                <TaskCategoryBadge :category="task.category" />
                <CloseButton />
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
                <div v-if="task.subtasks" class="task-overview-subtasks-list">
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
            <div class="task-actions">
                <div @click="onEditTaskClick" class="task-action-item">
                    <IconEdit />
                    Edit
                </div>
                <div @click="onDeleteTaskClick" class="task-action-item">
                    <IconDelete />
                    Delete
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import TaskCategoryBadge from '@/components/atoms/TaskCategoryBadge.vue';
import TheCheckbox from '@/components/molecules/TheCheckbox.vue';
import PriorityBadge from '@/components/atoms/PriorityBadge.vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import CloseButton from '@/components/molecules/CloseButton.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { useTasksStore } from '@/stores/tasks';
import { stringService } from '@/services/stringService';
import { useToastStore } from '@/stores/toast';
import { useDialogStore } from '@/stores/dialog';

const dialogStore = useDialogStore();
const taskStore = useTasksStore();
const contactStore = useContactStore();
const overlayStore = useOverlayStore();
const toastStore = useToastStore();
const task = computed(() => taskStore.getCurrentTask);

const assignedContacts = computed(() => {
    return task.value.assigned_to?.map(contact =>
        contactStore.getContactInfoById(contact)
    ) || [];
});

const handleSubtaskUpdate = async (index, value) => {
    await taskStore.updateSubtaskStatus(taskStore.currentTaskId, index, value);
};

const onEditTaskClick = () => {
    overlayStore.setOverlayMode('editTask');
}

const onDeleteTaskClick = () => {
    dialogStore.showDialog({
        title: 'Are you sure you want to delete this task?',
        subline: 'This action cannot be undone.',
        onConfirm: async () => {
            const result = await taskStore.deleteTask(taskStore.currentTaskId);
            if (result.success) {
                toastStore.showToast('Task deleted successfully!');
                overlayStore.toggleOverlay();
            } else {
                toastStore.showToast('Something went wrong, please try again.', 'error');
            }
        },
        onCancel: () => {
            dialogStore.hideDialog();
        }
    });
}

</script>
<style lang="scss" scoped>
.task-overview {
    @include flex($direction: column, $align: start, $justify: start);
    gap: 8px;
    background-color: $basic-white;
    width: 560px;
    border-radius: 16px;
    padding: 24px;
    overflow: hidden;

    @media (max-width: $breakpoint-md) {
        width: 100%;
    }

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
        color: $basic-black;
    }

    .task-overview-main {
        width: 100%;
        padding-right: 16px;
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

    .task-actions {
        @include flex($justify: end);
        gap: 16px;
        padding-top: 16px;

        .task-action-item {
            @include flex($justify: start);
            gap: 8px;

            &:hover {
                cursor: pointer;
                color: $primary-color;
            }
        }
    }
}
</style>