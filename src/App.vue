<template>
  <div>
    <!-- <Intro360
      v-model:open="showIntro"
      logo-text="HAMDI KORRESHI"
      @finished="onIntroDone"
    />
    <!-- remove router-view unless you’ve installed and wired vue-router -->
    <NavBar :item="tabs"></NavBar>
    <router-view/>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// IMPORTANT: use a RELATIVE path that matches your actual filename.
// If your file is src/components/IntroAnimation.vue:
import Intro360 from './components/IntroAnimation.vue'
import Home from "./components/Home.vue"
import NavBar from './components/NavBar.vue'

const showIntro = ref(true)
const onIntroDone = () => console.log('intro finished')
</script>
