<template>
    <div class="the-input">
        <TheLabel v-if="label" :label="label" :htmlFor="name" :marksRequired="required" class="label" />
        <div class="input-container">
            <Field v-model="modelValue" :type="type" :name="name" :class="{ 'has-icon': props.icon }"
                :as="type === 'textarea' ? 'textarea' : 'input'" :maxlength="maxLength" />
            <component :is="iconComponent" class="input-icon" />
        </div>
        <div class="input-counter" v-if="maxLength">{{ inputLength }} / {{ maxLength }}</div>
        <ErrorMessage class="error-message" :name="name" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import TheLabel from '@/components/atoms/TheLabel.vue';
import IconPerson from '@/components/icons/IconPerson.vue';
import IconEmail from '@/components/icons/IconEmail.vue';
import IconPhone from '@/components/icons/IconPhone.vue';
import { Field, ErrorMessage } from 'vee-validate'

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
    },
    maxLength: {
        type: Number,
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

const inputLength = computed(() => modelValue.value?.length || 0)

</script>
<style lang="scss" scoped>
.the-input {
    position: relative;
    width: 100%;
    padding-bottom: 20px;

    .label {
        display: block;
        margin-bottom: 8px;
    }

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

    .input-container {
        position: relative;
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
        position: absolute;
        bottom: 0;
        left: 0;
        color: $color-error;
        font-size: 14px;
    }

    .input-counter {
        position: absolute;
        bottom: 0px;
        right: 16px;
        font-size: 12px;
    }
}
</style>
