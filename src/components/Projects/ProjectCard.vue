<template>
    <article class="rounded-2xl border p-4 hover:shadow-lg transition bg-white/70">
        <div>
            <RouterLink
                    :to="{ name: 'ProjectDetail', params: {slug: project.slug}}"
            >
            <img 
                v-if="project.image"
                :src="project.image"
                :alt="project.title"
                class="rounded-xl w-full aspect-video object-cover"
                loading="lazy"
                
                />
            </RouterLink>
        </div>
        <h3 class="text-lg font-semibold mt-3">{{ project.title }}</h3>
        <p class="text-gray-600 mt-1 line-clamp-3">{{ project.excerpt }}</p>
        <div class="flex flex-wrap gap-2 mt-3">
            <span
                v-for="t in project.tags"
                :key="t"
                class="text-xs px-2 py-1 rounded-full bg-gray-100 text-emerald-950"
            >{{ t }}</span>
        </div>
        <div class="flex items-center gap-4 mt-4">
            <RouterLink
                :to="{ name: 'ProjectDetail', params: {slug: project.slug}}"
                class="underline"
            >
            Tech Specs
            </RouterLink>
            <a :href="project.github" target="_blank" rel="noopener" class="underline">
            GitHub
            </a>
        </div>
    </article>
</template>

<script>
export default {
    name: 'ProjectCard',
    props: {
        project: {type: Object, required: true}
    }
}
</script>