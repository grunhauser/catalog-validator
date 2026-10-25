<script setup lang="ts">
import { SAMPLE_CSV } from '../data/sample';

// v-model on this component binds to the feed text (Vue 3.4+ defineModel).
const text = defineModel<string>({ required: true });

async function onFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) text.value = await file.text();
}
</script>

<template>
  <section class="card">
    <div class="toolbar">
      <h2>Feed</h2>
      <label class="button">
        Upload file
        <input type="file" accept=".csv,.json,text/csv,application/json" hidden @change="onFile" />
      </label>
      <button class="button" type="button" @click="text = SAMPLE_CSV">Load example</button>
      <button class="button ghost" type="button" :disabled="!text" @click="text = ''">Clear</button>
    </div>
    <textarea
      v-model="text"
      spellcheck="false"
      placeholder="Paste a CSV (with header row) or a JSON array of products…"
      aria-label="Feed content"
    />
    <p class="hint">Everything runs in your browser. The feed is never uploaded anywhere.</p>
  </section>
</template>

<style scoped>
.toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 12px; }
.toolbar h2 { margin: 0 auto 0 0; }
textarea {
  width: 100%; min-height: 220px; resize: vertical; box-sizing: border-box;
  font: 14px/1.5 var(--mono); padding: 12px;
  border: 1px solid var(--border); border-radius: 8px; background: var(--code-bg); color: var(--text-h);
}
.hint { font-size: 14px; margin: 8px 0 0; }
</style>
