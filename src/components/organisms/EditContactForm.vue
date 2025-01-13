<template>
    <ContactManagementForm title="Edit contact" :initial-data="localContactData" @submit="handleSubmit" />
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import ContactManagementForm from '@/components/organisms/ContactManagementForm.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { useToastStore } from '@/stores/toast';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();
const toastStore = useToastStore();
const localContactData = ref({});

onBeforeMount(() => {
    localContactData.value = { ...contactStore.getContactInfoById(contactStore.currentContactId) };
});

const handleSubmit = async (formData) => {
    const result = await contactStore.updateContact(formData);
    if (result.success) {
        toastStore.showToast('Contact updated successfully!');
        overlayStore.toggleOverlay();
    } else {
        toastStore.showToast('Something went wrong, please try again.', 'error');
    }
};
</script>