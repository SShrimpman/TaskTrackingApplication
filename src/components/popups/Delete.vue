<template>
    <div class="fixed flex justify-center h-full w-full top-0 left-0 items-center bg-transparentBg z-10">
        <div class="flex justify-center items-center text-white">
            <div class="w-500 bg-gray-700 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4">
                <div class="flex items-center justify-center space-x-4 text-xl mb-5">
                    Are you sure you want to delete {{ taskToDelete.name }} task?
                </div>
                <div class="flex items-center justify-center space-x-4">
                    <Button :text="'Delete'" class="bg-red-700 hover:bg-red-500 text-white" type="button" @click="deleteTask(taskToDelete)"/>
                    <Button :text="'Cancel'" class="bg-blue-700 hover:bg-blue-500 text-white" type="button" @click="cancel"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Button from '../widgets/Button.vue'

    export default {
        props: {
            taskToDelete: {
                type: Object,
                default: null
            }
        },
        components: {
            Button
        },
        methods: {
            deleteTask(deleteTask){
                this.$emit('deleteTask', deleteTask)
            },
            cancel(){
                this.$emit('cancelDelete')
            }
        }
    }
</script>