import { defineStore } from 'pinia'
import { loadFromDatabase } from '@/services/databaseService';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    sortedTasks: {},
  }),
  actions: {

    async fetchAndSortTasks() {
      const tasksFromDatabase = await loadFromDatabase("tasks");
      this.sortedTasks = this.sortTasksByStatus(tasksFromDatabase);
    },
    
    sortTasksByStatus(tasks) {
      const sortedTasks = {
        "to-do": {},
        "progress": {},
        "feedback": {},
        "done": {}
      };

      for (const [taskId, taskDetails] of Object.entries(tasks)) {
        const { status } = taskDetails;
        if (sortedTasks.hasOwnProperty(status)) {
          sortedTasks[status][taskId] = taskDetails;
        }
      }
      
      return sortedTasks;
    }
  }
})
  