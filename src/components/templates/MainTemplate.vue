<script setup>
import { RouterView } from 'vue-router'
import TheHeader from '@/components/organisms/TheHeader.vue'
import NavBar from '@/components/organisms/NavBar.vue'
</script>

<template>
    <div class="main-template">
        <TheHeader />
        <div class="main-template-content">
            <NavBar />
            <div class="page-content">
                <RouterView class="router" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-template {
    @include flex($direction: column);
    height: 100vh;
}

.main-template-content {
    flex: 1;
    width: 100%;
    @include flex($align: flex-start);
    overflow: hidden;

    .page-content {
        width: 100%;
        height: 100%;
        padding: 24px;
        overflow-y: scroll;
    }
}
</style>
