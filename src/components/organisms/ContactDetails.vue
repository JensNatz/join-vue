<template>
  <div class="contact-details-view">
    <div class="contact-details-view-header">
      <IconArrowLeft @click="onBackClick" />
    </div>
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
import { computed } from 'vue';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import { useContactStore } from '@/stores/contact';
import { useOverlayStore } from '@/stores/overlay';
import { useToastStore } from '@/stores/toast';
import { useDialogStore } from '@/stores/dialog';

const overlayStore = useOverlayStore();
const contactStore = useContactStore();
const toastStore = useToastStore();
const dialogStore = useDialogStore();
const contact = computed(() => contactStore.getContactInfoById(contactStore.currentContactId));

const onDeleteContactClick = () => {
  dialogStore.showDialog({
    title: 'Are you sure you want to delete this contact?',
    subline: 'This action cannot be undone.',
    onConfirm: async () => {
      const result = await contactStore.deleteContact(contactStore.currentContactId);

      if (result.success) {
        toastStore.showToast('Contact deleted successfully!');
      } else {
        toastStore.showToast('Something went wrong, please try again.', 'error');
      }
    },
    onCancel: () => {
      dialogStore.hideDialog();
    }
  });
};

const onEditContactClick = () => {
  overlayStore.toggleOverlay();
  overlayStore.setOverlayMode('editContact');
};

const onBackClick = () => {
  contactStore.clearCurrentContactId();
};

</script>
<style lang="scss" scoped>
.contact-details-view {
  color: $basic-black;
  padding: 32px;

  @include flex($align: start, $direction: column);
  gap: 24px;

  .contact-details-view-header {
    display: none;

    @media (max-width: $breakpoint-md) {
      @include flex($justify: end);
      cursor: pointer;
      width: 100%;
    }
  }

  .contact-name-container {
    @include flex($justify: start);
    gap: 16px;

    @media (max-width: $breakpoint-sm) {
      @include flex($direction: column, $align: start);
    }

    h1 {
      margin-bottom: 16px;
    }
  }

  .contact-actions {
    @include flex($justify: start);
    gap: 16px;

    @media (max-width: $breakpoint-md) {
      display: none;
    }

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
