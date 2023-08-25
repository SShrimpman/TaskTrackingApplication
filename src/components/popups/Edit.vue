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
                        v-model="task.name">
                </div>
                <div class="mb-6">
                    <label class="block text-lg font-bold mb-2">
                        Dealine
                    </label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="date"
                        v-model="task.deadline">
                </div>
                <div class="flex items-center justify-center space-x-4">
                    <Button :text="'Update'" class="bg-blue-700 hover:bg-blue-500 text-white" type="button" @click="updateTask"/>
                    <Button :text="'Cancel'" class="bg-red-700 hover:bg-red-500 text-white" type="button" @click="cancel"/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue'

    export default {
        props: {
            taskToUpdate: {
                type: Object,
                default: null
            }
        },
        components: {
            Button
        },
        data(){
            return {
                task : {
                    id : null,
                    name : '',
                    deadline : '',
                    completed: null
                }
            }
        },
        mounted(){
            this.task.id = this.taskToUpdate.id;
            this.task.name = this.taskToUpdate.name;
            this.task.deadline = this.taskToUpdate.deadline;
            this.task.completed = this.taskToUpdate.completed;
        },
        methods: {
            updateTask(){
                this.$emit('updatedTask', this.task)
            },
            cancel(){
                this.$emit('cancelEdit')
            }
        }
    }
</script>