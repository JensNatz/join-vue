<template>
    <nav class="navbar">
        <div class="navbar-links">
            <NavLink title="Summary" :icon="IconSummary" to="/" />
            <NavLink title="Board" :icon="IconBoard" to="/board" />
            <NavLink title="Contacts" :icon="IconContacts" to="/contacts" />
        </div>
        <div class="metalinks">
            <router-link to="/">Privacy Policy</router-link>
            <router-link to="/imprint">Imprint</router-link>
        </div>
    </nav>
</template>
<script setup>
import NavLink from '../molecules/NavLink.vue'
import IconSummary from '../icons/IconSummary.vue'
import IconBoard from '../icons/IconBoard.vue'
import IconContacts from '../icons/IconContacts.vue'
</script>
<style lang="scss">
.navbar {
    @include flex($justify: space-between, $direction: column);
    box-shadow: 0px 0px 4px 0px rgba($basic-black, 0.2);
    width: 232px;
    height: 100%;
    padding: 66px 24px;

    @media (max-width: $breakpoint-lg) {
        @include flex($direction: row);
        width: 100%;
        height: 80px;
        padding: 8px 16px;
    }

    .metalinks,
    .navbar-links {
        @include flex($direction: column);
        gap: 8px
    }

    .navbar-links {
        @media (max-width: $breakpoint-lg) {
            @include flex($justify: space-between);
            width: 100%;
            height: 100%;
        }
    }

    .metalinks {
        @media (max-width: $breakpoint-lg) {
            display: none;
        }
    }


}
</style>