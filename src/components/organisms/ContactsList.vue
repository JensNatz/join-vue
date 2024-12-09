<template>
    <div class="contacts-list">
        <div v-for="(contacts, letter) in sortedContacts" :key="letter">
            <div v-if="contacts.length > 0">
                <h2>{{ letter }}</h2>
                <ul>
                    <li v-for="contact in contacts" :key="contact.email">
                        <p><strong>Name:</strong> {{ contact.name }}</p>
                        <p><strong>Email:</strong> {{ contact.email }}</p>
                        <p><strong>Phone:</strong> {{ contact.phone }}</p>
                        <p><strong>Color Code:</strong> {{ contact.colorcode }}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
import { loadFromDatabase } from '../../services/databaseService';
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

    Object.values(contacts).forEach(contact => {
        let firstLetter = contact.name[0].toUpperCase();
        if (firstLetter === "Ä") firstLetter = "A";
        else if (firstLetter === "Ö") firstLetter = "O";
        else if (firstLetter === "Ü") firstLetter = "U";

        if (result[firstLetter]) {
            result[firstLetter].push(contact);
        }
    });

    Object.keys(result).forEach(letter => {
        result[letter].sort((a, b) => a.name.localeCompare(b.name));
    });

    sortedContacts.value = result;
    console.log(sortedContacts.value);
}




</script>
<style lang="scss">
.contacts-list {
    width: 320px;
    height: 100%;
    box-shadow: 4px 0px 6px 0px rgba($basic-black, 0.1);
    padding: 24px;
}
</style>