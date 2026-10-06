<script setup lang="ts">
import { computed } from 'vue'
import type { TvShow } from '@/api/types'
import AppSpinner from '@/components/atoms/AppSpinner.vue'
import GenreTag from '@/components/atoms/GenreTag.vue'
import PosterImage from '@/components/atoms/PosterImage.vue'
import RatingBadge from '@/components/atoms/RatingBadge.vue'

const props = defineProps<{
  show: TvShow | null | undefined
  isLoading: boolean
  isError: boolean
  notFound: boolean
}>()

const networkName = computed(
  () => props.show?.network?.name ?? props.show?.webChannel?.name ?? null,
)

const scheduleText = computed(() => {
  const schedule = props.show?.schedule
  if (!schedule || schedule.days.length === 0) {
    return null
  }

  return `${schedule.days.join(', ')}${schedule.time ? ` at ${schedule.time}` : ''}`
})
</script>

<template>
  <div class="show-detail">
    <AppSpinner v-if="isLoading" />

    <section v-else-if="notFound" class="state-message" aria-labelledby="show-not-found-heading">
      <h2 id="show-not-found-heading">Show not found</h2>
      <p>The show you are looking for could not be found.</p>
    </section>

    <p v-else-if="isError" class="state-message state-message--error" role="alert">
      Something went wrong while loading this show.
    </p>

    <article v-else-if="show" class="show-detail__content">
      <PosterImage
        class="show-detail__poster"
        :name="show.name"
        :src="show.image?.original ?? show.image?.medium ?? null"
      />

      <div class="show-detail__meta">
        <header class="show-detail__header">
          <h1 class="show-detail__title">{{ show.name }}</h1>

          <ul class="show-detail__genres" aria-label="Genres">
            <li v-for="genre in show.genres" :key="genre">
              <GenreTag :label="genre" />
            </li>
          </ul>

          <p class="show-detail__rating">
            <span class="visually-hidden">Rating</span>
            <RatingBadge :rating="show.rating.average" />
          </p>
        </header>

        <dl class="show-detail__facts">
          <div v-if="show.status">
            <dt>Status</dt>
            <dd>{{ show.status }}</dd>
          </div>
          <div v-if="show.premiered">
            <dt>Premiered</dt>
            <dd>{{ show.premiered }}</dd>
          </div>
          <div v-if="show.ended">
            <dt>Ended</dt>
            <dd>{{ show.ended }}</dd>
          </div>
          <div v-if="show.runtime">
            <dt>Runtime</dt>
            <dd>{{ show.runtime }} min</dd>
          </div>
          <div v-if="show.language">
            <dt>Language</dt>
            <dd>{{ show.language }}</dd>
          </div>
          <div v-if="networkName">
            <dt>Network</dt>
            <dd>{{ networkName }}</dd>
          </div>
          <div v-if="scheduleText">
            <dt>Schedule</dt>
            <dd>{{ scheduleText }}</dd>
          </div>
          <div v-if="show.officialSite">
            <dt>Official site</dt>
            <dd>
              <a :href="show.officialSite" target="_blank" rel="noopener noreferrer">
                Visit website
              </a>
            </dd>
          </div>
        </dl>

        <section v-if="show.summary" class="show-detail__summary" aria-labelledby="show-summary-heading">
          <h2 id="show-summary-heading">Summary</h2>
          <div class="show-detail__summary-text" v-html="show.summary" />
        </section>
      </div>
    </article>
  </div>
</template>

<style scoped>
.show-detail__content {
  display: grid;
  gap: var(--space-lg);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
  box-shadow: var(--shadow-soft);
}

.show-detail__poster {
  max-width: 280px;
}

.show-detail__header {
  margin-bottom: var(--space-lg);
}

.show-detail__title {
  font-size: 1.75rem;
  margin-bottom: var(--space-md);
}

.show-detail__genres {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin: 0 0 var(--space-md);
  padding: 0;
  list-style: none;
}

.show-detail__rating {
  margin: 0;
}

.show-detail__facts {
  display: grid;
  gap: var(--space-sm);
  margin: 0 0 var(--space-lg);
}

.show-detail__facts div {
  display: grid;
  grid-template-columns: 7rem 1fr;
  gap: var(--space-sm);
}

.show-detail__facts dt {
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.show-detail__facts dd {
  margin: 0;
  font-size: 0.875rem;
}

.show-detail__facts a {
  color: var(--color-accent);
  text-decoration: underline;
}

.show-detail__summary h2 {
  font-size: 1.125rem;
  margin-bottom: var(--space-sm);
}

.show-detail__summary-text {
  color: var(--color-text-muted);
  line-height: 1.6;
}

.show-detail__summary-text :deep(p) {
  margin-bottom: var(--space-sm);
}

@media (min-width: 768px) {
  .show-detail__content {
    grid-template-columns: 280px 1fr;
    align-items: start;
  }
}
</style>
