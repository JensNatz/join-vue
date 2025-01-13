<template>
    <div class="alphabetical-header">
        <h2>{{ letter }}</h2>
    </div>
</template>
<script setup>
const props = defineProps({
    letter: {
        type: String,
        required: true
    }
})
</script>
<style lang="scss" scoped>
.alphabetical-header {
    @include flex($justify: start);
    width: 100%;
    padding: 16px 32px;
    border-bottom: 1px solid $basic-grey;

    h2 {
        font-weight: 400;
        font-size: 18px;
        color: $basic-black;
    }
}
</style>
