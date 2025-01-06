<template>
    <div class="the-dropdown" @click="toggleDropdown" v-click-outside="hideDropdown">
        <TheLabel :label="label" :htmlFor="name" :marksRequired="required" />
        <div class="dropdown-header">
            <div class="dropdown-header-text">{{ selectedOption ? selectedOption : 'Select task category' }}</div>
            <IconDropdownArrowDown v-if="!isActive" />
            <IconDropdownArrowUp v-else />
        </div>
        <div class="dropdown-container" :class="{ 'active': isActive }">
            <div class="dropdown-item" v-for="option in options" :value="option" :key="option"
                @click.stop="selectOption(option)">{{ option }}</div>
        </div>
    </div>
</template>
<script setup>
import TheLabel from '@/components/atoms/TheLabel.vue';
import { ref } from 'vue';
import { vClickOutside } from '@/directives/click-outside';
import IconDropdownArrowDown from '@/components/icons/IconDropdownArrowDown.vue';
import IconDropdownArrowUp from '@/components/icons/IconDropdownArrowUp.vue';
const props = defineProps({
    name: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    options: {
        type: Array,
        required: true
    },
    required: {
        type: Boolean,
        default: false
    }
})

const isActive = ref(false)
const selectedOption = ref(null)
const toggleDropdown = () => {
    isActive.value = !isActive.value
}

const hideDropdown = () => {
    isActive.value = false
}

const selectOption = (option) => {
    selectedOption.value = option
    hideDropdown()
}

</script>
<style lang="scss" scoped>
.the-dropdown {
    position: relative;
    width: 100%;
    background-color: $basic-white;
    cursor: pointer;

    .dropdown-header {
        @include flex($justify: space-between);
        height: 48px;
        border: 1px solid $basic-grey;
        padding: 12px;
    }

    .dropdown-container {
        position: absolute;
        width: 100%;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.125s ease-out;

        &.active {
            background-color: $basic-grey;
            max-height: 148px;
            overflow-y: auto;
            border: 1px solid $basic-grey;
            border-top: none;
        }

        .dropdown-item {
            height: 48px;
            width: 100%;
            background-color: $basic-white;
            padding: 12px;
            border-bottom: 1px solid $basic-grey;


            &:hover {
                background-color: $basic-grey;
            }


        }
    }
}
</style>