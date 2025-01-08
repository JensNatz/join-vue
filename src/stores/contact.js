import { defineStore } from 'pinia'
import { loadFromDatabase, postToDatabase, updateOnDatabase, deleteFromDatabase } from '@/services/databaseService';

export const useContactStore = defineStore('contact', {
  state: () => ({ contacts: {}, currentContactId: null, sortedContacts: {} }),
  getters: {
    getContactsSortedByLetter: (state) => {
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const result = {};

      alphabet.forEach(letter => {
        result[letter] = [];
      });

      Object.entries(state.contacts).forEach(([id, contact]) => {
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
        result[letter].sort((a, b) => a.name.localeCompare(b.name, 'de'));
      });

      return result;
    },

    getContactsSortedByAlphabet: (state) => {
      return Object.entries(state.contacts)
        .map(([id, contact]) => ({
          id,
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          colorcode: contact.colorcode
        }))
        .sort((a, b) => a.name.localeCompare(b.name, 'de'));
    }
  },
  actions: {
    async fetchContacts() {
      const contacts = await loadFromDatabase('contacts');
      this.contacts = contacts;
    },

    setCurrentContactId(id) {
      this.currentContactId = id;
    },

    clearCurrentContactId() {
      this.currentContactId = null;
    },

    getContactInfoById(contactId) {
      return {
        id: contactId,
        ...this.contacts[contactId]
      };
    },
    
    addToContacts(contact) {
      this.contacts[contact.id] = contact;
    },

    deleteContactById(contactId) {
      delete this.contacts[contactId];
    },

    async deleteContact(contactId) {
      const contactBackup = { ...this.contacts[contactId] };
      this.deleteContactById(contactId);
      this.clearCurrentContactId();

      try {
        await deleteFromDatabase(`contacts/${contactId}`);
        return { success: true };
      } catch (error) {
        this.addToContacts(contactBackup);
        return { success: false, error: error.message };
      }
    },

    async updateContact(updatedContact) {
      const previousContact = { ...this.contacts[updatedContact.id] };
      this.contacts[updatedContact.id] = updatedContact;

      try {
        await updateOnDatabase(`contacts/${updatedContact.id}`, updatedContact);
        return { success: true };
      } catch (error) {
        this.contacts[updatedContact.id] = previousContact;
        return { success: false, error: error.message };
      }
    },

    async addContact(contactData) {
      try {
        const response = await postToDatabase('contacts', contactData);
        const newContactId = response.name;
        const newContact = { ...contactData, id: newContactId };
        this.addToContacts(newContact);
        this.setCurrentContactId(newContactId);
        return { success: true, contactId: newContactId };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  }
})