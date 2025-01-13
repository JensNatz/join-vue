<template>
    <ContactManagementForm title="Add contact" @submit="handleSubmit" />
</template>

<script setup>
import ContactManagementForm from './ContactManagementForm.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { useToastStore } from '@/stores/toast';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();
const toastStore = useToastStore();

const handleSubmit = async (formData) => {
    const result = await contactStore.addContact(formData);
    if (result.success) {
        toastStore.showToast('Contact created successfully!');
        overlayStore.toggleOverlay();
    } else {
        toastStore.showToast('Something went wrong, please try again.', 'error');
    }
};
</script>