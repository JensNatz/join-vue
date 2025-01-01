<template>
    <div class="add-task-form">
        <h1>Add Task</h1>
        <Form class="task-form">
            <div class="task-form-column">
                <TheInput name="title" label="Title" />
                <TheInput name="description" label="Description" />
                <TheInput name="status" label="Status" />
            </div>
            <div class="task-form-column">
                <TheInput name="title" label="Title" />
                <TheInput name="description" label="Description" />
                <TheInput name="status" label="Status" />
                <TheButton type="submit">Create Task</TheButton>
            </div>

        </Form>

    </div>
</template>

<script setup>
import { Form } from 'vee-validate'
import TheInput from '@/components/molecules/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();

const handleSubmit = async (formData) => {
    overlayStore.toggleOverlay();
    const result = await contactStore.addContact(formData);

    if (result.success) {
        //TODO: Success message
    } else {
        //TODO: Show error message from result.error
    }
};
</script>

<style lang="scss" scoped>
.add-task-form {
    padding: 24px;
    background-color: $basic-white;
    border-radius: 16px;
}

.task-form {
    @include flex($align: start, $justify: space-between);
    gap: 24px;
}
</style>
