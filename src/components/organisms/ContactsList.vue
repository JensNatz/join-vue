<template>
    <div class="contacts-list">
        <div v-for="(contacts, letter) in contacts" :key="letter">
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
import { ref, onBeforeMount } from 'vue';
import { useContactStore } from '@/stores/contact';
import { loadFromDatabase } from '../../services/databaseService';
import AlphabeticalHeader from '../molecules/AlphabeticalHeader.vue';
import ContactEntry from '../molecules/ContactEntry.vue';


const contacts = ref([]);
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

async function getContactsFromDatabase() {
    let contactsFromDatabase = await loadFromDatabase("contacts");
    return contactsFromDatabase;
}

onBeforeMount(async () => {
    const contactStore = useContactStore();
    const contactsFromDatabase = await getContactsFromDatabase();
    const sortedContacts = sortContactsByAlphabet(contactsFromDatabase, alphabet);
    contactStore.setSortedContacts(sortedContacts);
    contacts.value = contactStore.sortedContacts;
});

function sortContactsByAlphabet(contacts, alphabet) {
    const result = {};

    alphabet.forEach(letter => {
        result[letter] = [];
    });

    Object.entries(contacts).forEach(([id, contact]) => {
        let firstLetter = contact.name[0].toUpperCase();
        if (firstLetter === "Ä") firstLetter = "A";
        else if (firstLetter === "Ö") firstLetter = "O";
        else if (firstLetter === "Ü") firstLetter = "U";

        if (result[firstLetter]) {
            contact.id = id;
            result[firstLetter].push(contact);
        }
    });

    Object.keys(result).forEach(letter => {
        result[letter].sort((a, b) => a.name.localeCompare(b.name));
    });
    return result;
}
</script>
<style lang="scss">
.contacts-list {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 8px;
}
</style>