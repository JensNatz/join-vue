<template>
    <div class="add-task-form">
        <div class="task-form-header">
            <h1>Add Task</h1>
            <CloseButton />
        </div>
        <Form class="task-form">
            <div class="task-form-column">
                <TheInput name="title" label="Title" required="true" />
                <TheInput name="description" label="Description" type="textarea" />

            </div>
            <div class="task-form-column">
                <TheInput name="dueDate" label="Due Date" type="date" required="true" />
                <div class="priority-buttons">
                    <PriorityButton class="priority-button" v-for="priority in priorities" :key="priority"
                        :priority="priority" :isSelected="selectedPriority === priority"
                        @click="setPriority(priority)" />
                </div>
                <TheDropdown name="category" label="Category" :options="categories" required="true" />
                <TheButton type="submit">Create Task</TheButton>
            </div>
        </Form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate'
import TheInput from '@/components/molecules/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import PriorityButton from '@/components/atoms/PriorityButton.vue';
import CloseButton from '@/components/molecules/CloseButton.vue';
import TheDropdown from '@/components/molecules/TheDropdown.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();

const priorities = ['high', 'medium', 'low'];
const categories = ['User Story', 'Technical Task', 'Bug', 'Other'];
const selectedPriority = ref('medium');

const setPriority = (priority) => {
    selectedPriority.value = priority;
}

const handleSubmit = async (formData) => {
    overlayStore.toggleOverlay();
    const result = await contactStore.addContact({
        ...formData,
        priority: selectedPriority.value
    });

    if (result.success) {
        //TODO: Success message
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