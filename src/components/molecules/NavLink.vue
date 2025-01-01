<template>
    <router-link class="nav-link" :to="to">
        <component class="nav-link-icon" :is="icon" />
        {{ title }}
    </router-link>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    icon: {
        type: Object,
        required: true
    },
    to: {
        type: [String, Object],
        required: true
    }
})
</script>

<style lang="scss">
.nav-link {
    @include flex($justify: start);
    gap: 16px;
    width: 186px;
    height: 40px;
    padding: 8px 32px;
    border-radius: 8px;
    color: $basic-dark;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        color: inherit;
        background-color: $primary-color-light;
    }

    @media (max-width: $breakpoint-lg) {
        @include flex();
        height: 100%;
        width: auto;
        flex: 1;
        padding: 4px 16px;
    }

    @media (max-width: $breakpoint-md) {
        @include flex($direction: column);
        gap: 4px;
        font-size: 14px;

        .nav-link-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
        }
    }
}
</style>