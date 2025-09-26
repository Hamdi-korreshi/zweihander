import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Projects from "../components/Projects.vue";
import Articles from "../components/Articles.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {showInTabs: true, label: 'Home'},

    },
    {
        path: "/projects",
        name: "Projects",
        component: Projects,
        meta: {showInTabs: true, label: 'Projects'},

    },
    {
        path: "/articles",
        name: "Articles",
        component: Articles,
        meta: {showInTabs: true, label: 'Articles'},
    }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes,
})

export default router;