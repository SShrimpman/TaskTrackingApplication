<template>
        <div class="mx-auto w-700 mt-36 text-white">
            <button class="bg-green-500 p-2 rounded-lg mb-10" @click="toggleCreate">Create New Task</button>
            <div class="grid grid-cols-3 text-center rounded-t-lg bg-red-500 h-24 content-center">
                <div v-for="title in titles" class="font-lg font-bold text-xl"> {{ title.name }} </div>
            </div>
            <div class="bg-black rounded-b-lg">
                <div v-for="task in getTasks" :key="task.id" class="grid grid-cols-3 w-full text-center h-24 content-center">
                    <div>{{ task.name }}</div>
                    <div>{{ task.deadline }}</div>
                    <div class="space-x-2">
                        <button class="bg-blue-700 p-1 rounded-md">Edit</button>
                        <button class="bg-red-700 p-1 rounded-md">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <CreatePop v-if="openCreate" @newTask="createTask" @cancelCreate="closeCreate"/>
</template>

<script>
import { taskStore } from '../store/taskStore';
import { mapState } from 'pinia'
import CreatePop from './popups/Create.vue'

    export default {
        setup() {
            const taskStoreT = taskStore()
            return { taskStoreT }
        },
        components: {
            CreatePop
        },
        data() {
            return {
                titles: [
                    { name: "Name" },
                    { name: "Deadline" },
                    { name: "Actions" }
                ],
                openCreate: false
            }
        },
        computed: {
            ...mapState(taskStore, ['getTasks'])
        },
        methods: {
            toggleCreate() {
                this.openCreate = !this.openCreate
            },
            closeCreate() {
                this.openCreate = false
            },
            createTask(newTask) {
                this.taskStoreT.add(newTask)
                this.closeCreate()
            }
        }
    }
</script>