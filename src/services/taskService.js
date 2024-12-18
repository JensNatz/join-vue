import { loadFromDatabase, updateOnDatabase } from '@/services/databaseService';

export async function getTasksSortedByStatus() {
    const tasks = await loadFromDatabase('tasks');
    
    const sortedTasks = {
        "to-do": [],
        "progress": [],
        "feedback": [],
        "done": []
    };

    for (const [taskId, taskDetails] of Object.entries(tasks)) {
        const { status } = taskDetails;
        if (sortedTasks.hasOwnProperty(status)) {
            sortedTasks[status].push({
                ...taskDetails,
                taskId: taskId
            });
        }
    }
      
    for (const status in sortedTasks) {
        sortedTasks[status].sort((a, b) => a.order - b.order);
    }
      
    return sortedTasks;
}

export async function updateTaskOrder(taskId, newIndex) {
    await updateOnDatabase(`tasks/${taskId}/order`, newIndex);
}

export async function updateTaskStatus(taskId, newStatus) {
    await updateOnDatabase(`tasks/${taskId}/status`, newStatus);
}
