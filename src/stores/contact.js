import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({ currentContactId: null, sortedContacts: {} }),
  actions: {
    setCurrentContactId(id) {
      this.currentContactId = id;
    },

    clearCurrentContactId() {
      this.currentContactId = null;
    },

    setSortedContacts(sortedContacts) {
      this.sortedContacts = sortedContacts;
    },

    getContactInfoById(contactId) {
      for (const letter in this.sortedContacts) {
        const contacts = this.sortedContacts[letter];
    
        if (contacts.length > 0) {
          const contact = contacts.find(c => c.id === contactId);
          if (contact) {
            return contact;
          }
        }
      }
      return null;
    },
    //TO DO: sollte auch Umllaurte berücksichtigen wie Ä, Ö, Ü, etc.
    addToSortedContacts(contact) {
      const firstLetter = contact.name[0].toUpperCase();
      const contacts = this.sortedContacts[firstLetter];
      const index = contacts.findIndex(existingContact => contact.name.localeCompare(existingContact.name) < 0);
    
      if (index === -1) {
        contacts.push(contact);
      } else {
        contacts.splice(index, 0, contact);
      }
    
      return true; 
    },

    deleteContactById(contactId) {
      for (const letter in this.sortedContacts) {
        const contacts = this.sortedContacts[letter];
    
        if (contacts.length > 0) {
          const index = contacts.findIndex(c => c.id === contactId);
    
          if (index !== -1) {
            contacts.splice(index, 1);
            return true; 
          }
        }
      }
      return false;
    },

    updateContact(updatedContact) {
      const deleted = this.deleteContactById(updatedContact.id);
      if (!deleted) {
        return false;
      }
      return this.addToSortedContacts(updatedContact);
    }
  }
})
