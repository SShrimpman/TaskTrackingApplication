<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center items-center text-white">
            <form class="w-500 bg-gray-700 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-lg font-bold mb-2">
                        Task Name
                    </label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Clean my Room"
                        v-model="addTask.name">
                </div>
                <div class="mb-6">
                    <label class="block text-lg font-bold mb-2">
                        Dealine
                    </label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="date"
                        v-model="addTask.deadline">
                </div>
                <div class="flex items-center justify-center space-x-4">
                    <Button :text="'Create'" class="bg-green-700 hover:bg-green-500 text-white" type="button" @click="newTask(addTask)"/>
                    <Button :text="'Cancel'" class="bg-red-700 hover:bg-red-500 text-white" type="button" @click="cancel"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import task from '../../model/task'
import Button from '../widgets/Button.vue'

    export default {
        components: {
            Button
        },
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