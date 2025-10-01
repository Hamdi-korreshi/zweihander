<template>
  <div class="max-w-3xl mx-auto p-6">
    <component v-if="Comp" :is="Comp" class="prose max-w-none" />
    <div v-else class="text-gray-500">
      Not found for slug: <code>{{ slug }}</code>
      <div class="mt-2 text-xs">Known: {{ known.join(', ') }}</div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projectPages, slugs as known } from './manifest.js'

export default {
  name: 'ProjectDetail',
  setup() {
    const route = useRoute()
    const slug = computed(() => String(route.params.slug || ''))
    const Comp = computed(() => projectPages[slug.value])
    return { slug, Comp, known }
  }
}
</script>
