<template>
    <ContactManagementForm title="Edit contact" :initial-data="localContactData" @submit="handleSubmit" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/contact';
import { updateOnDatabase } from '@/services/databaseService';
import ContactManagementForm from './ContactManagementForm.vue';

const contactStore = useContactStore();
const localContactData = ref({});

onBeforeMount(() => {
    localContactData.value = { ...contactStore.getContactInfoById(contactStore.currentContactId) };
});

const handleSubmit = async (formData) => {
    const backupContact = { ...formData };
    contactStore.updateContact(formData);
    try {
        await updateOnDatabase(`contacts/${formData.id}`, formData);
        //TODO: Success message
    } catch (error) {
        contactStore.updateContact(backupContact);
    }
};
</script>