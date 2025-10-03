<template>
    <div class="max-w-6xl mx-auto p-6 my-6">
        <h1 class="text-3xl font-bold mb-6">Projects</h1>
        <div class="space-y-4">
            <ProjectCard 
                v-for="p in projects"
                :key="p.id"
                :project="p"
            />
        </div>
    </div>
</template>

<script setup>
import { projects } from '../../data/projects.js'
import ProjectCard from './ProjectCard.vue'
import TestDoc from './Test.vue'
</script>