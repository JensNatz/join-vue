<template>
    <div class="edit-contact-form">
        <div class="edit-contact-form-header">
            <IconLogoWhite />
            <h1>Edit contact</h1>
        </div>
        <div class="edit-contact-form-body">

            <InitialsBadge :name="localContactData.name" size="large" :colorCode="localContactData.colorcode" />
            <Form :validation-schema="schema" @submit="onSubmit">
                <div class="edit-contact-form-body-inputs">
                    <TheInput name="name" icon="person" v-model="localContactData.name" />
                    <TheInput name="email" icon="email" type="email" v-model="localContactData.email" />
                    <TheInput name="phone" icon="phone" type="tel" v-model="localContactData.phone" />
                    <div class=" edit-contact-form-body-inputs-buttons">
                        <TheButton theme="light" @click="onCancelClick">Cancel</TheButton>
                        <TheButton type="submit">Save</TheButton>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { updateOnDatabase } from '@/services/databaseService';
import { Form } from 'vee-validate'
import IconLogoWhite from '../icons/IconLogoWhite.vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import TheInput from '@/components/molecules/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import * as yup from 'yup';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();
const localContactData = ref({});

const schema = yup.object({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters'),
    email: yup.string()
        .required('Email is required')
        .email('Please enter a valid email address'),
    phone: yup.string()
        .required('Phone number is required')
        .matches(/^[0-9+\-\s()]*$/, 'Please enter a valid phone number'),
});

onBeforeMount(() => {
    localContactData.value = { ...contactStore.getContactInfoById(contactStore.currentContactId) };
});

const onCancelClick = () => {
    overlayStore.toggleOverlay();
};

const onSubmit = async () => {
    overlayStore.toggleOverlay();
    const backupContact = { ...localContactData.value };
    contactStore.updateContact(localContactData.value);

    try {
        await updateOnDatabase(`contacts/${localContactData.value.id}`, localContactData.value);
        //Success message
    } catch (error) {
        // TODO: toastmessage, die  sagt "was schiefgelaufen" 
        contactStore.updateContact(backupContact);
    }
};

</script>
<style lang="scss">
.edit-contact-form {
    @include flex();
    border-radius: 16px;
    background-color: $basic-white;
    height: 420px;
    min-width: 1000px;

    .edit-contact-form-header {
        @include flex($direction: column, $align: start);
        gap: 24px;
        background-color: $primary-color;
        border-radius: 16px 0 0 16px;
        padding: 32px;
        height: 100%;

        h1 {
            font-family: Inter;
            color: $basic-white;
        }
    }

    .edit-contact-form-body {
        @include flex($justify: start);
        gap: 48px;
        padding: 32px;
        flex: 1;
        height: 100%;

        .edit-contact-form-body-inputs {
            @include flex($align: end, $direction: column);
            gap: 16px;
            width: 100%;
        }

        .edit-contact-form-body-inputs-buttons {
            margin-top: 48px;
            @include flex();
            gap: 8px;
        }
    }
}
</style>