<template>
    <button class="the-button" :class="[theme, size]">
        <slot>Submit</slot>
        <slot name="icon" class="icon"></slot>
    </button>
</template>
<script setup>
defineProps({
    size: {
        type: String,
        default: "medium",
        validator: (value) => ["small", "medium", "large"].includes(value)
    },
    theme: {
        type: String,
        default: "dark",
        validator: (value) => ["light", "dark"].includes(value)
    }
})
</script>
<style lang="scss" scoped>
button {
    @include flex();
    gap: 8px;
    cursor: pointer;
    border-radius: 8px;
    border: none;
    width: 100%;

    &:hover {
        box-shadow: 0px 4px 8px 0px rgba($basic-black, 0.2);
    }
}

.small {
    padding: 12px 16px;
    font-size: 16px;

    @media (max-width: $breakpoint-md) {
        font-size: 14px;
        padding: 8px 12px;
    }

    .icon {
        width: 12px;
        height: 12px;
    }
}

.medium {
    font-size: 20px;
    height: 48px;
    font-weight: 700;
    padding: 12px 24px;

    @media (max-width: $breakpoint-md) {
        font-size: 16px;
        height: 40px;
        padding: 8px 16px;
    }

    .icon {
        width: 20px;
        height: 20px;
    }
}

.large {
    font-size: 24px;
    height: 60px;
    font-weight: 700;
    padding: 12px 24px;

    @media (max-width: $breakpoint-md) {
        font-size: 20px;
        height: 48px;
        padding: 8px 16px;
    }

    .icon {
        width: 24px;
        height: 24px;
    }
}


.light {
    background-color: $basic-white;
    color: $basic-dark;
    border: 1px solid $basic-dark;

    &:hover {
        color: $primary-color;
        border-color: $primary-color;
    }
}

.dark {
    background-color: $primary-color;
    color: $basic-white;

    &:hover {
        background-color: $secondary-color;

    }

}
</style>