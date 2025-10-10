<script setup>
import IntroFillingCab from './IntroFillingCab.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
function onCovered() {
    router.replace({ name: 'Home'})
}
console.log(router.name, router.path)
</script>

<template>
    <div class="fixed inset-0 m-0 p-0 overflow-hidden bg-black">
        <IntroFillingCab :next="''" @covered="onCovered"/>
    </div>
</template>
