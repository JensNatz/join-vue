import { defineStore } from 'pinia'

export const useContactStore = defineStore('contact', {
  state: () => ({ contact: {} }),
  actions: {
    setContact(contact) {
      this.contact = contact
      console.log("erfolgreich gesetzt", this.contact)
    },
    logContact() {
      console.log("ausgeloogt:",this.contact)
    },
  },
})
