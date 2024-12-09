<template>
    <router-link :to="`/contacts/${contact.id}`" class="contact-entry">
        <InitialsBadge :name="contact.name" :colorCode="contact.colorcode" />
        <div>
            <p>{{ contact.name }}</p>
            <p v-if="contact.email">{{ contact.email }}</p>
        </div>
    </router-link>
</template>
<script setup>
import InitialsBadge from '../atoms/InitialsBadge.vue';
const props = defineProps({
    contact: {
        type: Object,
        required: true
    }
})
</script>
<style lang="scss">
.contact-entry {
    @include flex($justify: start);
    padding: 8px 16px;
    gap: 24px;

    &:hover {
        background-color: $primary-color;
        border-radius: 8px;
        color: $basic-white;
    }
}
</style>
