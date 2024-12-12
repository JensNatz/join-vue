import { defineStore } from 'pinia'

export const useOverlayStore = defineStore('overlay', {
  state: () => ({
    isOverlayOpen: false,
    overlayMode: 'create'
  }),
  actions: {
    toggleOverlay() {
      this.isOverlayOpen = !this.isOverlayOpen;
    },
    setOverlayMode(mode) {
      this.overlayMode = mode
    }
  }
})
