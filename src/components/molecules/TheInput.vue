<template>
    <div class="the-input">
        <Field v-model="modelValue" :type="type" :name="name" :class="{ 'has-icon': props.icon }" />
        <component :is="iconComponent" class="input-icon" />
        <ErrorMessage class="error-message" :name="name" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { Field, ErrorMessage } from 'vee-validate'
import IconPerson from '../icons/IconPerson.vue';
import IconEmail from '../icons/IconEmail.vue';
import IconPhone from '../icons/IconPhone.vue';

const modelValue = defineModel()

const props = defineProps({
    name: {
        type: String,
        required: false
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
            'hidden'
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
            return null; // Wenn kein Icon gesetzt ist
    }
})


</script>
<style lang="scss">
.the-input {
    position: relative;
    width: 100%;
    height: 48px;

    input {
        width: 100%;
        height: 48px;
        border-bottom: 1px solid $basic-grey;
        padding: 0 12px;
        font-size: 20px;

        &.has-icon {
            padding-right: 56px;
        }
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
