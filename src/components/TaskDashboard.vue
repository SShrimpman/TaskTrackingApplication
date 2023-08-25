<template>
    <div class="grid content-center mx-auto w-600 text-white h-screen">
        <div class="absolute mt-44 ml-8">
            <div class="flex justify-between">
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
                <div class="grid grid-cols-4 text-center rounded-t-lg h-24 content-center">
                    <div v-for="title in titles" class="font-lg font-bold text-xl text-black"> {{ title.name }} </div>
                </div>
                <div class="rounded-b-lg text-black">
                    <div v-for="task in paginatedTasks" :key="task.id" class="grid grid-cols-4 w-full text-center h-24 content-center">
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
            <div class="flex justify-center space-x-4 mt-10">
                <Button :text="'Previous'" class="text-white bg-blue-700 hover:bg-blue-500" :class="{ 'hidden': currentPage === 1}" @click="goToPage(currentPage - 1)"/>
                <span class="flex items-center text-black">{{ currentPage }} / {{ totalPages }}</span>
                <Button :text="'Next'" class="text-white bg-blue-700 hover:bg-blue-500" :class="{ 'hidden': currentPage === totalPages}" @click="goToPage(currentPage + 1)"/>
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
                create: true,
                currentPage: 1,
                itemsPerPage: 5,
            }
        },
        mounted() {
            console.log(this.openCreate)
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
            paginatedTasks() {
                const startIndex = (this.currentPage - 1) * this.itemsPerPage;
                const endIndex = startIndex + this.itemsPerPage;
                return this.filteredTasks.slice(startIndex, endIndex);
            },
            totalPages() {
                return Math.ceil(this.filteredTasks.length / this.itemsPerPage);
            },
        },
        methods: {
            goToPage(page) {
                if (page >= 1 && page <= this.totalPages) {
                    this.currentPage = page;
                }
            },
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
                const wasLastTaskOnPage = this.filteredTasks.length % this.itemsPerPage === 1;
                this.taskStoreT.delete(taskToDelete);
                if (wasLastTaskOnPage && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.toggleDelete();
            },
            updateTask(taskToUpdate) {
                this.taskStoreT.update(taskToUpdate)
                this.toggleEdit()
            }
        }
    }
</script>
