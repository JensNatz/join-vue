<template>
    <div class="contact-management-form">
        <div class="contact-management-form-header">
            <IconLogoWhite />
            <h1>{{ title }}</h1>
        </div>
        <div class="contact-management-form-body">
            <InitialsBadge :name="contactData.name" size="large" :colorCode="initialData.colorcode" />
            <Form :validation-schema="schema" @submit="onSubmit">
                <div class="contact-management-form-body-inputs">
                    <TheInput name="name" icon="person" v-model="contactData.name" />
                    <TheInput name="email" icon="email" type="email" v-model="contactData.email" />
                    <TheInput name="phone" icon="phone" type="tel" v-model="contactData.phone" />
                    <div class=" contact-management-form-body-inputs-buttons">
                        <TheButton theme="light" @click="onCancelClick">Cancel</TheButton>
                        <TheButton type="submit">Save</TheButton>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { Form } from 'vee-validate'
import IconLogoWhite from '@/components/icons/IconLogoWhite.vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import TheInput from '@/components/molecules/TheInput.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import * as yup from 'yup';
import { useOverlayStore } from '@/stores/overlay';

const overlayStore = useOverlayStore();

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    initialData: {
        type: Object,
        default: () => ({
            name: '',
            email: '',
            phone: '',
            colorcode: Math.floor(Math.random() * 9)
        })
    }
});

const contactData = ref({ ...props.initialData });

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
const emit = defineEmits(['submit', 'cancel']);

const onCancelClick = () => {
    overlayStore.toggleOverlay();
};

const onSubmit = async () => {
    emit('submit', contactData.value);
};


</script>
<style lang="scss">
.contact-management-form {
    @include flex();
    border-radius: 16px;
    background-color: $basic-white;
    height: 420px;
    min-width: 1000px;

    .contact-management-form-header {
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

    .contact-management-form-body {
        @include flex($justify: start);
        gap: 48px;
        padding: 32px;
        flex: 1;
        height: 100%;

        .contact-management-form-body-inputs {
            @include flex($align: end, $direction: column);
            gap: 16px;
            width: 100%;
        }

        .contact-management-form-body-inputs-buttons {
            margin-top: 48px;
            @include flex();
            gap: 8px;
        }
    }
}
</style>