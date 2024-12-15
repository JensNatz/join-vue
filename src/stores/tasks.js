import { defineStore } from 'pinia'
import { loadFromDatabase, updateOnDatabase } from '@/services/databaseService';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},
    dragTaskId: null
  }),
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
    }
  }
})
  