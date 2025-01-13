<template>
    <nav class="navbar">
        <div class="navbar-links">
            <NavLink title="Dashboard" :icon="IconSummary" to="/" :active="isCurrentRoute('/')" />
            <NavLink title="Board" :icon="IconBoard" to="/board" :active="isCurrentRoute('/board')" />
            <NavLink title="Contacts" :icon="IconContacts" to="/contacts" :active="isCurrentRoute('/contacts')" />
        </div>
        <div class="metalinks">
            <router-link to="/privacy" class="metalinks-link"
                :class="{ 'active': isCurrentRoute('/privacy-policy') }">Privacy
                Policy</router-link>
            <router-link to="/imprint" class="metalinks-link"
                :class="{ 'active': isCurrentRoute('/imprint') }">Imprint</router-link>
        </div>
    </nav>
</template>
<script setup>
import { useRoute } from 'vue-router'
import NavLink from '@/components/molecules/NavLink.vue'
import IconSummary from '@/components/icons/IconSummary.vue'
import IconBoard from '@/components/icons/IconBoard.vue'
import IconContacts from '@/components/icons/IconContacts.vue'

const route = useRoute()

const isCurrentRoute = (path) => route.path === path
</script>
<style lang="scss" scoped>
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

        .metalinks-link {
            &.active {
                color: $primary-color;
                font-weight: 600;
            }
        }
    }


}
</style>