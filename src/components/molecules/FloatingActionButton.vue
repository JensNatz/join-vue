<template>
    <div class="floating-action-button">
        <component :is="iconComponent" class="icon" />
    </div>
</template>

<script setup>
import { computed } from 'vue';
import IconAddContact from '@/components/icons/IconAddContact.vue';
import IconOptions from '@/components/icons/IconOptions.vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    }
});

const iconComponent = computed(() => ({
    'addContact': IconAddContact,
    'options': IconOptions
}[props.type] || IconAddContact));

</script>

<style lang="scss">
.floating-action-button {
    @include flex();
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: $primary-color;
    cursor: pointer;

    @media (max-width: $breakpoint-sm) {
        width: 48px;
        height: 48px;
    }

    &:hover {
        background-color: $secondary-color;
    }

    .icon {
        @include flex();
        width: 32px;
        height: 32px;

        @media (max-width: $breakpoint-sm) {
            width: 24px;
            height: 24px;
        }
    }
}
</style>
