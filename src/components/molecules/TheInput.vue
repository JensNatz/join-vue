<template>
    <div class="the-input">
        <input v-model="modelValue" :type="type" :pattern="pattern" id="name" />
        <component :is="iconComponent" class="input-icon" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import IconPerson from '../icons/IconPerson.vue';
import IconEmail from '../icons/IconEmail.vue';
import IconPhone from '../icons/IconPhone.vue';

const modelValue = defineModel()

const props = defineProps({
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
        default: '',
        validator: (value) => ['', 'person', 'email', 'phone'].includes(value)
    },
    pattern: {
        type: String,
        default: ''
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
        padding: 0 56px 0 24px;
        font-size: 20px;
    }

    .input-icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 24px;
        width: 25px;
        height: 24px;
    }
}
</style>
