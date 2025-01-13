<template>
    <div :class="['toast-message', theme, { visible: isVisible }]">
        {{ message }}
    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useToastStore } from '@/stores/toast';

const toastStore = useToastStore();
const isVisible = computed(() => toastStore.isVisible);
const message = computed(() => toastStore.message);
const theme = computed(() => toastStore.theme);

</script>
<style lang="scss" scoped>
.toast-message {
    position: fixed;
    top: 66%;
    transform: translateY(-50%);
    right: -100%;
    z-index: 1000;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba($basic-black, 0.1);
    transition: all 0.125s ease-in-out;
    opacity: 0;
    color: $basic-white;
    font-size: 16px;
    font-weight: 700;

    &.visible {
        opacity: 1;
        right: 20px;
    }

    &.success {
        background-color: $color-success;
    }

    &.error {
        background-color: $color-error;
    }
}
</style>
