<template>
  <div
    ref="stageRef"
    class="stage grid place-items-center min-h-svh overflow-hidden bg-[radial-gradient(120%_90%_at_50%_40%,#10121a_0%,#0a0c12_45%,#000_100%)]"
    :data-next="next || ''"
    @click="clickReplay ? replay() : null"
  >
    <svg
      id="cabinet"
      viewBox="0 0 300 520"
      role="img"
      aria-labelledby="title desc"
      class="drop-shadow-[0_1.6vmin_2.6vmin_rgba(0,0,0,0.35)]"
      style="width: clamp(220px, 40vmin, 540px); height: auto; overflow: visible; transform-box: fill-box; transform-origin: center;"
    >
      <title id="title">Filing cabinet animation</title>
      <desc id="desc">Cabinet slides to center, top drawer opens, and a page flies out to cover the screen.</desc>

      <defs>
        <linearGradient id="bodyGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="#eef2f8"/>
          <stop offset="100%" stop-color="#d5dce8"/>
        </linearGradient>
      </defs>

      <g id="body">
        <rect x="20" y="20" width="260" height="480" rx="14" ry="14" fill="url(#bodyGrad)" stroke="#b8c2d1" stroke-width="3"/>
        <ellipse cx="150" cy="508" rx="90" ry="10" fill="rgba(0,0,0,.25)"/>
      </g>

      <!-- top drawer -->
      <g id="drawer" style="transform-box: fill-box; transform-origin: 50% 100%;">
        <rect x="40" y="40" width="220" height="130" rx="8" ry="8" fill="#e9eef7" stroke="#b8c2d1" stroke-width="2"/>
        <rect x="130" y="85" width="40" height="20" rx="6" fill="#8fa0b8"/>

        <!-- page inside drawer -->
        <g id="page" style="opacity: 0; transform-box: fill-box; transform-origin: 50% 100%; will-change: transform, filter;">
          <g id="page-inner">
            <rect x="70" y="40" width="160" height="200" rx="8" fill="#ffffff" stroke="#e7eaf0" stroke-width="1.5"/>
            <path d="M220,40 L210,60 L220,60 Z" fill="#f3f6fb"/>
            <g stroke="#cfd8e6" stroke-width="2" opacity="0.8">
              <line x1="85" y1="80" x2="210" y2="80"/>
              <line x1="85" y1="98" x2="198" y2="98"/>
              <line x1="85" y1="116" x2="205" y2="116"/>
              <line x1="85" y1="150" x2="195" y2="150"/>
              <line x1="85" y1="168" x2="205" y2="168"/>
            </g>
          </g>
        </g>
      </g>

      <!-- lower drawers -->
      <g id="drawer2">
        <rect x="40" y="190" width="220" height="130" rx="8" ry="8" fill="#e9eef7" stroke="#b8c2d1" stroke-width="2"/>
        <rect x="130" y="215" width="40" height="20" rx="6" fill="#8fa0b8"/>
      </g>
      <g id="drawer3">
        <rect x="40" y="340" width="220" height="130" rx="8" ry="8" fill="#e9eef7" stroke="#b8c2d1" stroke-width="2"/>
        <rect x="130" y="345" width="40" height="20" rx="6" fill="#8fa0b8"/>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount, nextTick, watch, defineProps, defineEmits } from 'vue'
const router = useRouter();
const props = defineProps({
  autoPlay: { type: Boolean, default: true },
  next: { type: String, default: '' },
  clickReplay: { type: Boolean, default: true }
})
const emit = defineEmits(['covered', 'navigated'])

const stageRef = ref(null)
const pageRef = ref(null)
let animEndHandler = null

function onCovered() { router.replace({ name: 'home'})}
function play () {
  const el = stageRef.value
  if (!el) return
  el.classList.add('animate-cabinet')
}

function stop () {
  const el = stageRef.value
  if (!el) return
  el.classList.remove('animate-cabinet')
}

function replay () {
  const el = stageRef.value
  if (!el) return
  el.classList.remove('animate-cabinet')
  void el.offsetWidth
  el.classList.add('animate-cabinet')
}

defineExpose({ play, stop, replay })

onMounted(async () => {
  await nextTick()
  pageRef.value = stageRef.value?.querySelector('#page') ?? null

  const onAnimStart = (e) => {
    if (e.animationName === 'page-cover') {
      document.body.classList.add('fade-out')
    }
  }
  animEndHandler = (e) => {
    if (e.animationName !== 'page-cover') return
    emit('covered')
    if (props.next) {
      window.location.href = props.next
      emit('navigated')
    }
  }
  pageRef.value?.addEventListener('animationend', animEndHandler)

  if (props.autoPlay ?? false) play()
})

onBeforeUnmount(() => {
  pageRef.value?.removeEventListener('animationend', animEndHandler)
  pageRef.value?.removeEventListener('animationstart', onAnimStart)

})

watch(() => props.autoPlay ?? false, (v) => (v ? play() : stop()))
</script>

<style>
:root{
  --t1: 450ms;  /* slide in */
  --t2: 420ms;  /* drawer open */
  --t3: 780ms;  /* page-fly */
  --t4: 540ms;
  --gap: 2.5vmin;
}

.stage.animate-cabinet #cabinet { animation: slide-in var(--t1) ease-out both; }
.stage.animate-cabinet #drawer  { animation: drawer-open var(--t2) var(--t1); }
.stage.animate-cabinet #page {
  animation:
    page-fly var(--t3) calc(var(--t1) + var(--t2)) cubic-bezier(.2,.7,.2,1) both,
    page-cover var(--t4) calc(var(--t1) + var(--t2) + var(--t3)) ease-in both;
}
.stage.animate-cabinet #page-inner { animation: page-wobble 1800ms calc(var(--t1) + var(--t2) + var(--t3) - 800ms) ease-in-out both; transform-origin: 50% 2%; }

@keyframes slide-in { from { transform: translateX(-70vw) rotate(-1deg); } to { transform: translateX(0) rotate(0deg); } }

@keyframes drawer-open {
  /* 0%   { transform: translateY(0) scale(1); filter: drop-shadow(0 0 0 rgba(0,0,0,0)); } */
  100% { transform: translateY(-14%) scale(1.02); filter: drop-shadow(0 .9vmin 1.2vmin rgba(0,0,0,.35)); }
}

@keyframes page-fly {
  0%   { opacity: 0; transform: translate(0, 0) scale(.45) rotateX(8deg) rotate(-1deg); filter: blur(2px) drop-shadow(0 .2vmin .4vmin rgba(0,0,0,.25)); }
  10%  { opacity: 1; }
  55%  { transform: translate(calc(var(--gap) * .35), calc(-30vmin)) scale(1.6) rotateX(4deg) rotate(-6deg); filter: blur(1px) drop-shadow(0 1vmin 1.6vmin rgba(0,0,0,.28)); }
  100% { transform: translate(0, calc(-18vmin)) scale(2.7) rotateX(0deg) rotate(-10deg); filter: blur(0px) drop-shadow(0 2.2vmin 3.2vmin rgba(0,0,0,.32)); }
}

@keyframes page-cover {
  0%   { transform: translate(0, calc(-18vmin)) scale(2.7) rotateX(0deg) rotate(-10deg); }
  80%  { transform: translate(0, calc(-10vmin)) scale(6.5) rotateX(0deg) rotate(-4deg); }
  100% { transform: translate(0, 0) scale(10) rotateX(0deg) rotate(0deg); }
}

@keyframes page-wobble { 0% { transform: rotate(-12deg); } 35% { transform: rotate(-7deg); } 70% { transform: rotate(-10deg); } 100% { transform: rotate(-8.5deg); } }

@keyframes fade-out { from { opacity: 1 } to { opacity: 0 } }
body.fade-out { animation: fade-out var(--t4) ease-in forwards; }

@media (prefers-reduced-motion: reduce) {
  .stage.animate-cabinet * { animation: none !important; transition: none !important; }
  #drawer { transform: translateY(-10%) !important; }
  #page { opacity: 1 !important; transform: translate(0, -30vmin) scale(1.6) !important; }
}
</style>
