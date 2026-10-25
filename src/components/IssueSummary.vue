<script setup lang="ts">
defineProps<{
  rowCount: number;
  validRowCount: number;
  errorCount: number;
  warningCount: number;
}>();
</script>

<template>
  <section class="summary" aria-label="Summary">
    <div><strong>{{ rowCount }}</strong><span>products</span></div>
    <div class="ok"><strong>{{ validRowCount }}</strong><span>without issues</span></div>
    <div class="error"><strong>{{ errorCount }}</strong><span>errors</span></div>
    <div class="warning"><strong>{{ warningCount }}</strong><span>warnings</span></div>
  </section>
</template>

<style scoped>
.summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; }
.summary div { border: 1px solid var(--border); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; }
strong { font-size: 28px; color: var(--text-h); }
.ok strong { color: var(--ok); }
.error strong { color: var(--error); }
.warning strong { color: var(--warning); }
</style>
