<template>
    <div class="task-category-badge" :class="categoryClass">
        {{ category }}
    </div>
</template>

<script setup>
import { computed } from 'vue';
const CATEGORY_CLASSES = {
    'Technical Task': 'technical',
    'User Story': 'user-story',
    'Bug': 'bug',
    'Other': 'other'
};

const props = defineProps({
    category: {
        type: String,
        required: true
    }
});

const categoryClass = computed(() => CATEGORY_CLASSES[props.category]);
</script>

<style lang="scss">
.task-category-badge {
    border-radius: 10px;
    padding: 4px 8px;
    color: $basic-white;
    font-size: 12px;
    font-weight: 600;

    &.technical {
        background-color: $task-category-1;
    }

    &.user-story {
        background-color: $task-category-2;
    }

    &.bug {
        background-color: $task-category-3;
    }

    &.other {
        background-color: $task-category-4;
    }
}
</style>
