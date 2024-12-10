<template>
    <div class="contacts-list">
        <div v-for="(contacts, letter) in sortedContacts" :key="letter">
            <div v-if="contacts.length > 0">
                <AplhabeticalHeader :letter="letter" />
                <div v-for="contact in contacts" :key="contact.email">
                    <ContactEntry :contact="contact" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { loadFromDatabase } from '../../services/databaseService';
import AplhabeticalHeader from '../molecules/AplhabeticalHeader.vue';
import ContactEntry from '../molecules/ContactEntry.vue';
import { ref } from 'vue';

const contacts = ref([]);
const sortedContacts = ref([]);
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

async function getContactsFromDatabase() {
    let contactsFromDatabase = await loadFromDatabase("contacts");
    contacts.value = contactsFromDatabase;
}

getContactsFromDatabase().then(() => {
    sortContactsByAlphabet(contacts.value, alphabet);
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
    sortedContacts.value = result;
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