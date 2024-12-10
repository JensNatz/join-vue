<template>
    <router-link :to="`/contacts/details`" class="contact-entry" @click="onContactClick">
        <InitialsBadge :name="contact.name" :colorCode="contact.colorcode" />
        <div class="contact-entry-info">
            <span class="contact-entry-name">{{ contact.name }}</span>
            <span class="contact-entry-email" v-if="contact.email">{{ contact.email }}</span>
        </div>
    </router-link>
</template>
<script setup>
import InitialsBadge from '../atoms/InitialsBadge.vue';
import { useContactStore } from '@/stores/contact';

const contactStore = useContactStore();
const props = defineProps({
    contact: {
        type: Object,
        required: true
    }
});

const onContactClick = () => {
    contactStore.setContact(props.contact);
};
</script>
<style lang="scss">
.contact-entry {
    @include flex($justify: start);
    padding: 8px 16px;
    gap: 24px;

    &:hover {
        background-color: $primary-color-light;
        border-radius: 8px;
        color: $basic-white;
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
}
</style>
