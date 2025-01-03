<template>
    <label class="the-label" :for="htmlFor">
        {{ label }}
        <span v-if="marksRequired" class="required">*</span>
    </label>
</template>
<script setup>
defineProps({
    label: {
        type: String,
        required: true
    },
    htmlFor: {
        type: String,
        required: true
    },
    marksRequired: {
        type: Boolean,
        default: false
    }
})
</script>
<style lang="scss" scoped>
.the-label {
    font-size: 14px;
    padding-left: 8px;
}

.required {
    color: $color-required;
}
</style>