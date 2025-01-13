<template>
    <div class="contacts-list">
        <!-- TODO: suspense während kontakte geladen werden -->
        <div v-for="(contacts, letter) in sortedContacts" :key="letter">
            <div v-if="contacts.length > 0">
                <AlphabeticalHeader :letter="letter" />
                <div v-for="contact in contacts" :key="contact.email">
                    <ContactEntry :contact="contact" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import AlphabeticalHeader from '@/components/molecules/AlphabeticalHeader.vue';
import ContactEntry from '@/components/molecules/ContactEntry.vue';
import { useContactStore } from '@/stores/contact';


const contactStore = useContactStore();
contactStore.fetchContacts();
const sortedContacts = computed(() => contactStore.getContactsSortedByLetter);

</script>
<style lang="scss" scoped>
.contacts-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 8px;
}
</style>