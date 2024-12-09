<template>
    <nav class="navbar">
        <div class="navbar-links">
            <NavLink title="Summary" />
            <NavLink title="Board" />
            <NavLink title="Contacts" />
        </div>
        <div>
            Footer Links 1 und 2
        </div>
    </nav>
</template>
<script setup>
import NavLink from '../molecules/NavLink.vue'
</script>
<style lang="scss">
.navbar {
    @include flex($justify: space-between, $direction: column);
    box-shadow: 0px 0px 4px 0px rgba($basic-black, 0.2);
    width: 232px;
    height: 100%;
    padding: 66px 24px;
}
</style>