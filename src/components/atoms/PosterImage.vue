<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  src: string | null
}>()

const initial = computed(() => props.name.charAt(0).toUpperCase())
</script>

<template>
  <div class="poster">
    <img v-if="src" :src="src" :alt="name" class="poster__image" loading="lazy" />
    <div v-else class="poster__placeholder" aria-hidden="true">
      {{ initial }}
    </div>
  </div>
</template>

<style scoped>
.poster {
  width: 100%;
  aspect-ratio: 2 / 3;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background: var(--color-accent-soft);
}

.poster__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.poster__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 2rem;
  font-weight: 600;
  color: var(--color-accent);
}
</style>
