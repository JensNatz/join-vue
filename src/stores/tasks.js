import { defineStore } from 'pinia'
import { loadFromDatabase, updateOnDatabase } from '@/services/databaseService';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},  }),
  getters: {
    getTasksSortedByStatus: (state) => {
      const sortedTasks = {
        "to-do": {},
        "progress": {},
        "feedback": {},
        "done": {}
      };

      for (const [taskId, taskDetails] of Object.entries(state.tasks)) {
        const { status } = taskDetails;
        if (sortedTasks.hasOwnProperty(status)) {
          sortedTasks[status][taskId] = taskDetails;
        }
      }
      
      for (const status in sortedTasks) {
        const tasksInStatus = Object.entries(sortedTasks[status]);
        const sortedEntries = tasksInStatus.sort((a, b) => a[1].order - b[1].order);
        sortedTasks[status] = Object.fromEntries(sortedEntries);
      }
      
      return sortedTasks;
    }
  },
  actions: {

    async fetchTasks() {
      const tasksFromDatabase = await loadFromDatabase("tasks");
      this.tasks = tasksFromDatabase;
    },
    async updateTaskStatus(taskId, newStatus) {
      const backupStatus = this.tasks[taskId].status;
      this.tasks[taskId].status = newStatus;
      try {
       await updateOnDatabase(`tasks/${taskId}/status`, newStatus);
        return { success: true };
      } catch (error) {
        this.tasks[taskId].status = backupStatus;
        return { success: false, error: error.message };
      }
    },

    setDragTaskId(taskId) {
      this.dragTaskId = taskId;
    },

    async updateTasksOrder(status, threshold, excludeTaskId, increment) {
      const tasksToUpdate = Object.entries(this.tasks).filter(([id, task]) => 
        task.status === status && 
        (increment ? task.order >= threshold : task.order > threshold) && 
        id !== excludeTaskId
      );

      for (const [id, task] of tasksToUpdate) {
        task.order += increment ? 1 : -1;
        await updateOnDatabase(`tasks/${id}/order`, task.order);
      }
    },

    async updateTaskPosition(taskId, newStatus, newOrder) {
      this.tasks[taskId].status = newStatus;
      this.tasks[taskId].order = newOrder;
      await updateOnDatabase(`tasks/${taskId}/status`, newStatus);
      await updateOnDatabase(`tasks/${taskId}/order`, newOrder);
    },

    async updateTaskOrder(taskId, newOrder, newStatus, oldOrder, oldStatus) {
      try {
        await this.updateTasksOrder(oldStatus, oldOrder, taskId, false); // decrease orders in old status
        await this.updateTasksOrder(newStatus, newOrder, taskId, true);  // increase orders in new status
        await this.updateTaskPosition(taskId, newStatus, newOrder);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  }
})
  