<template>
  <div class="contact-details-view">
    <div class="contact-name-container">
      <InitialsBadge :name="contact.name" size="large" :colorCode="contact.colorcode" />
      <div>
        <h1>{{ contact.name }}</h1>
        <div class="contact-actions">
          <div @click="onEditContactClick">
            <IconEdit />
            Edit
          </div>
          <div @click="onDeleteContactClick">
            <IconDelete />
            Delete
          </div>
        </div>
      </div>
    </div>
    <div class="contact-information">
      <span class="contact-information-title">Contact Information</span>
      <span class="contact-information-label">Email</span>
      <span class="contact-information-value">{{ contact.email }}</span>
      <span class="contact-information-label">Phone</span>
      <span class="contact-information-value">{{ contact.phone }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { deleteFromDatabase } from '@/services/databaseService';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

const overlayStore = useOverlayStore();
const contactStore = useContactStore();

const contact = computed(() => contactStore.getContactInfoById(contactStore.currentContactId));

const onDeleteContactClick = async () => {
  const contactBackup = contact.value;
  contactStore.deleteContactById(contact.value.id);
  contactStore.clearCurrentContactId();
  try {
    await deleteFromDatabase(`contacts/${contactBackup.id}`);
  } catch (error) {
    // TODO: toastmessage, die  sagt "was schiefgelaufen" console.error('Failed to delete contact:', error);
    contactStore.addToSortedContacts(contactBackup);
    contactStore.setCurrentContactId(contactBackup.id);
  }
};

const onEditContactClick = () => {
  overlayStore.toggleOverlay();
  overlayStore.setOverlayMode('editContact');
};

</script>
<style lang="scss">
.contact-details-view {
  color: $basic-black;
  padding: 32px;

  @include flex($align: start, $direction: column);
  gap: 24px;

  .contact-name-container {
    @include flex($justify: start);
    gap: 16px;
  }

  .contact-actions {
    @include flex($justify: start);
    gap: 16px;

    >div {
      cursor: pointer;
      @include flex($justify: start);
      gap: 8px;
      color: $primary-color;
      transition: color 0.2s ease;
      padding: 4px;

      &:hover {
        color: $secondary-color;
        font-weight: 500;

        .icon {
          color: $secondary-color;
        }
      }
    }
  }

  .contact-information {
    @include flex($align: start, $direction: column);
    gap: 8px;

    .contact-information-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .contact-information-label {
      font-size: 16px;
      font-weight: 700;
    }

    .contact-information-value {
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
