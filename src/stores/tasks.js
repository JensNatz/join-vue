import { defineStore } from 'pinia'
import * as taskService from '@/services/taskService'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: {},
    currentTaskId: '',
    currentTaskStatus: '',
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
    },

    getTasksByStatus: (state) => {
      return (status) => Object.values(state.tasks).filter(task => task.status === status);
    },

    getTaskById: (state) => {
      return (taskId) => state.tasks[taskId];
    },

    getTasksByPriority: (state) => {
      return (priority) => Object.values(state.tasks).filter(task => task.priority === priority);
    }
  },

  actions: {
    async addTask(task) {
      this.tasks[task.id] = task;
      try {
        await taskService.addTaskToDatabase(task)
        return { success: true };
      } catch {
        delete this.tasks[task.id];
        return { success: false };
      }
    },

    async updateTask(taskId, taskData) {
      const backupTask = this.tasks[taskId];
      this.tasks[taskId] = taskData;
      try {
        await taskService.updateTaskOnDatabase(taskId, taskData);
        return { success: true };
      } catch {
        this.tasks[taskId] = backupTask;
        return { success: false };
      }
    },

    async deleteTask(taskId) {
      const backupTask = this.tasks[taskId];
      delete this.tasks[taskId];
      try {
        await taskService.deleteTaskFromDatabase(taskId);
        return { success: true };

      } catch {
        this.tasks[taskId] = backupTask;
        return { success: false };
      }
    },

    async fetchTasks() {
      try {
        this.tasks = await taskService.loadTasksFromDatabase()
      } catch {
        //TODO: return falsoe oder so 
      } 
    },

    async updateTaskOrder(taskId, newIndex) {
      try {
        await taskService.updateTaskOrder(taskId, newIndex)
      } catch {
        //TODO: add backup
      }
    },

    async updateTaskStatus(taskId, newStatus) {
      try {
        await taskService.updateTaskStatus(taskId, newStatus)
      } catch {
        //TODO: add backup
      }
    },

    async updateSubtaskStatus(taskId, subtaskId, newStatus) {
      const backupSubtask = this.tasks[taskId].subtasks[subtaskId];
      this.tasks[taskId].subtasks[subtaskId].done = newStatus;
      try {
      await taskService.updateSubtaskStatus(taskId, subtaskId, newStatus)
      } catch {
        this.tasks[taskId].subtasks[subtaskId].done = backupSubtask.done;
      }
    },

    setCurrentTaskId(taskId) {
      this.currentTaskId = taskId;
    },

    setCurrentTaskStatus(status) {
      this.currentTaskStatus = status;
    },

    async removeContactFromAllTasks(contactId) {
      const affectedTasks = [];
      
      Object.keys(this.tasks).forEach(taskId => {
        const task = this.tasks[taskId];
        if (task.assigned_to?.includes(contactId)) {
          const updatedContacts = task.assigned_to.filter(id => id !== contactId);
          affectedTasks.push({ taskId, updatedTask: { ...task, assigned_to: updatedContacts } });
        }
      });

      try {
        for (const { taskId, updatedTask } of affectedTasks) {
          const result = await this.updateTask(taskId, updatedTask);
          if (!result.success) {
            return { success: false };
          }
        }
        return { success: true };
      } catch {
        return { success: false };
      }
    }
  }
})
  