<template>
    <header class="the-header">
        <IconLogoWhite class="the-header-logo" />
        <div class="the-header-title">
            Kanban Project Management Tool
        </div>
    </header>
</template>
<script setup>
import IconLogoWhite from '@/components/icons/IconLogoWhite.vue'
</script>
<style lang="scss" scoped>
.the-header {
    background-color: $primary-color;
    box-shadow: 0px 4px 4px 0px rgba($basic-black, 0.1);
    color: $basic-white;
    @include flex($justify: space-between);
    width: 100%;
    height: 96px;
    padding: 20px 48px;

    @media (max-width: $breakpoint-lg) {
        height: 80px;
        padding: 0px 16px;
    }

    .the-header-logo {
        @media (max-width: $breakpoint-lg) {
            width: 40px;
            height: 40px;
        }
    }

    .the-header-title {
        @media (max-width: $breakpoint-sm) {
            display: none;
        }
    }
}
</style>
