<script setup lang="ts">
const model = defineModel<string>({ default: '' })

defineProps<{
  placeholder?: string
}>()
</script>

<template>
  <form class="search-input" role="search" @submit.prevent>
    <label class="visually-hidden" for="show-search">Search TV shows</label>
    <input
      id="show-search"
      v-model="model"
      class="search-input__field"
      type="search"
      name="q"
      :placeholder="placeholder ?? 'Search by show name...'"
      autocomplete="off"
      enterkeyhint="search"
    />
  </form>
</template>

<style scoped>
.search-input {
  flex: 1;
  max-width: 420px;
}

.search-input__field {
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  color: var(--color-text);
}

.search-input__field:focus-visible {
  border-color: var(--color-accent);
}
</style>
