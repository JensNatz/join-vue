<template>
  <TheOverlay v-if="overlayStore.isOverlayOpen">
    <EditContactForm v-if="overlayStore.overlayMode === 'edit'" />
    <TheButton v-else>Close</TheButton>
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
import TheOverlay from '../components/molecules/TheOverlay.vue';
import EditContactForm from '../components/organisms/EditContactForm.vue';
import ContactsList from '../components/organisms/ContactsList.vue'
import ContactDetails from '../components/organisms/ContactDetails.vue';
import TheButton from '../components/atoms/TheButton.vue';
import IconAddContact from '../components/icons/IconAddContact.vue';
import { postToDatabase } from '../services/databaseService';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';

const overlayStore = useOverlayStore();
const contactStore = useContactStore();


const onAddContactClick = () => {
  overlayStore.setOverlayMode('create');
  overlayStore.toggleOverlay();
  console.log('overlayStore.isOverlayOpen', overlayStore.isOverlayOpen);
  // postToDatabase('contacts', {
  //   name: 'Another Dummy',
  //   email: 'newcontact@example.com',
  //   phone: '1234567890',
  //   colorcode: 1
  // });
  console.log('contact added');
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
