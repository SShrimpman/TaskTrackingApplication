<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center items-center text-white">
            <div class="w-full max-w-xs">
                <form class="bg-gray-500 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label class="block text-lg font-bold mb-2">
                            Task Name
                        </label>
                        <input 
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                          type="text" 
                          placeholder="Clean my Room"
                          v-model="addTask.name">
                    </div>
                    <div class="mb-6">
                        <label class="block text-lg font-bold mb-2">
                            Dealine
                        </label>
                        <input 
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                          type="date"
                          v-model="addTask.deadline">
                    </div>
                    <div class="flex items-center justify-center space-x-4">
                        <button
                          class="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="button"
                          @click="newTask(addTask)">
                            Create
                        </button>
                        <button
                          class="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          @click="cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import task from '../../model/task'

    export default {
        data() {
            return{
                addTask: new task(),
            }
        },
        methods: {
            newTask(newTask){
                this.$emit('newTask', newTask)
            },
            cancel(){
                this.$emit('cancelCreate')
            }
        }
    }
</script>