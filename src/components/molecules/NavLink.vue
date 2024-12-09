<template>
    <router-link class="nav-link" :to="to">
        <component :is="icon" />
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
    gap: 8px;
    width: 186px;
    height: 40px;
    padding: 8px 32px;
    border-radius: 8px;
    color: $basic-dark;
    cursor: pointer;

    &:hover {
        color: inherit;
        background-color: $primary-color-light;
    }
}
</style>