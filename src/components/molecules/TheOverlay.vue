<template>
    <div class="theOverlay">
        <slot></slot>
    </div>
</template>
<script setup>

</script>
<style lang="scss">
.theOverlay {
    @include flex();
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($basic-black, 0.5);
    backdrop-filter: blur(4px);
    padding: 32px;
}
</style>