<template>
    <ContactManagementForm title="Add contact" @submit="handleSubmit" />
</template>

<script setup>
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { postToDatabase } from '@/services/databaseService';
import ContactManagementForm from './ContactManagementForm.vue';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();

const handleSubmit = async (formData) => {
    overlayStore.toggleOverlay();

    try {
        const response = await postToDatabase('contacts', formData);
        const newContactId = response.name;
        const newContact = { ...formData, id: newContactId };
        contactStore.addToSortedContacts(newContact);
        contactStore.setCurrentContactId(newContactId);
        //TODO: Success message
    } catch (error) {
        // TODO: Error handling
    }
};
</script>