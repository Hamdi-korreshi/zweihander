<template>
    <!-- remove router-view unless you’ve installed and wired vue-router -->
    <NavBar v-if="route.name != 'Intro'"/>
    <div :class="{ 'p-6': route.name != '/intro'}">
      <router-view/>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import { useRoute } from 'vue-router'
const route = useRoute();
</script>
