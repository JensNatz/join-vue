<template>
    <header class="the-header">
        <IconLogoWhite />
        <div>
            Kanban Project Management Tool
        </div>
    </header>
</template>
<script setup>
import IconLogoWhite from '../icons/IconLogoWhite.vue'
</script>
<style lang="scss">
.the-header {
    background-color: $primary-color;
    box-shadow: 0px 4px 4px 0px rgba($basic-black, 0.1);
    color: $basic-white;
    @include flex($justify: space-between);
    width: 100%;
    height: 96px;
    padding: 20px 48px;
}
</style>