<template>
    <div class="add-task-form">
        <div class="task-form-header">
            <h1>Add Task</h1>
            <CloseButton />
        </div>
        <Form class="task-form" @submit="handleSubmit" :validation-schema="schema">
            <div class="task-form-column">
                <TheInput name="title" label="Title" :required="true" rules="required" />
                <TheInput name="description" label="Description" type="textarea" />
                <ContactAssignmentDropdown name="contacts" label="Contacts" v-model:selected="selectedContacts" />
            </div>
            <div class="task-form-column">
                <TheInput name="dueDate" label="Due Date" type="date" :required="true" rules="required" />
                <div class="priority-buttons">
                    <PriorityButton class="priority-button" v-for="priority in priorities" :key="priority"
                        :priority="priority" :isSelected="selectedPriority === priority"
                        @click="setPriority(priority)" />
                </div>
                <TheDropdown name="category" label="Category" :options="categories" :required="true" rules="required" />
                <SubtaskManagementForm v-model:subtasks="formSubtasks" />
                <TheButton type="submit">Create Task</TheButton>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate';
import * as yup from 'yup';
import TheInput from '@/components/molecules/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import PriorityButton from '@/components/atoms/PriorityButton.vue';
import CloseButton from '@/components/molecules/CloseButton.vue';
import ContactAssignmentDropdown from '@/components/molecules/ContactAssignmentDropdown.vue';
import TheDropdown from '@/components/molecules/TheDropdown.vue';
import SubtaskManagementForm from '@/components/organisms/SubtaskManagementForm.vue';
import { useOverlayStore } from '@/stores/overlay';
import { useTasksStore } from '@/stores/tasks';

const overlayStore = useOverlayStore();
const taskStore = useTasksStore();

const priorities = ['high', 'medium', 'low'];
const categories = ['User Story', 'Technical Task', 'Bug', 'Other'];
const selectedPriority = ref('medium');

const schema = yup.object({
    title: yup.string().required('Title is required'),
    dueDate: yup.string().required('Due date is required'),
    category: yup.string()
        .required('Category is required')
        .oneOf(categories, 'Please select a valid category'),
});

const setPriority = (priority) => {
    selectedPriority.value = priority;
}

const formSubtasks = ref([]);
const selectedContacts = ref([]);

const handleSubmit = async (values) => {
    const currentStatus = taskStore.currentTaskStatus;
    const tasksInCurrentStatus = taskStore.getTasksByStatus(currentStatus);
    const newOrder = tasksInCurrentStatus.length;

    const task = {
        title: values.title,
        description: values.description || '',
        date: values.dueDate,
        category: values.category,
        priority: selectedPriority.value,
        assigned_to: selectedContacts.value,
        status: currentStatus,
        order: newOrder,
        subtasks: formSubtasks.value.map(subtask => ({
            title: subtask,
            done: false
        }))
    };

    const result = await taskStore.addTask(task);
    if (result.success) {
        //TODO: Success message
        overlayStore.toggleOverlay();
    } else {
        //TODO: Show error message from result.error
    }

};
</script>

<style lang="scss" scoped>
.add-task-form {
    @include flex($align: start, $direction: column);
    gap: 16px;
    padding: 24px;
    background-color: $basic-white;
    border-radius: 16px;
    width: 1000px;
}

.task-form-header {
    @include flex($align: start, $justify: space-between);
    width: 100%;

}

.task-form {
    @include flex($align: start, $justify: space-between);
    gap: 24px;
    width: 100%;
}

.task-form-column {
    @include flex($align: start, $direction: column);
    gap: 16px;
    width: 100%;
}

.priority-buttons {
    @include flex($align: center, $justify: space-between);
    gap: 8px;
    width: 100%;

    .priority-button {
        flex: 1;
        width: calc((100% - 16px) / 3);
    }
}
</style>