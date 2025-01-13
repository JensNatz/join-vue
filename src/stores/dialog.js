import { defineStore } from 'pinia';

export const useDialogStore = defineStore('dialog', {
    state: () => ({
        isVisible: false,
        title: '',
        subline: '',
        onConfirm: null,
        onCancel: null,
    }),

    actions: {
        showDialog(options = {}) {
            this.isVisible = true;
            this.title = options.title || '';
            this.subline = options.subline || '';
            this.onConfirm = options.onConfirm || null;
            this.onCancel = options.onCancel || null;
        },

        hideDialog() {
            this.isVisible = false;
            this.title = '';
            this.subline = '';
            this.onConfirm = null;
            this.onCancel = null;
        },
    },
});