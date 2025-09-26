<template>
  <transition name="fade">
    <div v-if="visible" class="intro360" role="dialog" aria-label="Site intro animation">
      <canvas ref="canvasRef" aria-hidden="true" class="intro360__canvas" />
      <button v-if="showSkip" class="intro360__skip" type="button" @click="dismiss(true)">{{ skipText }}</button>
      <div class="intro360__logo" :class="{ 'intro360__logo--show': logoReady }" v-text="logoText" />
    </div>
  </transition>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'

/**
 * Xbox‑style 3D intro with:
 *  - Glowing ribbon that orbits then merges into the orb
 *  - Sphere shader that reveals an "X" band wrapping around the ball
 */

const props = defineProps({
  open: { type: Boolean, default: true },
  logoText: { type: String, default: 'YOUR NAME' },
  showSkip: { type: Boolean, default: true },
  skipText: { type: String, default: 'Skip intro' },
  autoDismissMs: { type: Number, default: 4200 },
  animationMs: { type: Number, default: 3600 },
  particles: { type: Boolean, default: true },
})
const emit = defineEmits(['update:open', 'finished'])

const canvasRef = ref(null)
const visible = ref(props.open)
const logoReady = ref(false)

watch(() => props.open, (v) => { visible.value = v; if (v) start() })
watch(visible, (v) => emit('update:open', v))

let renderer, scene, camera, orb, rings, ribbon, particles, rafId, startTime, cleanupFns = []
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function teardown() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null
  const disposeObject = (obj) => obj?.traverse?.((c) => {
    c.geometry?.dispose?.()
    if (Array.isArray(c.material)) c.material.forEach((m) => m?.dispose?.())
    else c.material?.dispose?.()
  })
  if (scene) disposeObject(scene)
  renderer?.dispose?.(); renderer?.forceContextLoss?.()
  cleanupFns.forEach((fn) => fn())
  cleanupFns = []
  renderer = scene = camera = orb = rings = ribbon = particles = undefined
}

function dismiss() { visible.value = false; emit('finished') }

function start() {
  teardown(); logoReady.value = false
  const canvas = canvasRef.value; if (!canvas) return

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0.35, 2.2)

  // Lighting
  const hemi = new THREE.HemisphereLight(0x88ccff, 0x0b1020, 0.8); scene.add(hemi)
  const key = new THREE.PointLight(0xb3e5fc, 8, 10, 2); key.position.set(2.2, 1.5, 2.2); scene.add(key)
  const rim = new THREE.PointLight(0x80ffb0, 6, 10, 2); rim.position.set(-2.0, -1.2, -1.8); scene.add(rim)

  // ===== Sphere with X-band shader =====
  const sphereGeo = new THREE.SphereGeometry(0.6, 128, 128)
  const uniforms = {
    uTime: { value: 0 },
    uBand: { value: 0.0 }, // 0..1: reveal X band intensity
    uColor: { value: new THREE.Color(0x9cffd1) },
    uBase: { value: new THREE.Color(0x8fd3fe) },
  }
  const sphereMat = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPos;
      void main(){
        vNormal = normalize(normalMatrix * normal);
        vec4 wp = modelMatrix * vec4(position,1.0);
        vPos = normalize((modelViewMatrix * vec4(position,1.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec3 vNormal;
      uniform float uBand;
      uniform vec3 uColor; // glow color
      uniform vec3 uBase;  // base tint
      // Band about an axis a: intensity peaks where dot(n,a)==0 (great circle)
      float band(vec3 n, vec3 a, float width){
        float d = abs(dot(n, normalize(a)));
        float edge = smoothstep(width, width*0.6, d); // thinner as width small
        return 1.0 - edge;
      }
      void main(){
        vec3 n = normalize(vNormal);
        // Two axes to form an X wrapping the sphere
        vec3 a1 = normalize(vec3( 1.0, 0.0,  1.0));
        vec3 a2 = normalize(vec3(-1.0, 0.0,  1.0));
        float b1 = band(n, a1, mix(0.22, 0.06, uBand));
        float b2 = band(n, a2, mix(0.22, 0.06, uBand));
        float xwrap = clamp(b1 + b2, 0.0, 1.0);
        // base color + glow band
        vec3 col = mix(uBase * 0.7, uBase, 0.4);
        col = mix(col, uColor, xwrap * uBand);
        // fake fresnel rim for gloss
        float fres = pow(1.0 - abs(n.z), 2.0);
        col += fres * 0.08;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    transparent: false,
  })
  orb = new THREE.Mesh(sphereGeo, sphereMat)
  scene.add(orb)

  // ===== Swirling rings (subtle background motion) =====
  rings = new THREE.Group(); scene.add(rings)
  for (let i = 0; i < 3; i++) {
    const r = 0.92 + i * 0.08
    const geo = new THREE.TorusGeometry(r, 0.006 + i * 0.003, 10, 192)
    const mat = new THREE.MeshBasicMaterial({ color: 0x9cffd1, transparent: true, opacity: 0.28 - i * 0.06 })
    const m = new THREE.Mesh(geo, mat)
    m.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    rings.add(m)
  }

  // ===== Glowing ribbon (tube along a tilted circular path) =====
  class TiltedCircle extends THREE.Curve {
    constructor(radius = 1.05, tilt = 0.7) { super(); this.radius = radius; this.tilt = tilt }
    getPoint(t) {
      const ang = t * Math.PI * 2.0
      const x = Math.cos(ang) * this.radius
      const y = Math.sin(ang) * this.radius * 0.35 // squashed to suggest perspective
      const z = Math.sin(ang) * this.radius * 0.9
      // tilt around X
      const ty = y * Math.cos(this.tilt) - z * Math.sin(this.tilt)
      const tz = y * Math.sin(this.tilt) + z * Math.cos(this.tilt)
      return new THREE.Vector3(x, ty, tz)
    }
  }
  const path = new TiltedCircle(1.05, 0.55)
  const tubeGeo = new THREE.TubeGeometry(path, 320, 0.016, 8, true)
  const tubeMat = new THREE.MeshBasicMaterial({ color: 0x9cffd1, transparent: true, opacity: 0.9 })
  ribbon = new THREE.Mesh(tubeGeo, tubeMat)
  scene.add(ribbon)

  // ===== Particles (optional) =====
  if (props.particles) {
    const particleGeo = new THREE.BufferGeometry()
    const count = 500
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 1.2 + Math.random() * 1.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i*3+0] = radius * Math.sin(phi) * Math.cos(theta)
      pos[i*3+1] = radius * Math.cos(phi) * 0.7
      pos[i*3+2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const particleMat = new THREE.PointsMaterial({ size: 0.012, color: 0xc8fff4, transparent: true, opacity: 0.6 })
    particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)
  }

  // ===== Timeline =====
  startTime = performance.now()
  const DURATION = prefersReduced ? 0 : Math.max(props.animationMs, 0)

  // Logo reveal
  const logoTimer = setTimeout(() => (logoReady.value = true), 1100)
  cleanupFns.push(() => clearTimeout(logoTimer))

  // Auto dismiss
  if (props.autoDismissMs > 0) {
    const autoTimer = setTimeout(() => dismiss(), props.autoDismissMs)
    cleanupFns.push(() => clearTimeout(autoTimer))
  }

  // Resize
  const onResize = () => {
    const w = window.innerWidth, h = window.innerHeight
    renderer.setSize(w, h)
    camera.aspect = w / h; camera.updateProjectionMatrix()
  }
  window.addEventListener('resize', onResize)
  cleanupFns.push(() => window.removeEventListener('resize', onResize))

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  // Loop
  const tick = (now) => {
    const t = now - startTime
    const p = DURATION ? Math.min(t / DURATION, 1) : 1
    const eased = easeOutCubic(p)

    // Camera glide
    camera.position.z = 2.2 + (1.0 - eased) * 0.9
    camera.position.x = Math.sin(now * 0.0006) * 0.2
    camera.position.y = 0.35 + Math.sin(now * 0.0004) * 0.05
    camera.lookAt(0, 0, 0)

    // Background motion
    orb.rotation.y += 0.002
    orb.rotation.x += 0.0012
    rings.children.forEach((m, i) => { m.rotation.y += 0.003 + i*0.0008; m.rotation.x -= 0.0016 + i*0.0005 })
    particles && (particles.rotation.y += 0.0009)

    // Ribbon orbits, then contracts & fades while sphere X-band reveals
    if (ribbon) {
      ribbon.rotation.y += 0.02
      const mergeT = Math.min(Math.max((t - 1400.0) / 1200.0, 0), 1) // 1.4s→2.6s
      // shrink tube radius and opacity as it "merges"
      const baseR = 0.016
      const r = baseR * (1.0 - 0.9 * mergeT)
      ribbon.geometry.parameters.radius = r // for reference only
      ribbon.scale.setScalar(1.0 - 0.07 * mergeT)
      ribbon.material.opacity = 0.9 * (1.0 - 0.85 * mergeT)
      uniforms.uBand.value = mergeT // reveal X proportionally
    }

    uniforms.uTime.value = t * 0.001

    renderer.render(scene, camera)
    rafId = requestAnimationFrame(tick)
  }

  onResize(); rafId = requestAnimationFrame(tick)

  const caps = renderer.capabilities
  if (!caps.isWebGL2 && !caps.isWebGL1) dismiss()
}

onMounted(() => { if (visible.value) start() })
onBeforeUnmount(() => teardown())
</script>

<style scoped>
.intro360 { position: fixed; inset: 0; z-index: 9999; background: radial-gradient(1200px 800px at 50% 40%, #0a0f1f 0%, #060a12 40%, #020409 100%); display: grid; place-items: center; contain: strict; }
.intro360__canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
.intro360::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: radial-gradient(60% 40% at 50% 40%, transparent 0%, transparent 60%, rgba(0,0,0,.35) 100%); }
.intro360__skip { position: absolute; right: 16px; top: 16px; padding: 8px 12px; font-size: 14px; letter-spacing: .02em; color: #c9d1d9; background: rgba(10, 14, 22, .5); border: 1px solid rgba(255,255,255,.12); border-radius: 999px; cursor: pointer; user-select: none; -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); transition: transform .2s ease, background .2s ease; }
.intro360__skip:hover { transform: translateY(-1px); background: rgba(20, 28, 40, .6); }
.intro360__logo { position: absolute; bottom: 12vh; width: 100%; text-align: center; font-weight: 700; font-size: clamp(18px, 3vw, 28px); letter-spacing: .35em; text-transform: uppercase; color: #e8f5e9; opacity: 0; filter: blur(8px); transition: opacity 600ms ease 1100ms, filter 900ms ease 1100ms; }
.intro360__logo--show { opacity: 1; filter: blur(0); }
.fade-enter-active, .fade-leave-active { transition: opacity 800ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
@media (prefers-reduced-motion: reduce) { .intro360__logo { transition: none; } }
</style>
