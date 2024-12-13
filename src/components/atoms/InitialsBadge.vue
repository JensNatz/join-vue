<template>
    <div class="initials-badge" :class="[size, initials ? badgeColor : '']">
        <template v-if="initials">
            {{ initials }}
        </template>
        <template v-else>
            <IconPersonWhite />
        </template>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import IconPersonWhite from '@/components/icons/IconPersonWhite.vue';

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    colorCode: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        default: "medium",
        validator: function (value) {
            return ['small', 'medium', 'large'].indexOf(value) !== -1
        }
    }
});

const initials = computed(() => {
    const names = props.name.split(' ');
    return names.map(n => n[0]).slice(0, 2).join('').toUpperCase();
});

const badgeColor = computed(() => {
    return `color-${props.colorCode + 1}`;
});

</script>
<style lang="scss">
.initials-badge {
    @include flex();
    flex-shrink: 0;
    border-radius: 50%;
    color: $basic-white;
    background-color: $basic-grey;
    font-family: 'Inter';
}

.small {
    font-size: 12px;
    height: 32px;
    width: 32px;
    border: 1px solid $basic-white;
}

.medium {
    font-size: 16px;
    height: 42px;
    width: 42px;
    border: 2px solid $basic-white;
}

.large {
    font-size: 48px;
    font-weight: 500;
    height: 120px;
    width: 120px;
    border: 3px solid $basic-white;
    box-shadow: 0px 0px 4px 0px rgba($basic-black, 0.16);
}

.color-1 {
    background-color: $badge-color-1;
}

.color-2 {
    background-color: $badge-color-2;
}

.color-3 {
    background-color: $badge-color-3;
}

.color-4 {
    background-color: $badge-color-4;
}

.color-5 {
    background-color: $badge-color-5;
}

.color-6 {
    background-color: $badge-color-6;
}

.color-7 {
    background-color: $badge-color-7;
}

.color-8 {
    background-color: $badge-color-8;
}

.color-9 {
    background-color: $badge-color-9;
}
</style>