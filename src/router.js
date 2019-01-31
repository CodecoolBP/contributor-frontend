import Vue from 'vue'
import Router from 'vue-router'
import MainPage from './components/MainPage.vue'
import AddProject from './components/AddProject.vue'
import ProjectPage from './components/ProjectPage.vue'
import EditProject from './components/EditProject.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: MainPage,
        },
        {
            path: '/add',
            name: 'add',
            component: AddProject,
        },
        {
            path: '/projects/',
            name: 'projects',
            component: ProjectPage,
        },
        {
            path: '/projects/:id',
            name: 'project_page',
            component: ProjectPage
        },
        {
            path: '/projects/:id/edit',
            name: 'project_page',
            component: EditProject
        }
    ]
})