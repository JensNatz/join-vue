import { defineStore } from 'pinia'
import { loadFromDatabase } from '@/services/databaseService';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {}
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
    }
  }
})
  