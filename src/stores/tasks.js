import { defineStore } from 'pinia'
import * as taskService from '@/services/taskService'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},
    currentTaskId: '',
    error: null
  }),

  actions: {
    async fetchTasks() {
      try {
        this.tasks = await taskService.getTasksSortedByStatus()
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

    setCurrentTaskId(taskId) {
      this.currentTaskId = taskId;
    }
  }
})
  