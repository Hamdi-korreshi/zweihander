<template>
  <div ref="stage" class="stage">
    <!-- Full‑screen track that we slide across the viewport -->
    <div id="track" class="frame">
      <!-- New: a tight wrapper around the cabinet so rotation origin is on the cabinet base, not the full screen -->
      <div id="rig" class="rig">
        <!-- Minimal SVG filing cabinet -->
        <svg ref="cabinetSvg" id="cabinet" viewBox="0 0 300 520" class="cabinet" role="img" style="overflow: visible">
          <g id="cabinetWrap">
            <rect x="20" y="20" width="260" height="480" rx="14" ry="14" fill="#e8edf6" stroke="#bfc7d6"
              stroke-width="3" />

            <!-- top drawer (opens) -->
            <g id="drawerTop">
              <rect x="40" y="50" width="220" height="110" rx="8" ry="8" fill="#f0f3f9" stroke="#c5ccda" />
              <rect x="120" y="98" width="60" height="24" rx="6" ry="6" fill="#9fb0c6" />
            </g>

            <!-- middle drawer -->
            <g id="drawerMid">
              <rect x="40" y="200" width="220" height="110" rx="8" ry="8" fill="#f0f3f9" stroke="#c5ccda" />
              <rect x="120" y="248" width="60" height="24" rx="6" ry="6" fill="#9fb0c6" />
            </g>

            <!-- bottom drawer -->
            <g id="drawerBot">
              <rect x="40" y="350" width="220" height="110" rx="8" ry="8" fill="#f0f3f9" stroke="#c5ccda" />
              <rect x="120" y="398" width="60" height="24" rx="6" ry="6" fill="#9fb0c6" />
            </g>
          </g>
        </svg>

        <!-- Paper (HTML element for reliable 3D pop) -->
        <div ref="paper" class="paper" aria-hidden="true">
          <div class="sheet"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const stage = ref(null)
const paper = ref(null)
const router = useRouter()

function lean(side, angle=12) {
  const origin = side === 'right' ? '100% 100%' : '0% 100%'
  const target = side === 'right' ? angle: -angle

  return gsap.timeline()
    .set('#rig', {rotation: 0, transformOrigin: origin})
    .to('#rig', {rotation: target, duration:0.45, ease: 'power2.in'})
    .to('#rig', {rotation: 0, duration: 0.20, ease: 'power2.out'})
}
onMounted(async () => {
  await nextTick()

  // Start frame fully off-screen LEFT and prep elements
  gsap.set('#track', { xPercent: -110 })
  gsap.set('#rig', { rotation: 0, transformOrigin: '100% 100%' })
  gsap.set('#cabinetWrap', { rotation: 0, transformOrigin: '50% 100%' })
  gsap.set('#drawerTop', { y: 0, transformOrigin: '50% 0%' })
  gsap.set(paper.value, { autoAlpha: 0, scale: 0.25, y: -140 })

  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tl
    // Slide the whole frame from off-screen LEFT to centered (xPercent 0)
    .to('#track', { xPercent: 0, duration: 0.7, ease: 'power3.out' }, 'slide')
    // Lean right as if pushed on the left side; rotate only the tight rig around its bottom-right corner
    // .to('#rig', {
    //   keyframes: [
    //     { rotation: 14, duration: 0.45, ease: 'power2.in' },
    //     { rotation: -2, duration: 0.20, ease: 'power2.out' },
    //     { rotation: 0, duration: 0.14, ease: 'power2.out' }
    //   ]
    // })
    .add(lean('right', 12), 'slide+=0.3')
    .add(lean('left',10), '+=0.04', 'slide+=0.01')
    // Open the top drawer
    .to('#drawerTop', { z: -60, duration: 0.45 }, 'drawer')
    // Paper flies forward
    .set(paper.value, { autoAlpha: 1 }, 'drawer+=0.25')
    .to(paper.value, { y: -220, scale: 3.2, duration: 0.7, ease: 'power3.out' })
    // .add(() => {
    //   const cur = router.currentRoute.value
    //   const atHome = cur && (cur.name === 'Home' || cur.path === '/')
    //   router.replace(atHome ? { name: 'Projects' } : { name: 'Home' })
    // })
})
</script>

<style scoped>
/* Make the stage truly full-screen so the slide traverses the whole viewport */
.stage {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  background: radial-gradient(120% 90% at 50% 40%, #10121a 0%, #0a0c12 45%, #000 100%);
  overflow: hidden;
  z-index: 999;
  /* sits above page during intro */
}

/* The track that moves across the entire screen */
.frame {
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  /* frame clips to viewport */
}

/* New tight wrapper so rotation origin matches the cabinet's base corner */
.rig {
  display: grid;
  place-items: center;
  align-self: end;
  /* sit on the "floor" */
  justify-self: center;
  /* centered horizontally */
  will-change: transform;
  overflow: visible;
}

.cabinet {
  width: min(62vmin, 520px);
  height: auto;
  overflow: visible;
}

.cabinet {
  width: min(62vmin, 520px);
  height: auto;
  overflow: visible;
}

/* Correct SVG pivoting */
#cabinetWrap,
#drawerTop,
#drawerMid,
#drawerBot {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}

/* Paper */
.paper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.sheet {
  width: 120px;
  height: 160px;
  background: #fff;
  border: 2px solid #d1d8ea;
  border-radius: 6px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, .25);
}
</style>

<!--
Changes for full-screen slide:
- Stage is fixed to the viewport (100vw x 100vh) and sits on top during the intro.
- Added a #cabinetFrame that spans the full viewport; we animate its xPercent from -110 to 0 so the slide always starts fully off-screen and travels across the entire screen width, independent of the SVG's own size.
-->
