<template>
  <div class="max-w-3xl mx-auto p-6">
    <div class="prose">
      <h1>Heading</h1>
      <p>This should look like styled prose. If it doesn’t, Typography isn’t active.</p>
      <pre><code>const x = 1</code></pre>
    </div>
  </div>
</template>

<script>
import TestDoc from './btc-village.md' // pick any existing file
export default { components: { TestDoc } }
</script>