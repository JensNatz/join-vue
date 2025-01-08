<template>
    <div class="priority-button" :class="{ 'is-selected': isSelected, [priority]: true }" @click="$emit('click')">
        <span class="priority-label">{{ priorityLabel }}</span>
        <PriorityBadge :priority="priority" :status="isSelected ? 'active' : 'inactive'" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import PriorityBadge from '@/components/atoms/PriorityBadge.vue';

const props = defineProps({
    priority: {
        type: String,
        required: true,
        validator: function (value) {
            return ['low', 'medium', 'high'].indexOf(value) !== -1
        }
    },
    isSelected: {
        type: Boolean,
        default: false
    }
})

const priorityLabel = computed(() => {
    return props.priority.charAt(0).toUpperCase() + props.priority.slice(1);
})


</script>
<style lang="scss" scoped>
.priority-button {
    @include flex();
    gap: 8px;
    cursor: pointer;
    border-radius: 16px;
    font-size: 20px;
    width: 100%;
    height: 56px;
    padding: 12px 16px;
    box-shadow: 0px 0px 4px 0px rgba($basic-black, 0.1);

    &:hover {
        box-shadow: 0px 4px 8px 0px rgba($basic-black, 0.2);
    }

    .priority-label {
        @media (max-width: $breakpoint-sm) {
            display: none;
        }
    }

    .icon {
        width: 20px;
        height: 15px;
    }

    &.is-selected {
        color: $basic-white;
        font-weight: 700;

        &.low {
            background-color: $priority-low;
        }

        &.medium {
            background-color: $priority-medium;
        }

        &.high {
            background-color: $priority-high;
        }
    }
}
</style>