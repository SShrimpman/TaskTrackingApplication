<template>
        <div class="mx-auto w-700 mt-36 text-white">
            <Button :text="'Create New Task'" class="text-white bg-green-700 mb-10 hover:bg-green-500" @click="toggleCreate"/>
            <div class="dropdown dropdown-hover ml-3">
                <label tabindex="0" class="btn m-1">Hover</label>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
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
                            <Button :text="'Delete'" class="btn-sm text-white bg-red-700 hover:bg-red-500" @click="toggleDelete(task)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CreatePop v-if="openCreate" @newTask="createTask" @cancelCreate="toggleCreate"/>
        <DeletePop v-if="openDelete" :taskToDelete="taskToDelete" @deleteTask="deleteTask" @cancelDelete="toggleDelete"/>
</template>

<script>
import { taskStore } from '../store/taskStore';
import { mapState } from 'pinia'
import Button from './widgets/Button.vue';
import CreatePop from './popups/Create.vue'
import DeletePop from './popups/Delete.vue';

    export default {
        setup() {
            const taskStoreT = taskStore()
            return { taskStoreT }
        },
        components: {
            Button,
            CreatePop,
            DeletePop
        },
        data() {
            return {
                titles: [
                    { name: "To Do" },
                    { name: "Name" },
                    { name: "Deadline" },
                    { name: "Actions" }
                ],
                openCreate: false,
                openDelete: false
            }
        },
        computed: {
            ...mapState(taskStore, ['getTasks'])
        },
        methods: {
            toggleCreate() {
                this.openCreate = !this.openCreate
            },
            toggleDelete(task) {
                this.openDelete = !this.openDelete
                this.taskToDelete = task
            },
            createTask(newTask) {
                this.taskStoreT.add(newTask)
                this.toggleCreate()
            },
            deleteTask(taskToDelete) {
                this.taskStoreT.delete(taskToDelete)
                this.toggleDelete()
            }
        }
    }
</script>