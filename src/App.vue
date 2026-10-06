<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import SearchInput from '@/components/molecules/SearchInput.vue'
import { useShowSearch } from '@/composables/useShowSearch'

const route = useRoute()
const { query } = useShowSearch()

const isShowDetailPage = computed(() => route.name === 'show-detail')
</script>

<template>
  <div class="app-shell">
    <header class="app-header">
      <nav class="app-header__nav" aria-label="Primary">
        <RouterLink to="/" class="app-header__title">TV Shows</RouterLink>
      </nav>
      <SearchInput v-if="!isShowDetailPage" v-model="query" />
    </header>

    <main id="main-content" class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-header__nav {
  display: flex;
  align-items: center;
}
</style>
