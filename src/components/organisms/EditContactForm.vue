<template>
    <ContactManagementForm title="Edit contact" :initial-data="localContactData" @submit="handleSubmit" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import ContactManagementForm from './ContactManagementForm.vue';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();
const localContactData = ref({});

onBeforeMount(() => {
    localContactData.value = { ...contactStore.getContactInfoById(contactStore.currentContactId) };
});

const handleSubmit = async (formData) => {
    overlayStore.toggleOverlay();
    const result = await contactStore.updateContact(formData);

    if (result.success) {
        //TODO: Success message
    } else {
        //TODO: Show error message from result.error
    }
};
</script>