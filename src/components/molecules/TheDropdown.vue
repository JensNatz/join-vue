<template>
    <div class="the-dropdown">
        <TheLabel :label="label" :htmlFor="name" :marksRequired="required" />
        <select v-model="modelValue" :name="name">
            <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
        </select>
    </div>
</template>
<script setup>
import TheLabel from '@/components/atoms/TheLabel.vue';

const modelValue = defineModel()

const props = defineProps({
    name: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    options: {
        type: Array,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    }
})

</script>
<style lang="scss" scoped>
.label {
    font-size: 14px;
    padding-left: 8px;
}

.the-dropdown {
    position: relative;
    width: 100%;

    select {
        width: 100%;
        padding: 12px;
        font-size: 20px;
    }
}
</style>
