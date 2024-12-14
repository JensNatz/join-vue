<template>
    <ContactManagementForm title="Add contact" @submit="handleSubmit" />
</template>

<script setup>
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import ContactManagementForm from './ContactManagementForm.vue';

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