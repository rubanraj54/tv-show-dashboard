<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <span class="genre-tag">{{ label }}</span>
</template>

<style scoped>
.genre-tag {
  display: inline-flex;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  background: var(--color-accent-soft);
  color: var(--color-text-muted);
  font-size: 0.75rem;
}
</style>
