<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'ghost'
}>()
</script>

<template>
  <button class="app-button" :class="`app-button--${variant ?? 'primary'}`" type="button">
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: background-color 0.15s ease;
}

.app-button--primary {
  background: var(--color-accent);
  color: var(--color-surface);
}

.app-button--primary:hover {
  filter: brightness(0.95);
}

.app-button--ghost {
  background: var(--color-accent-soft);
  color: var(--color-text);
}

.app-button--ghost:hover {
  background: var(--color-border);
}
</style>
