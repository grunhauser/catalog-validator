<script setup lang="ts">
import type { Issue } from '../types/catalog';

defineProps<{ issues: Issue[] }>();
</script>

<template>
  <section class="card">
    <h2>Issues</h2>
    <p v-if="issues.length === 0">No issues found.</p>
    <div v-else class="scroll">
      <table>
        <thead>
          <tr><th>Row</th><th>Field</th><th>Severity</th><th>Problem</th><th>Rule</th></tr>
        </thead>
        <tbody>
          <tr v-for="(issue, i) in issues" :key="i">
            <td>{{ issue.row }}</td>
            <td><code>{{ issue.field }}</code></td>
            <td><span :class="['badge', issue.severity]">{{ issue.severity }}</span></td>
            <td>{{ issue.message }}</td>
            <td><code>{{ issue.rule }}</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.scroll { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 15px; }
th, td { text-align: left; padding: 8px; border-bottom: 1px solid var(--border); }
th { color: var(--text-h); }
.badge { padding: 2px 8px; border-radius: 999px; font-size: 13px; }
.badge.error { background: var(--error-bg); color: var(--error); }
.badge.warning { background: var(--warning-bg); color: var(--warning); }
</style>
