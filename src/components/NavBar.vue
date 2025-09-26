<template>
    <nav class="fixed top-0 inset-x-0 z-50 border-b border-slate-700 bg-slate-900">
        <ul class="flex w-full items-end overflow-x-auto overflow-y-hidden px-4 pt-6 pb-px" role="tablist">
            <li v-for="item in items" :key="item.path">
                <RouterLink :to="item.path" v-slot="{isActive}" class="group relative -mb-px block">
                    <span
                        :class="[
                            'block rounded-t-2xl border px-6 py-3 shadow-sm transitions',
                            'dark:border-slate-700',
                            isActive
                            ? 'z-20 bg-white skew-x-[0deg] [border-bottom-color:transparent] dark:bg-slate-900'
                            : 'z-10 bg-slate-100 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200'
                        ]"
                        role="tab"
                        :aria-selected="isActive"
                    >
                    <span class="block skew-x-[-12deg] font-meduim text-slate-800 dark:text-slate-200">
                        {{ item.meta.label || router.name }}
                    </span>
                    </span>
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import router from '../routes/routes';
const items = router.options.routes.filter(r => r.meta?.showInTabs);

defineProps({
    items: {
        type: Array,
        required: true,
    },
})
</script>