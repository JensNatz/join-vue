<template>
  <TheOverlay>
    <EditContactForm v-if="overlayStore.overlayMode === 'editContact'" />
    <AddContactForm v-if="overlayStore.overlayMode === 'createContact'" />
  </TheOverlay>
  <div class="contacts-view">
    <div class="contacts-list-container">
      <TheButton @click="onAddContactClick">Add new contact
        <template #icon>
          <IconAddContact />
        </template>
      </TheButton>
      <ContactsList />
    </div>
    <div v-if="contactStore.currentContactId" class="contact-details-container">
      <ContactDetails />
    </div>
  </div>
</template>
<script setup>
import TheOverlay from '@/components/molecules/TheOverlay.vue';
import EditContactForm from '@/components/organisms/EditContactForm.vue';
import ContactsList from '@/components/organisms/ContactsList.vue'
import ContactDetails from '@/components/organisms/ContactDetails.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import IconAddContact from '@/components/icons/IconAddContact.vue';
import AddContactForm from '@/components/organisms/AddContactForm.vue';
import { useOverlayStore } from '@/stores/overlay';
import { useContactStore } from '@/stores/contact';

const overlayStore = useOverlayStore();
const contactStore = useContactStore();

const onAddContactClick = () => {
  overlayStore.setOverlayMode('createContact');
  overlayStore.toggleOverlay();
};

</script>
<style lang="scss">
.contacts-view {
  @include flex($align: start, $justify: start);

  .contacts-list-container {
    @include flex($direction: column);
    gap: 24px;
    width: 320px;
    flex-shrink: 0;
    box-shadow: 4px 0px 6px 0px rgba($basic-black, 0.1);
    padding: 32px 24px;
    height: calc(100vh - 96px);
  }

  .contact-details-container {
    width: 100%;
    padding: 24px;
  }
}
</style>
