import { createRouter, createWebHistory } from "vue-router";
import InitialPage from "../components/InitialPage.vue"
import TaskDashboard from "../components/TaskDashboard.vue"

const routes = [
    { path: '/', name: 'InitialPage', component: InitialPage },
    { path: '/dashboard', name: 'Dashboard', component: TaskDashboard },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router