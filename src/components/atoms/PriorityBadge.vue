<template>
    <div class="priority-badge">
        <component :is="priorityIcon" />
    </div>
</template>
<script setup>
import { computed } from 'vue';
import IconPriorityHigh from '@/components/icons/IconPriorityHigh.vue';
import IconPriorityHighWhite from '@/components/icons/IconPriorityHighWhite.vue';
import IconPriorityMedium from '@/components/icons/IconPriorityMedium.vue';
import IconPriorityMediumWhite from '@/components/icons/IconPriorityMediumWhite.vue';
import IconPriorityLow from '@/components/icons/IconPriorityLow.vue';
import IconPriorityLowWhite from '@/components/icons/IconPriorityLowWhite.vue';

const props = defineProps({
    priority: {
        type: String,
        required: true,
        validator: function (value) {
            return ['low', 'medium', 'high'].indexOf(value) !== -1
        }
    },
    size: {
        type: String,
        default: "medium",
        validator: function (value) {
            return ['small', 'medium'].indexOf(value) !== -1
        }
    },
    status: {
        type: String,
        default: "inactive",
        validator: function (value) {
            return ['active', 'inactive'].indexOf(value) !== -1
        }
    }
});

const priorityIcon = computed(() => {
    const isActive = props.status === 'active';
    const icons = {
        high: isActive ? IconPriorityHighWhite : IconPriorityHigh,
        medium: isActive ? IconPriorityMediumWhite : IconPriorityMedium,
        low: isActive ? IconPriorityLowWhite : IconPriorityLow
    };
    return icons[props.priority];
});

</script>
<style lang="scss">
.priority-badge {
    @include flex();
    width: 20px;
    height: 20px;
}
</style>