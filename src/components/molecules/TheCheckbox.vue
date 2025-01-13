<template>
    <div class="the-checkbox">
        <label><span class="checkmark">
                <IconCheckboxChecked v-if="checked" />
                <IconCheckboxUnchecked v-else />
            </span>
            <input type="checkbox" :checked="checked" @change="$emit('update:checked', $event.target.checked)" />
        </label>
    </div>
</template>
<script setup>
import IconCheckboxChecked from '@/components/icons/IconCheckboxChecked.vue';
import IconCheckboxUnchecked from '@/components/icons/IconCheckboxUnchecked.vue';

const props = defineProps({
    checked: {
        type: Boolean,
        default: false
    }
});

defineEmits(['update:checked']);

</script>
<style lang="scss" scoped>
.the-checkbox {
    @include flex();

    label {
        cursor: pointer;
    }

    input {
        display: none;
    }
}
</style>