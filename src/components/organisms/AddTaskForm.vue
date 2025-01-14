<template>
    <div class="add-task-form">
        <div class="task-form-header">
            <h1>{{ formTitle }}</h1>
            <CloseButton />
        </div>
        <Form class="task-form" @submit="handleSubmit" :validation-schema="schema">
            <div class="task-form-column">
                <TheInput name="title" label="Title" :required="true" rules="required" :maxLength="40"
                    v-model="initialFormValues.title" />
                <TheInput name="description" label="Description" type="textarea" :maxLength="300"
                    v-model="initialFormValues.description" />
                <ContactAssignmentDropdown name="contacts" label="Contacts" v-model="selectedContacts" />
            </div>
            <div class="task-form-column">
                <TheInput name="dueDate" label="Due Date" type="date" :required="true" rules="required"
                    v-model="initialFormValues.dueDate" />
                <div class="priority-buttons">
                    <PriorityButton class="priority-button" v-for="priority in priorities" :key="priority"
                        :priority="priority" :isSelected="selectedPriority === priority"
                        @click="setPriority(priority)" />
                </div>
                <TheDropdown name="category" label="Category" :options="categories" :required="true" rules="required"
                    :initialValue="initialFormValues.category" />
                <SubtaskManagementForm v-model:subtasks="formSubtasks" />
                <div class="task-form-buttons">
                    <TheButton theme="light" @click="onCancelClick">Cancel</TheButton>
                    <TheButton type="submit">{{ buttonText }}</TheButton>
                </div>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import TheInput from '@/components/molecules/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import PriorityButton from '@/components/atoms/PriorityButton.vue';
import CloseButton from '@/components/molecules/CloseButton.vue';
import ContactAssignmentDropdown from '@/components/molecules/ContactAssignmentDropdown.vue';
import TheDropdown from '@/components/molecules/TheDropdown.vue';
import SubtaskManagementForm from '@/components/organisms/SubtaskManagementForm.vue';
import { useOverlayStore } from '@/stores/overlay';
import { useTasksStore } from '@/stores/tasks';
import { useContactStore } from '@/stores/contact';
import { useToastStore } from '@/stores/toast';
import { Form } from 'vee-validate';
import * as yup from 'yup';

const overlayStore = useOverlayStore();
const taskStore = useTasksStore();
const contactStore = useContactStore();
const toastStore = useToastStore();

const priorities = ['high', 'medium', 'low'];
const categories = ['User Story', 'Technical Task', 'Bug', 'Other'];

const initialPriority = computed(() =>
    overlayStore.overlayMode === 'editTask'
        ? taskStore.getCurrentTask.priority
        : 'medium'
);

const initialContacts = computed(() => {
    if (overlayStore.overlayMode === 'editTask') {
        const task = taskStore.getCurrentTask;
        const assignedIds = task.assigned_to || [];
        return assignedIds.map(id => contactStore.getContactInfoById(id))
            .filter(contact => contact !== null);
    }
    return [];
});

const selectedPriority = ref(initialPriority.value);
const selectedContacts = ref(initialContacts.value);
const formSubtasks = ref(
    overlayStore.overlayMode === 'editTask'
        ? taskStore.getCurrentTask.subtasks
        : []
);

const initialFormValues = computed(() => {
    if (overlayStore.overlayMode === 'editTask') {
        const task = taskStore.getCurrentTask;
        return {
            title: task.title,
            description: task.description,
            dueDate: task.date,
            category: task.category
        };
    }
    return {
        title: '',
        description: '',
        dueDate: '',
        category: ''
    };
});

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

const formTitle = computed(() => {
    return overlayStore.overlayMode === 'createTask' ? 'Add Task' : 'Edit Task';
});

const buttonText = computed(() => {
    return overlayStore.overlayMode === 'createTask' ? 'Create Task' : 'Save';
});

const handleSubmit = async (values) => {
    const currentStatus = taskStore.currentTaskStatus;
    const tasksInCurrentStatus = taskStore.getTasksByStatus(currentStatus);
    const newOrder = tasksInCurrentStatus.length;

    const taskData = {
        title: values.title,
        description: values.description || '',
        date: values.dueDate,
        category: values.category,
        priority: selectedPriority.value,
        assigned_to: selectedContacts.value.map(contact => contact.id),
        subtasks: formSubtasks.value
    };

    let result;

    if (overlayStore.overlayMode === 'createTask') {
        taskData.status = currentStatus;
        taskData.order = newOrder;
        result = await taskStore.addTask(taskData);
    } else {
        taskData.status = taskStore.getCurrentTask.status;
        taskData.order = taskStore.getCurrentTask.order;
        result = await taskStore.updateTask(taskStore.currentTaskId, taskData);
    }

    if (result.success) {
        const successMessage = overlayStore.overlayMode === 'createTask' ? 'Task created successfully!' : 'Task updated successfully!';
        toastStore.showToast(successMessage);
        overlayStore.toggleOverlay();
    } else {
        toastStore.showToast('Something went wrong, please try again.', 'error');
    }
};

const onCancelClick = () => {
    overlayStore.toggleOverlay();
}

</script>

<style lang="scss" scoped>
.add-task-form {
    @include flex($align: start, $direction: column);
    gap: 16px;
    padding: 24px;
    background-color: $basic-white;
    border-radius: 16px;
    width: 1000px;

    @media (max-width: $breakpoint-lg) {
        width: 700px;
    }

    @media (max-width: $breakpoint-md) {
        width: 500px;
    }

    @media (max-width: $breakpoint-sm) {
        padding: 16px;
        width: 100%
    }
}

.task-form-header {
    @include flex($align: start, $justify: space-between);
    width: 100%;

}

.task-form {
    @include flex($align: start, $justify: space-between);
    gap: 24px;
    width: 100%;

    @media (max-width: $breakpoint-lg) {
        @include flex($direction: column);
    }
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

.task-form-buttons {
    @include flex($align: center, $justify: space-between);
    gap: 8px;
    width: 100%;
}
</style>