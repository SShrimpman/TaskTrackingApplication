<template>
        <div class="mx-auto w-700 mt-36 text-white">
            <div class="flex justify-between items-center mb-10">
                <Button :text="'Create New Task'" class="text-white bg-green-700 hover:bg-green-500" @click="toggleCreate"/>
                <div class="dropdown" @click="toggleDropdown">
                    <label tabindex="0" class="btn m-1 w-28">{{ selectedFilter }}</label>
                    <ul v-if="dropdownOpen" tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28">
                        <li @click="selectFilter('All')"><a>All</a></li>
                        <li @click="selectFilter('To Do')"><a>To Do</a></li>
                        <li @click="selectFilter('Done')"><a>Done</a></li>
                    </ul>
                </div>
            </div>
            <div class="rounded-lg">
                <div class="grid grid-cols-4 text-center rounded-t-lg bg-red-500 h-24 content-center">
                    <div v-for="title in titles" class="font-lg font-bold text-xl"> {{ title.name }} </div>
                </div>
                <div class="bg-black rounded-b-lg">
                    <div v-for="task in filteredTasks" :key="task.id" class="grid grid-cols-4 w-full text-center h-24 content-center">
                        <div>
                            <input type="checkbox" class="checkbox checkbox-success" v-model="task.completed">
                        </div>
                        <div>{{ task.name }}</div>
                        <div>{{ task.deadline }}</div>
                        <div class="space-x-2">
                            <Button :text="'Edit'" class="btn-sm text-white bg-blue-700 hover:bg-blue-500" @click="toggleEdit(task)"/>
                            <Button :text="'Delete'" class="btn-sm text-white bg-red-700 hover:bg-red-500" @click="toggleDelete(task)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <CreatePop v-if="openCreate" @newTask="createTask" @cancelCreate="toggleCreate"/>
        <EditPop v-if="openEdit" :taskToUpdate="taskToUpdate" @updatedTask="updateTask" @cancelEdit="toggleEdit"/>
        <DeletePop v-if="openDelete" :taskToDelete="taskToDelete" @deleteTask="deleteTask" @cancelDelete="toggleDelete"/>
</template>

<script>
import { taskStore } from '../store/taskStore';
import { mapState } from 'pinia';
import Button from './widgets/Button.vue';
import CreatePop from './popups/Create.vue';
import DeletePop from './popups/Delete.vue';
import EditPop from './popups/Edit.vue';

    export default {
        setup() {
            const taskStoreT = taskStore()
            return { taskStoreT }
        },
        components: {
            Button,
            CreatePop,
            DeletePop,
            EditPop
        },
        data() {
            return {
                titles: [
                    { name: "Completed" },
                    { name: "Name" },
                    { name: "Deadline" },
                    { name: "Actions" }
                ],
                dropdownOpen: false,
                selectedFilter: 'Filter by',
                openCreate: false,
                openDelete: false,
                openEdit: false,
            }
        },
        computed: {
            ...mapState(taskStore, ['getTasks']),
            filteredTasks() {
                if (this.selectedFilter === 'To Do') {
                    return this.getTasks.filter(task => !task.completed);
                } else if (this.selectedFilter === 'Done') {
                    return this.getTasks.filter(task => task.completed);
                }
                return this.getTasks;
            },
        },
        methods: {
            toggleDropdown() {
                this.dropdownOpen = !this.dropdownOpen;
            },
            toggleCreate() {
                this.openCreate = !this.openCreate
            },
            toggleDelete(task) {
                this.openDelete = !this.openDelete
                this.taskToDelete = task
            },
            toggleEdit(task) {
                this.openEdit = !this.openEdit
                this.taskToUpdate = task
            },
            selectFilter(filter) {
                this.selectedFilter = filter;
            },
            createTask(newTask) {
                this.taskStoreT.add(newTask)
                this.toggleCreate()
            },
            deleteTask(taskToDelete) {
                this.taskStoreT.delete(taskToDelete)
                this.toggleDelete()
            },
            updateTask(taskToUpdate) {
                this.taskStoreT.update(taskToUpdate)
                this.toggleEdit()
            }
        }
    }
</script>