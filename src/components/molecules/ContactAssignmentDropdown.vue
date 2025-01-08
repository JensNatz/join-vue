<template>
    <div class="contact-assignment-dropdown" @click="toggleDropdown" v-click-outside="hideDropdown">
        <TheLabel :label="label" :htmlFor="name" :marksRequired="required" class="label" />
        <div class="dropdown-header">
            <div class="dropdown-header-text">
                Select contacts to assign
            </div>
            <IconDropdownArrowDown v-if="!isActive" />
            <IconDropdownArrowUp v-else />
        </div>
        <div class="dropdown-container" :class="{ 'active': isActive }">
            <div v-for="contact in contacts" :key="contact.id" class="dropdown-item"
                @click.stop="toggleContact(contact)">
                <div class="contact-name">
                    <InitialsBadge :colorCode="contact.colorcode" :name="contact.name" size="small" />
                    {{ contact.name }}
                </div>
                <TheCheckbox :checked="selectedContacts.some(c => c.id === contact.id)"
                    @update:checked="toggleContact(contact)"
                    @mouseover="console.log('Contact:', contact.id, 'Selected:', selectedContacts.map(c => c.id))" />
            </div>
        </div>
        <div class="contacts-list">
            <div class="contact-item" v-for="(contact) in displayedContacts" :key="contact.id">
                <InitialsBadge :colorCode="contact.colorcode" :name="contact.name" size="small" />
            </div>
            <div class="contact-item" v-if="remainingContacts > 1">
                <InitialsBadge :number="remainingContacts" size="small" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import TheLabel from '@/components/atoms/TheLabel.vue';
import IconDropdownArrowDown from '@/components/icons/IconDropdownArrowDown.vue';
import IconDropdownArrowUp from '@/components/icons/IconDropdownArrowUp.vue';
import TheCheckbox from '@/components/molecules/TheCheckbox.vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import { useContactStore } from '@/stores/contact';
const contactStore = useContactStore();
const contacts = ref(contactStore.getContactsSortedByAlphabet);

const props = defineProps({
    name: {
        type: String,
        required: false
    },
    label: {
        type: String,
        required: false
    },
    required: {
        type: Boolean,
        default: false
    },
    modelValue: {
        type: Array,
        default: () => []
    }
});

const selectedContacts = ref(props.modelValue);

console.log('selectedContacts', selectedContacts.value);
watch(
    () => props.modelValue,
    (newValue) => {
        selectedContacts.value = newValue;
    }
);

const isActive = ref(false)
const toggleDropdown = () => {
    isActive.value = !isActive.value
}

const hideDropdown = () => {
    isActive.value = false
}

const emit = defineEmits(['update:selected']);

const toggleContact = (contact) => {
    const index = selectedContacts.value.findIndex(c => c.id === contact.id);
    if (index === -1) {
        selectedContacts.value.push(contact);
    } else {
        selectedContacts.value.splice(index, 1);
    }
    emit('update:selected', selectedContacts.value.map(contact => contact.id));
};

const displayedContacts = computed(() => {
    if (selectedContacts.value.length > 6) {
        return selectedContacts.value.slice(0, 5);
    }
    return selectedContacts.value.slice(0, 6);
});

const remainingContacts = computed(() => {
    return Math.max(0, selectedContacts.value.length - 5);
});

</script>
<style lang="scss" scoped>
.contact-assignment-dropdown {
    position: relative;
    width: 100%;
    background-color: $basic-white;
    cursor: pointer;

    .label {
        display: block;
        margin-bottom: 8px;
    }

    .dropdown-header {
        @include flex($justify: space-between);
        height: 48px;
        border: 1px solid $basic-grey;
        padding: 12px;
    }

    .dropdown-container {
        position: absolute;
        z-index: 1;
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
            @include flex($justify: space-between);
            height: 48px;
            width: 100%;
            background-color: $basic-white;
            padding: 12px;
            border-bottom: 1px solid $basic-grey;

            &:hover {
                background-color: $basic-grey;
            }

            .contact-name {
                @include flex($justify: start);
                gap: 8px;
            }
        }
    }

    .contacts-list {
        @include flex($justify: start);
        gap: 2px;
        padding: 8px 0;
        height: 48px;
    }
}
</style>