import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";

// Lazy loading para melhor performance - carrega apenas quando necessário
const Home = () => import("@/views/Home/Home.vue");
const Post = () => import("@/views/Post/Post.vue");
const PostsList = () => import("@/views/PostList/PostsList.vue");
const Project = () => import("@/views/Project/Project.vue");
const ProjectsList = () => import("@/views/ProjectList/ProjectsList.vue");
const Contact = () => import("@/views/Contact/Contact.vue");

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/post/:id",
    name: "Post",
    component: Post,
    props: true,
  },
  {
    path: "/posts",
    name: "PostsList",
    component: PostsList,
  },
  {
    path: "/project/:id",
    name: "Project",
    component: Project,
    props: true,
  },
  {
    path: "/projects",
    name: "ProjectsList",
    component: ProjectsList,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
];

const router = createRouter({
  history: typeof window !== 'undefined' 
    ? createWebHistory(import.meta.env.VITE_BASE_URL)
    : createMemoryHistory(),
  routes,
});

export default router;
