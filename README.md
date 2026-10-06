# TV Show Dashboard

A Vue 3 dashboard for browsing TV shows by genre, using the [TVMaze API](https://www.tvmaze.com/api).

## Run

Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev
```

Other scripts: `npm run test:unit`, `npm run build`, `npm run preview`.

## Libraries

- **Vue 3** — UI
- **Vue Router** — dashboard and show detail routes
- **Pinia** — recently viewed shows
- **TanStack Query** — fetching, caching, and pagination
- **Vite** — dev server and production build
- **TypeScript**
- **Vitest** — unit tests

## Folder structure

```
src/
  api/            TVMaze client and types
  components/     atoms, molecules, organisms
  composables/    data hooks (show index, search)
  pages/          dashboard and show detail
  stores/         recently viewed shows
  utils/          grouping, sorting, rating helpers
```

## Decisions

**TVMaze cannot fetch shows by genre.** There is no genre endpoint or genre query parameter. The app loads the paginated index (`GET /shows?page=N`) and groups shows on the client. A show can appear in more than one genre row. Each row is sorted by rating, highest first.

The first page loads on startup. A **Load more** tile at the end of a row fetches the next two pages, up to 100 shows in that genre. Pages are shared across genres and fetched one at a time so the API rate limit is respected. Genre rows with fewer than 3 shows stay hidden.

Server data (pages, search, show details) is cached with TanStack Query. Pinia only stores recently viewed shows.

Show summaries from TVMaze are HTML fragments, rendered with `v-html`.

Data from [TVmaze](https://www.tvmaze.com), licensed under [CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0/).
