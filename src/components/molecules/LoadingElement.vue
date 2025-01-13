<template>
    <div class="loading-element">
        <div class="rectangle"></div>
        <div class="rectangle"></div>
        <div class="rectangle"></div>
    </div>
</template>

<style lang="scss" scoped>
.loading-element {
    display: flex;
    gap: 8px;
    align-items: center;
}

.rectangle {
    width: 8px;
    height: 8px;
    animation: fill 1s infinite;

    &:nth-child(2) {
        animation-delay: 0.2s;
    }

    &:nth-child(3) {
        animation-delay: 0.4s;
    }
}

@keyframes fill {
    0% {
        background-color: transparent;
    }

    50% {
        background-color: $primary-color;
    }

    100% {
        background-color: transparent;
    }
}
</style>
