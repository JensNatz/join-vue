<template>
    <div v-if="overlayStore.isOverlayOpen" class="theOverlay" @click="onOverlayClick">
        <div @click.stop class="overlay-content">
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
    @include flex($direction: column, $justify: start);
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100dvw;
    height: 100dvh;
    background-color: rgba($basic-black, 0.5);
    backdrop-filter: blur(4px);
    padding: 32px;
    overflow-y: auto;
    overflow-x: hidden;

    @media (max-width: $breakpoint-md) {
        padding: 24;
    }

    @media (max-width: $breakpoint-sm) {
        padding: 16px;
    }

    .overlay-content {
        margin-top: auto;
        margin-bottom: auto;
    }
}
</style>
