<template>
    <div class="the-input">
        <TheLabel :label="label" :htmlFor="name" :marksRequired="required" />
        <Field v-model="modelValue" :type="type" :name="name" :class="{ 'has-icon': props.icon }"
            :as="type === 'textarea' ? 'textarea' : 'input'" />
        <component :is="iconComponent" class="input-icon" />
        <ErrorMessage class="error-message" :name="name" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate'
import TheLabel from '@/components/atoms/TheLabel.vue';
import IconPerson from '../icons/IconPerson.vue';
import IconEmail from '../icons/IconEmail.vue';
import IconPhone from '../icons/IconPhone.vue';

const modelValue = defineModel()

const props = defineProps({
    name: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    required: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'text',
        validator: (value) => [
            'text',
            'password',
            'email',
            'number',
            'tel',
            'url',
            'search',
            'date',
            'time',
            'datetime-local',
            'month',
            'week',
            'color',
            'file',
            'radio',
            'checkbox',
            'submit',
            'reset',
            'button',
            'hidden',
            'textarea'
        ].includes(value)
    },
    icon: {
        type: String,
        required: false,
        validator: (value) => ['', 'person', 'email', 'phone'].includes(value)
    },
    rules: {
        type: [String, Array],
        required: false
    }
})

const iconComponent = computed(() => {
    switch (props.icon) {
        case 'person':
            return IconPerson;
        case 'email':
            return IconEmail;
        case 'phone':
            return IconPhone;
        default:
            return null;
    }
})


</script>
<style lang="scss" scoped>
.label {
    font-size: 14px;
    padding-left: 8px;
}

.the-input {
    position: relative;
    width: 100%;

    input,
    textarea {
        width: 100%;
        border-bottom: 1px solid $basic-grey;
        padding: 12px;
        font-size: 20px;

        &.has-icon {
            padding-right: 56px;
        }
    }

    input {
        height: 48px;
    }

    textarea {
        min-height: 100px;
        resize: none;
        border: 1px solid $basic-grey;
    }

    .input-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 24px;
        width: 25px;
        height: 24px;
    }

    .error-message {
        color: $color-error;
        font-size: 14px;
    }
}
</style>
