<script setup lang="ts">
import FeedInput from './components/FeedInput.vue';
import IssueSummary from './components/IssueSummary.vue';
import IssueTable from './components/IssueTable.vue';
import { useFeedValidation } from './composables/useFeedValidation';

const { text, rows, parseError, issues, errorCount, warningCount, validRowCount } =
  useFeedValidation();
</script>

<template>
  <main>
    <header>
      <h1>Catalog validator</h1>
      <p>
        Paste or upload a product feed (CSV or JSON) and see which products would be
        rejected by a marketplace or a search tool: empty prices, broken image links,
        duplicate ids.
      </p>
    </header>

    <FeedInput v-model="text" />

    <p v-if="parseError" class="parse-error" role="alert">{{ parseError }}</p>

    <template v-else-if="rows.length > 0">
      <IssueSummary
        :row-count="rows.length"
        :valid-row-count="validRowCount"
        :error-count="errorCount"
        :warning-count="warningCount"
      />
      <IssueTable :issues="issues" />
    </template>
  </main>
</template>

<style scoped>
main { max-width: 960px; margin: 0 auto; padding: 32px 16px; display: flex; flex-direction: column; gap: 20px; }
header p { max-width: 65ch; }
.parse-error { color: var(--error); background: var(--error-bg); padding: 12px; border-radius: 8px; }
</style>
