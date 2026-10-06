<template>
  <div class="spinner" role="status" aria-label="Loading">
    <span class="spinner__circle" />
  </div>
</template>

<style scoped>
.spinner {
  display: flex;
  justify-content: center;
  padding: var(--space-lg);
}

.spinner__circle {
  width: 2rem;
  height: 2rem;
  border: 3px solid var(--color-accent-soft);
  border-top-color: var(--color-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
