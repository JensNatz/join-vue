<template>
    <div v-if="overlayStore.isOverlayOpen" class="theOverlay" @click="onOverlayClick">
        <div @click.stop>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { useOverlayStore } from '@/stores/overlay';

const overlayStore = useOverlayStore();

const onOverlayClick = () => {
    overlayStore.toggleOverlay();
};
</script>
<style lang="scss">
.theOverlay {
    @include flex();
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($basic-black, 0.5);
    backdrop-filter: blur(4px);
    padding: 32px;

    @media (max-width: $breakpoint-md) {
        padding: 24;
    }

    @media (max-width: $breakpoint-sm) {
        padding: 16px;
    }
}
</style>