<template>
  <div class="contacts-view">
    <div class="contacts-list-container">
      <TheButton>Add new contact
        <template #icon>
          <IconAddContact />
        </template>
      </TheButton>
      <ContactsList />
    </div>
    <div class="router-view">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router'
import ContactsList from '../components/organisms/ContactsList.vue'
import TheButton from '../components/atoms/TheButton.vue';
import IconAddContact from '../components/icons/IconAddContact.vue';
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

  .router-view {
    width: 100%;
    padding: 24px;
  }
}
</style>
