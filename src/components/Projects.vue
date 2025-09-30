<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="project in projects" :key="project.id" class="p-4 border rounded-xl">
            <img :src="project.image" alt="" class="rounded-md"/>
            <h2 class="text-xl font-bold mt-2">{{  project.title  }}</h2>
            <p class="text-gray-600">{{ project.description }}</p>
            <div class="flex gap-2 mt-2">
                <a :href="project.github" target="_blank">GitHub</a>
                <a :href="project.demo" target="_blank">Live</a>
            </div>
        </div>

    </div>
</template>

<script setup>
</script>