<template>
    <div class="priority-button" :class="{ 'is-selected': isSelected, [priority]: true }" @click="$emit('click')">
        {{ priorityLabel }}
        <component :is="iconComponent" :class="['icon', priority]"></component>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import IconPriorityHigh from '@/components/icons/IconPriorityHigh.vue';
import IconPriorityMedium from '@/components/icons/IconPriorityMedium.vue';
import IconPriorityLow from '@/components/icons/IconPriorityLow.vue';

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

const iconComponent = computed(() => {
    return {
        'low': IconPriorityLow,
        'medium': IconPriorityMedium,
        'high': IconPriorityHigh
    }[props.priority]
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

    .icon {
        width: 20px;
        height: 15px;

        &.low {
            color: $priority-low;
        }

        &.medium {
            color: $priority-medium;
        }

        &.high {
            color: $priority-high;
        }
    }

    &.is-selected {
        color: $basic-white;
        font-weight: 700;

        .icon {
            color: $basic-white;
        }

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