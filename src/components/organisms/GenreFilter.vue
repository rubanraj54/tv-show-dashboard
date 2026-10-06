<script setup lang="ts">
const selectedGenres = defineModel<string[]>({ default: () => [] })

defineProps<{
  genres: string[]
}>()

function clearAll() {
  selectedGenres.value = []
}
</script>

<template>
  <aside class="genre-filter">
    <form class="genre-filter__form" @submit.prevent>
      <fieldset class="genre-filter__fieldset">
        <legend class="genre-filter__legend">
          <span>Genres</span>
          <button
            v-if="selectedGenres.length > 0"
            class="genre-filter__clear"
            type="button"
            @click="clearAll"
          >
            Clear
          </button>
        </legend>

        <p v-if="genres.length === 0" class="genre-filter__empty">
          Load more shows to discover genres.
        </p>

        <ul v-else class="genre-filter__list">
          <li v-for="genre in genres" :key="genre">
            <label class="genre-filter__option">
              <input v-model="selectedGenres" type="checkbox" :value="genre" />
              <span class="genre-filter__label">{{ genre }}</span>
            </label>
          </li>
        </ul>
      </fieldset>
    </form>
  </aside>
</template>

<style scoped>
.genre-filter {
  position: sticky;
  top: calc(var(--header-height) + var(--space-md));
  padding: var(--space-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-soft);
}

.genre-filter__form {
  margin: 0;
}

.genre-filter__fieldset {
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.genre-filter__legend {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  width: 100%;
  margin-bottom: var(--space-md);
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
}

.genre-filter__clear {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-accent);
}

.genre-filter__empty {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.genre-filter__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  list-style: none;
  max-height: 24rem;
  overflow-y: auto;
}

.genre-filter__option {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease;
}

.genre-filter__option:hover {
  background: var(--color-accent-soft);
}

.genre-filter__option:has(input:checked) {
  background: var(--color-accent-soft);
  border-color: var(--color-accent);
}

.genre-filter__option input[type='checkbox'] {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.genre-filter__label {
  font-size: 0.875rem;
  color: var(--color-text);
  line-height: 1.3;
}

@media (max-width: 768px) {
  .genre-filter {
    position: static;
  }

  .genre-filter__list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    max-height: none;
  }

  .genre-filter__option {
    width: auto;
  }
}
</style>
