import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Projects from "../components/Projects/Projects.vue";
import Articles from "../components/Articles.vue";
import ProjectDetail from "../components/Projects/ProjectDetail.vue";
import IntroView from "../components/IntroView.vue";

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
        path: "/projects/:slug.md",
        name: "ProjectDetail",
        component: ProjectDetail
    },
    {
        path: "/articles",
        name: "Articles",
        component: Articles,
        meta: {showInTabs: true, label: 'Articles'},
    },
    {
        path: '/intro',
        name: 'Intro',
        component: IntroView,
    }
]

const router = createRouter({ 
  history: createWebHistory(),
  routes,
})

export default router;