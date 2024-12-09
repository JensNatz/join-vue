<template>
    <div class="nav-link">
        {{ title }}
    </div>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>
<style lang="scss">
.nav-link {
    @include flex();
    width: 186px;
    height: 40px;
    padding: 8px 32px;
    border-radius: 8px;
    color: $basic-dark;
    cursor: pointer;

    &:hover {
        background-color: $primary-color-light;
    }
}
</style>