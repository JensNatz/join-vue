<template>
  Das ist der Name:
  {{ contact.name }}
</template>
<script setup>
import { computed } from 'vue';
import { useContactStore } from '@/stores/contact';

const contactStore = useContactStore();
const contact = computed(() => contactStore.contact);
</script>
