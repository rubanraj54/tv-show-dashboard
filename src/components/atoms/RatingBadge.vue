<script setup lang="ts">
import { computed } from 'vue'
import { getRatingTier } from '@/utils/getRatingTier'

const props = defineProps<{
  rating: number | null
}>()

const tier = computed(() => getRatingTier(props.rating))
</script>

<template>
  <span class="rating-badge" :class="`rating-badge--${tier}`">
    <span class="rating-badge__icon" aria-hidden="true">★</span>
    <span class="rating-badge__value">
      <template v-if="rating !== null">{{ rating.toFixed(1) }}</template>
      <template v-else>N/A</template>
    </span>
  </span>
</template>

<style scoped>
.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  width: fit-content;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  border: 1px solid transparent;
}

.rating-badge__icon {
  font-size: 0.65rem;
}

.rating-badge--excellent {
  background: var(--color-rating-excellent-bg);
  color: var(--color-rating-excellent-text);
  border-color: rgb(74 124 98 / 12%);
}

.rating-badge--good {
  background: var(--color-rating-good-bg);
  color: var(--color-rating-good-text);
  border-color: rgb(90 127 150 / 12%);
}

.rating-badge--fair {
  background: var(--color-rating-fair-bg);
  color: var(--color-rating-fair-text);
  border-color: rgb(154 123 79 / 12%);
}

.rating-badge--low {
  background: var(--color-rating-low-bg);
  color: var(--color-rating-low-text);
  border-color: rgb(168 107 107 / 12%);
}

.rating-badge--none {
  background: var(--color-rating-none-bg);
  color: var(--color-rating-none-text);
  border-color: rgb(139 145 154 / 12%);
}
</style>
