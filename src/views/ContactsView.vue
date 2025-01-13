<template>
  <ToastMessage />
  <TheOverlay>
    <EditContactForm v-if="overlayStore.overlayMode === 'editContact'" />
    <AddContactForm v-if="overlayStore.overlayMode === 'createContact'" />
  </TheOverlay>
  <div class="contacts-view">
    <div class="contacts-list-container">
      <TheButton class="add-contact-button" @click="onAddContactClick">Add new contact
        <template #icon>
          <IconAddContact />
        </template>
      </TheButton>
      <ContactsList />
    </div>
    <div class="contact-details-container" :class="{ show: contactStore.currentContactId }">
      <Transition name="fade">
        <ContactDetails v-if="contactStore.currentContactId" />
      </Transition>
    </div>
  </div>
  <div v-if="isOptionsMenuVisible">
    <MobileOptionsMenu class="mobile-options-menu" v-click-outside="onOutsideClick" @click="closeOptionsMenu" />
  </div>
  <FloatingActionButton :type="floatingActionType" @click.stop="onFloatingActionClick" />
  <TheDialog v-if="dialogStore.isVisible" />
</template>
<script setup>
import { computed, ref } from 'vue';
import ToastMessage from '@/components/molecules/ToastMessage.vue';
import TheOverlay from '@/components/molecules/TheOverlay.vue';
import EditContactForm from '@/components/organisms/EditContactForm.vue';
import ContactsList from '@/components/organisms/ContactsList.vue'
import ContactDetails from '@/components/organisms/ContactDetails.vue';
import TheButton from '@/components/atoms/TheButton.vue';
import IconAddContact from '@/components/icons/IconAddContact.vue';
import AddContactForm from '@/components/organisms/AddContactForm.vue';
import FloatingActionButton from '@/components/molecules/FloatingActionButton.vue';
import MobileOptionsMenu from '@/components/organisms/MobileOptionsMenu.vue';
import TheDialog from '@/components/molecules/TheDialog.vue';
import { resetDatabase } from '@/services/securityService';
import { useOverlayStore } from '@/stores/overlay';
import { useContactStore } from '@/stores/contact';
import { useDialogStore } from '@/stores/dialog';
import { vClickOutside } from '@/directives/click-outside';

const overlayStore = useOverlayStore();
const contactStore = useContactStore();
const dialogStore = useDialogStore();

resetDatabase(); // Just for demo purposes

contactStore.currentContactId = null;
const onAddContactClick = () => {
  overlayStore.setOverlayMode('createContact');
  overlayStore.toggleOverlay();
};

const onFloatingActionClick = () => {
  if (contactStore.currentContactId) {
    toggleOptionsMenu();
  } else {
    overlayStore.setOverlayMode('createContact');
    overlayStore.toggleOverlay();
  }
};

const floatingActionType = computed(() =>
  contactStore.currentContactId ? 'options' : 'addContact'
);

const isOptionsMenuVisible = ref(false);

const toggleOptionsMenu = () => {
  isOptionsMenuVisible.value = !isOptionsMenuVisible.value;
};

const onOutsideClick = () => {
  closeOptionsMenu();
};

const closeOptionsMenu = () => {
  isOptionsMenuVisible.value = false;
};

</script>
<style lang="scss" scoped>
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

    @media (max-width: $breakpoint-md) {
      width: 100%;
      height: 100%;
      box-shadow: none;

      .add-contact-button {
        display: none;
      }
    }
  }

  .contact-details-container {
    width: 100%;
    padding: 24px;

    @media (max-width: $breakpoint-md) {
      position: absolute;
      top: 80px;
      width: 100%;
      height: calc(100vh - 151px);
      padding: 0;
      background-color: $basic-white;
      overflow-y: auto;
      transform: translateX(100%);
      transition: transform 0.25s ease-in-out;

      &.show {
        transform: translateX(0);
      }
    }
  }
}

.mobile-options-menu {
  position: fixed;
  bottom: 144px;
  right: 54px;
}

.floating-action-button {
  position: fixed;
  bottom: 112px;
  right: 24px;
  display: none;

  @media (max-width: $breakpoint-md) {
    display: flex;
  }
}

.fade-enter-active,
.fade-leave-active {
  @media (max-width: $breakpoint-md) {
    transition: opacity 0.25s ease;
  }
}

.fade-enter-from,
.fade-leave-to {
  @media (max-width: $breakpoint-md) {
    opacity: 0;
  }
}
</style>