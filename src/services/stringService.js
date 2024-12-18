export const stringService = {
    truncate: (text, length) => {
        if (!text) return '';
        return text.length > length ? text.slice(0, length) + '...' : text;
    },

    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
};
