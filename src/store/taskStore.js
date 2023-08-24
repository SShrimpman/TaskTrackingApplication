import { v4 as uuidv4} from 'uuid'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const taskStore = defineStore('taskStore', {
    state: () => {
        return {
            tasks: useStorage('tasks',[]),
            task: null
        }
    },
    getters: {
        getTasks: (state) => state.tasks,
    },
    actions: {
        add(task) {
            try {
                task.id = uuidv4();
                this.tasks.push(task);
            } catch (error) {
                throw error
            }
        },
    }
})