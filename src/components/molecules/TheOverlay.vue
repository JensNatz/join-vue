<template>
    <div class="theOverlay" @click="onOverlayClick">
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($basic-black, 0.5);
    backdrop-filter: blur(4px);
    padding: 32px;
}
</style>