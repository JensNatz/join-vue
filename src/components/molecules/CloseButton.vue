<template>
    <div class="close-icon" @click="onCloseClick">
        <IconClose />
    </div>
</template>
<script setup>
import { useOverlayStore } from '@/stores/overlay';
import IconClose from '@/components/icons/IconClose.vue';

const overlayStore = useOverlayStore();

const onCloseClick = () => {
    overlayStore.toggleOverlay();
};
</script>
<style lang="scss">
.close-icon {
    @include flex();
    cursor: pointer;
    padding: 6px;
    border-radius: 50%;
    width: 24px;
    height: 24px;

    &:hover {
        background-color: rgba($primary-color, 0.1);
    }

    @media (max-width: $breakpoint-lg) {
        .icon {
            color: $basic-white;
        }
    }
}
</style>
