<template>
    <div class="contact-management-form">
        <CloseIcon class="close-icon" />
        <div class="contact-management-form-header">
            <IconLogoWhite class="logo" />
            <h1>{{ title }}</h1>
        </div>
        <div class="contact-management-form-body">
            <Form :validation-schema="schema" @submit="onSubmit">
                <div class="contact-management-form-body-header">
                    <InitialsBadge class="badge" :name="contactData.name" size="large"
                        :colorCode="initialData.colorcode" />
                    <div class="contact-management-form-body-inputs">
                        <TheInput name="name" icon="person" v-model="contactData.name" />
                        <TheInput name="email" icon="email" type="email" v-model="contactData.email" />
                        <TheInput name="phone" icon="phone" type="tel" v-model="contactData.phone" />
                    </div>
                </div>
                <div class="contact-management-form-body-inputs-buttons">
                    <TheButton theme="light" @click="onCancelClick">Cancel</TheButton>
                    <TheButton type="submit">Save</TheButton>
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
import CloseIcon from '@/components/molecules/CloseIcon.vue';

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
    position: relative;
    border-radius: 16px;
    height: 420px;
    width: 1000px;

    @media (max-width: $breakpoint-lg) {
        @include flex($direction: column);
        width: 520px;
        height: 100%;
        max-height: calc(100vh - 32px);
        overflow: hidden;
    }

    @media (max-width: $breakpoint-md) {
        width: 300px;
    }

    .close-icon {
        position: absolute;
        z-index: 1;
        top: 32px;
        right: 32px;

        @media (max-width: $breakpoint-lg) {
            top: 16px;
            right: 16px;
        }
    }

    .contact-management-form-header {
        @include flex($direction: column, $align: start);
        gap: 24px;
        background-color: $primary-color;
        border-radius: 16px 0 0 16px;
        padding: 32px;
        height: 100%;
        width: 33%;

        @media (max-width: $breakpoint-lg) {
            position: relative;
            border-radius: 16px 16px 0 0;
            padding: 64px 24px;
            width: 100%;

            .logo {
                display: none;
            }

        }

        h1 {
            font-family: Inter;
            color: $basic-white;

            @media (max-width: $breakpoint-lg) {
                font-size: 48px;
            }

            @media (max-width: $breakpoint-md) {
                font-size: 32px;
            }
        }
    }

    .contact-management-form-body {
        @include flex($justify: start);
        background-color: $basic-white;
        border-radius: 0 16px 16px 0;
        position: relative;
        gap: 48px;
        padding: 32px;
        height: 100%;
        width: 67%;

        @media (max-width: $breakpoint-lg) {
            padding: 64px 24px 24px 24px;
            border-radius: 0px 0 16px 16px;
            width: 100%;
        }

        form {
            width: 100%;
        }

        .contact-management-form-body-header {
            @include flex($justify: space-between);
            gap: 24px;

            @media (max-width: $breakpoint-lg) {
                .badge {
                    position: absolute;
                    z-index: 1;
                    left: 50%;
                    top: 0;
                    transform: translateX(-50%) translateY(-50%);
                }
            }
        }

        .contact-management-form-body-inputs {
            @include flex($align: end, $direction: column);
            gap: 24px;
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