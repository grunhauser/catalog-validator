import { computed, ref } from 'vue';
import { parseFeed } from '../parsers';
import { validateFeed } from '../rules';

/**
 * Holds the feed text and derives everything else from it.
 * Nothing is stored twice: rows and issues are computed, so they are always
 * in sync with the text the user pasted.
 */
export function useFeedValidation() {
  const text = ref('');

  const parsed = computed(() => (text.value.trim() === '' ? null : parseFeed(text.value)));

  const rows = computed(() => (parsed.value?.ok ? parsed.value.rows : []));
  const parseError = computed(() => (parsed.value && !parsed.value.ok ? parsed.value.error : null));
  const issues = computed(() => validateFeed(rows.value));

  const errorCount = computed(() => issues.value.filter((i) => i.severity === 'error').length);
  const warningCount = computed(() => issues.value.length - errorCount.value);
  /** Rows with no issue at all. */
  const validRowCount = computed(
    () => rows.value.length - new Set(issues.value.map((i) => i.row)).size,
  );

  return { text, rows, parseError, issues, errorCount, warningCount, validRowCount };
}
