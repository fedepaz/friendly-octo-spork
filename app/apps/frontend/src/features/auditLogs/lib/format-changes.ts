// src/features/auditLogs/lib/format-changes.ts

/**
 * Compact one-line summary of an audit entry's `changes` payload for the
 * list column. Handles both the request-snapshot shape ({endpoint, method,
 * params, query, body}) and before/after diff objects.
 */
export function formatChanges(changes: Record<string, unknown> | null): string {
  if (!changes || Object.keys(changes).length === 0) return '—';

  const renderValue = (value: unknown): string => {
    if (typeof value === 'object' && value !== null && 'after' in value) {
      const v = value as { before: unknown; after: unknown };
      return `${String(v.before)} → ${String(v.after)}`;
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return String(value);
  };

  const keys = Object.keys(changes).slice(0, 2);
  const summary = keys
    .map((key) => `${key}: ${renderValue(changes[key])}`)
    .join(', ');

  return keys.length < Object.keys(changes).length ? `${summary}...` : summary;
}
