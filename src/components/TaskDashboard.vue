<template>
        <div class="mx-auto w-700 mt-36 text-white">
            <Button :text="'Create New Task'" class="text-white bg-green-700 mb-10 hover:bg-green-500" @click="toggleCreate"/>
            <div class="rounded-lg">
                <div class="grid grid-cols-4 text-center rounded-t-lg bg-red-500 h-24 content-center">
                    <div v-for="title in titles" class="font-lg font-bold text-xl"> {{ title.name }} </div>
                </div>
                <div class="bg-black rounded-b-lg">
                    <div v-for="task in getTasks" :key="task.id" class="grid grid-cols-4 w-full text-center h-24 content-center">
                        <div>
                            <input type="checkbox" class="checkbox" v-model="task.completed">
                        </div>
                        <div>{{ task.name }}</div>
                        <div>{{ task.deadline }}</div>
                        <div class="space-x-2">
                            <Button :text="'Edit'" class="btn-sm text-white bg-blue-700 hover:bg-blue-500"/>
                            <Button :text="'Delete'" class="btn-sm text-white bg-red-700 hover:bg-red-500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CreatePop v-if="openCreate" @newTask="createTask" @cancelCreate="closeCreate"/>
</template>

<script>
import { taskStore } from '../store/taskStore';
import { mapState } from 'pinia'
import Button from './widgets/Button.vue';
import CreatePop from './popups/Create.vue'

    export default {
        setup() {
            const taskStoreT = taskStore()
            return { taskStoreT }
        },
        components: {
            Button,
            CreatePop
        },
        data() {
            return {
                titles: [
                    { name: "To Do" },
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