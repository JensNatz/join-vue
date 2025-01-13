import { defineStore } from 'pinia';

export const useToastStore = defineStore('toast', {
    state: () => ({
        isVisible: false,
        message: '',
        theme: 'success'
    }),

    actions: {
        showToast(newMessage, newTheme = 'success') {
            this.message = newMessage;
            this.theme = newTheme;
            this.isVisible = true;
            
            setTimeout(() => {
                this.hideToast();
            }, 2500);
        },
        
        hideToast() {
            this.isVisible = false;
        },
    }
});