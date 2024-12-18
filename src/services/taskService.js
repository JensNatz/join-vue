import { loadFromDatabase, updateOnDatabase } from '@/services/databaseService';

export async function loadTasksFromDatabase() {
    const tasks = await loadFromDatabase('tasks');
    return tasks;
}

export async function updateTaskOrder(taskId, newIndex) {
    await updateOnDatabase(`tasks/${taskId}/order`, newIndex);
}

export async function updateTaskStatus(taskId, newStatus) {
    await updateOnDatabase(`tasks/${taskId}/status`, newStatus);
}

export async function updateSubtaskStatus(taskId, subtaskId, newStatus) {
    await updateOnDatabase(`tasks/${taskId}/subtasks/${subtaskId}/done`, newStatus);
}