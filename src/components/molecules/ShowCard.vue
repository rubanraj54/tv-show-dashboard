<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { TvShow } from '@/api/types'
import PosterImage from '@/components/atoms/PosterImage.vue'
import RatingBadge from '@/components/atoms/RatingBadge.vue'

defineProps<{
  show: TvShow
}>()
</script>

<template>
  <RouterLink :to="`/shows/${show.id}`" class="show-card">
    <PosterImage :name="show.name" :src="show.image?.medium ?? null" />
    <div class="show-card__body">
      <h3 class="show-card__title">{{ show.name }}</h3>
      <div class="show-card__footer">
        <RatingBadge :rating="show.rating.average" />
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.show-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: var(--card-width);
  height: 100%;
  flex-shrink: 0;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-soft);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.show-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgb(61 68 81 / 10%);
}

.show-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-sm);
  min-height: 0;
}

.show-card__title {
  min-height: var(--card-title-height);
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.show-card__footer {
  margin-top: auto;
}
</style>
