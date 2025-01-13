<template>
    <div class="static-template">
        <div class="head-area">
            <h1>
                <slot name="heading"></slot>
            </h1>
            <router-link to="/">
                <IconArrowLeft />
            </router-link>
        </div>
        <main>
            <slot name="content"></slot>
        </main>
    </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
</script>
<style lang="scss" scoped>
.static-template {

    padding: 24px;

    .head-area {
        @include flex($justify: space-between);
    }

    main {
        padding: 24px 0;
    }
}
</style>