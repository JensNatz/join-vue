<template>
    <div class="subtask-management-form">
        <TheLabel label="Subtasks" class="label" />
        <div class="input-container">
            <input type="text" class="input" placeholder="Add new subtask" v-model="subtaskInput"
                @keydown.enter.prevent="onAddClick" @input="onInputChange" />
            <div class="input-controls" v-if="subtaskInput">
                <IconCancel @click="onCancelClick" class="control-icon" />
                <div class="input-controls-divider"></div>
                <IconCheckmark class="control-icon" @click="onAddClick" />
            </div>
        </div>
        <div class="subtask-list">
            <div class="subtask" v-for="(subtask, index) in subtasks" :key="index">
                <input type="text" class="subtask-input" :value="subtask.title" :readonly="editingIndex !== index"
                    :ref="el => subtaskInputs[index] = el"
                    @keydown.enter.prevent.stop="onSaveClick(index, subtaskInputs[index].value)" />
                <div class="subtask-controls">
                    <div class="input-controls" v-if="editingIndex !== index">
                        <IconEdit class="control-icon" @click="onEditClick(index)" />
                    </div>
                    <div class="input-controls" v-else>
                        <IconDelete @click="onDeleteClick(index)" class="control-icon" />
                        <div class="input-controls-divider"></div>
                        <IconCheckmark class="control-icon" @click="onSaveClick(index, subtaskInputs[index].value)" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import TheLabel from '@/components/atoms/TheLabel.vue';
import IconCheckmark from '@/components/icons/IconCheckmark.vue';
import IconCancel from '@/components/icons/IconCancel.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import { ref } from 'vue';

const props = defineProps({
    subtasks: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['update:subtasks']);
const subtaskInput = ref('');
const editingIndex = ref(-1);
const subtaskInputs = ref([]);

const onInputChange = () => {
    editingIndex.value = -1;
}

const onCancelClick = () => {
    subtaskInput.value = '';
    editingIndex.value = -1;
};

const onAddClick = () => {
    if (subtaskInput.value) {
        const newSubtasks = [...props.subtasks];
        newSubtasks.push({
            title: subtaskInput.value,
            done: false
        });
        emit('update:subtasks', newSubtasks);
        subtaskInput.value = '';
    }
};

const onEditClick = (index) => {
    editingIndex.value = index;
};

const onSaveClick = (index, value) => {
    const newSubtasks = [...props.subtasks];
    newSubtasks[index] = {
        ...newSubtasks[index],
        title: value
    };
    emit('update:subtasks', newSubtasks);
    editingIndex.value = -1;
};

const onDeleteClick = (index) => {
    const newSubtasks = [...props.subtasks];
    newSubtasks.splice(index, 1);
    emit('update:subtasks', newSubtasks);
    editingIndex.value = -1;
};
</script>

<style lang="scss" scoped>
.subtask-management-form {
    width: 100%;

    .label {
        display: block;
        margin-bottom: 8px;
    }

    .input-container {
        position: relative;

        .input {
            width: 100%;
            height: 48px;
            border: 1px solid $basic-grey;
            padding: 12px 80px 12px 12px;

            font-size: 20px;

            &::placeholder {
                color: $basic-grey;
            }
        }
    }

    .input-controls {
        @include flex();
        gap: 4px;
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);

        .control-icon {
            cursor: pointer;
            width: 24px;
            height: 24px;
            color: $primary-color;
        }

        .input-controls-divider {
            width: 1px;
            height: 24px;
            background-color: $basic-grey;
        }
    }


    .subtask-list {
        @include flex($direction: column, $justify: start, $align: start);
        padding: 12px;
        max-height: 124px;
        overflow-y: auto;

        .subtask {
            width: 100%;
            position: relative;

            .subtask-input {
                width: 100%;
                height: 32px;
            }

            .subtask-controls {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
</style>