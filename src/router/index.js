import { createRouter, createWebHashHistory } from "vue-router"; // Alterado para hash history
import Home from "@/views/Home/Home.vue";
import Post from "@/views/Post/Post.vue";
import PostsList from "@/views/PostList/PostsList.vue";
import Project from "@/views/Project/Project.vue";
import ProjectsList from "@/views/ProjectList/ProjectsList.vue";
import Contact from "@/views/Contact/Contact.vue";

const routes = [
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
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
