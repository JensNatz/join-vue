import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', {
  state: () => ({ isOverlayOpen: false }),
  actions: {
    toggleOverlay(isOpen) {
      this.isOverlayOpen = isOpen;
    }
  }
})
