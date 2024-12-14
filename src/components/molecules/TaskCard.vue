<template>
    <div class="task-card" draggable="true" @dragstart="handleDragStart" @dragend="handleDragEnd">
        <h2>{{ stringService.truncate(task.title, 30) }}</h2>
        <span>{{ stringService.truncate(task.description, 50) }}</span>
        <SubtasksStatusBar v-if="task.subtasks" :subtasks="task.subtasks" />
        <template v-if="task.assigned_to" v-for="contactId in displayedContacts">
            <InitialsBadge size="small" v-bind="getContactInfo(contactId)" />
        </template>
        <template v-if="hasMoreContacts">
            <InitialsBadge size="small" :number="remainingContactsCount" />
        </template>
        <PriorityBadge :priority="task.priority" />
    </div>
</template>
<script setup>
import { stringService } from '@/services/stringService';
import SubtasksStatusBar from '@/components/atoms/SubtasksStatusBar.vue';
import PriorityBadge from '@/components/atoms/PriorityBadge.vue';
import { useContactStore } from '@/stores/contact';
import InitialsBadge from '@/components/atoms/InitialsBadge.vue';
import { computed } from 'vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
});

const MAX_DISPLAYED_CONTACTS = 4;

const contactStore = useContactStore();
const emit = defineEmits(['dragstart', 'dragend']);

const handleDragStart = (event) => {
    event.dataTransfer.effectAllowed = 'move';
    // event.dataTransfer.setData('text/plain', JSON.stringify(props.task));
    event.target.classList.add('dragging');
};

const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
    emit('dragend', props.task);
};

const getContactInfo = (contactId) => {
    const contactInfo = contactStore.getContactInfoById(contactId);
    return {
        name: contactInfo.name,
        colorCode: contactInfo.colorcode
    };
};

const displayedContacts = computed(() => {
    return props.task.assigned_to?.slice(0, MAX_DISPLAYED_CONTACTS) || [];
});

const hasMoreContacts = computed(() => {
    return props.task.assigned_to?.length > MAX_DISPLAYED_CONTACTS;
});

const remainingContactsCount = computed(() => {
    return props.task.assigned_to?.length - MAX_DISPLAYED_CONTACTS;
});
</script>
<style lang="scss">
.task-card {
    @include flex($direction: column, $align: start, $justify: start);
    width: 252px;
    padding: 16px;
    gap: 16px;
    border-radius: 8px;
    background-color: $basic-white;
    box-shadow: 0px 0px 10px 3px rgba($basic-black, 0.08);
    cursor: grab;

    &.dragging {
        opacity: 0.5;
        cursor: grabbing;
    }

    h2 {
        font-weight: 700;
        font-size: 16px;
        line-height: 16px;
        color: $primary-color;
    }

    span {
        font-size: 14px;
        line-height: 14px;
        color: $basic-black;
    }
}
</style>