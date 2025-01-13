<template>
    <div class="close-icon" @click="onCloseClick">
        <IconClose :class="theme" />
    </div>
</template>
<script setup>
import IconClose from '@/components/icons/IconClose.vue';
import { useOverlayStore } from '@/stores/overlay';

const props = defineProps({
    theme: {
        type: String,
        default: 'dark',
        validator: (value) => ['light', 'dark'].includes(value)
    }
})

const overlayStore = useOverlayStore();

const onCloseClick = () => {
    overlayStore.toggleOverlay();
};
</script>
<style lang="scss" scoped>
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
        .light {
            color: $basic-white;
        }
    }
}
</style>
