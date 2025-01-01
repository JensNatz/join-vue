<template>
    <div class="mobile-options-menu">
        <div class="mobile-options-menu-item" @click="onEditContactClick">
            <IconEdit />
            <span>Edit</span>
        </div>
        <div class="mobile-options-menu-item" @click="onDeleteContactClick">
            <IconDelete />
            <span>Delete</span>
        </div>
    </div>
</template>

<script setup>
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';

const contactStore = useContactStore();
const overlayStore = useOverlayStore();

const onEditContactClick = () => {
    overlayStore.toggleOverlay();
    overlayStore.setOverlayMode('editContact');
};

const onDeleteContactClick = async () => {
    const result = await contactStore.deleteContact(contactStore.currentContactId);
    if (result.success) {
        //TODO: toastmessage, die sagt "alles gut"
    } else {
        //TODO: toastmessage, die sagt "was schiefgelaufen"
    }
};
</script>
<style lang="scss">
.mobile-options-menu {
    @include flex($direction: column, $align: start);
    gap: 16px;
    z-index: 1;
    background-color: $basic-white;
    padding: 16px;
    border-radius: 16px 16px 0 16px;
    box-shadow: 0px 4px 4px 0px rgba($basic-black, 0.25);
    height: auto;

    .mobile-options-menu-item {
        @include flex($justify: start);
        gap: 8px;
        cursor: pointer;

        &:hover {
            color: $primary-color;
        }
    }
}
</style>