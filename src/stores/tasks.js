import { defineStore } from 'pinia'
import * as taskService from '@/services/taskService'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},
    currentTaskId: '',
    error: null
  }),

  getters: {
    getCurrentTask() {
      return this.tasks[this.currentTaskId];
    },
    getSortedTasks() {
      const sortedTasks = {
        "to-do": [],
        "progress": [],
        "feedback": [],
        "done": []
      };

      for (const [taskId, taskDetails] of Object.entries(this.tasks)) {
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
  },

  actions: {
    async fetchTasks() {
      try {
        this.tasks = await taskService.loadTasksFromDatabase()
      } catch (err) {
        this.error = err.message
      } 
    },

    async updateTaskOrder(taskId, newIndex) {
      try {
        await taskService.updateTaskOrder(taskId, newIndex)
      } catch (err) {
        this.error = err.message
      }
    },

    async updateTaskStatus(taskId, newStatus) {
      try {
        await taskService.updateTaskStatus(taskId, newStatus)
      } catch (err) {
        this.error = err.message
      }
    },

    async updateSubtaskStatus(taskId, subtaskId, newStatus) {
      try {
      await taskService.updateSubtaskStatus(taskId, subtaskId, newStatus)
      } catch (err) {
        this.error = err.message
      }
    },

    setCurrentTaskId(taskId) {
      this.currentTaskId = taskId;
    }
  }
})
  