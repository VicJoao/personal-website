import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Post from "@/views/Post.vue";
import PostsList from "@/views/PostsList.vue";
import Project from "@/views/Project.vue";
import ProjectsList from "@/views/ProjectsList.vue";
import Contact from "@/views/Contact.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/post/:id',
        name: 'Post',
        component: Post,
        props: true
    },
    {
        path: '/posts',
        name: 'PostsList',
        component: PostsList
    },
    {
        path: '/project/:id',
        name: 'Project',
        component: Project,
        props: true
    },
    {
        path: '/projects',
        name: 'ProjectsList',
        component: ProjectsList
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URL),
    routes,

})

export default router
