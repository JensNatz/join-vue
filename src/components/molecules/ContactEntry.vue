<template>
    <div :class="contactClasses" @click="onContactClick">
        <InitialsBadge :name="contact.name" :colorCode="contact.colorcode" />
        <div class="contact-entry-info">
            <span class="contact-entry-name">{{ stringService.truncate(contact.name, 15) }}</span>
            <span class="contact-entry-email" v-if="contact.email">{{ stringService.truncate(contact.email, 20)
                }}</span>
        </div>
    </div>
</template>
<script setup>
import InitialsBadge from '../atoms/InitialsBadge.vue';
import { stringService } from '@/services/stringService';
import { useContactStore } from '@/stores/contact';
import { computed } from 'vue';

const contactStore = useContactStore();
const props = defineProps({
    contact: {
        type: Object,
        required: true
    }
});

const contactClasses = computed(() => ({
    'contact-entry': true,
    'active': props.contact.id === contactStore.currentContactId
}));

const onContactClick = () => {
    contactStore.setCurrentContactId(props.contact.id);
};
</script>
<style lang="scss" scoped>
.contact-entry {
    @include flex($justify: start);
    cursor: pointer;
    padding: 8px 16px;
    gap: 24px;
    border-radius: 8px;

    &:hover {
        background-color: $primary-color-light;
    }

    .contact-entry-info {
        @include flex($align: start, $direction: column);
        gap: 2px;

        .contact-entry-name {
            font-size: 18px;
            color: $basic-black;
        }

        .contact-entry-email {
            font-size: 14px;
            color: $primary-color;
        }
    }

    &.active {
        background-color: $secondary-color;

        .contact-entry-name,
        .contact-entry-email {
            color: $basic-white;
        }
    }
}
</style>
