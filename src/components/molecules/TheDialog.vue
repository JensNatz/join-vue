<template>
    <div class="the-dialog">
        <div class="dialog-container">
            <div class="dialog-content">
                <span class="title">
                    {{ title }}
                </span>
                <span class="subline" v-if="subline">
                    {{ subline }}
                </span>
            </div>
            <div class="dialog-buttons">
                <TheButton theme="light" @click="onCancelClick">
                    Cancel
                </TheButton>
                <TheButton @click="onConfirmClick">
                    Confirm
                </TheButton>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue';
import TheButton from '@/components/atoms/TheButton.vue';
import { useDialogStore } from '@/stores/dialog';

const dialogStore = useDialogStore();

const title = computed(() => dialogStore.title);
const subline = computed(() => dialogStore.subline);

const onCancelClick = () => {
    dialogStore.onCancel?.();
    dialogStore.hideDialog();
};

const onConfirmClick = () => {
    dialogStore.onConfirm?.();
    dialogStore.hideDialog();
};

</script>
<style lang="scss" scoped>
.the-dialog {
    @include flex();
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($basic-black, 0.5);

    .dialog-container {
        @include flex($direction: column, $justify: space-between);
        background-color: $basic-white;
        box-shadow: 0 0 10px rgba($basic-black, 0.1);
        border-radius: 10px;
        padding: 20px;
        width: 300px;
        min-height: 200px;

        .dialog-content {
            @include flex($direction: column, $align: start);
            gap: 8px;
            width: 100%;

            .title {
                font-weight: 700;
            }

            .subline {
                font-size: 14px;
            }
        }

        .dialog-buttons {
            @include flex();
            justify-content: flex-end;
            gap: 8px;
            padding-top: 16px;
        }
    }
}
</style>
