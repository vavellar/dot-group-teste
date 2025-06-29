<template>
  <v-card
    class="movie-card d-flex flex-column justify-space-between mb-4"
    elevation="4"
    style="width: 250px"
  >
    <div class="image-wrapper">
      <v-skeleton-loader
        type="image"
        height="300px"
      />
    </div>

    <v-card-actions class="d-flex flex-column flex-grow-1 justify-between px-4 py-3">
      <v-skeleton-loader
        type="text"
        width="80%"
        class="my-2"
      />
      <v-skeleton-loader
        type="text"
        width="40%"
        class="my-1"
      />
      <v-skeleton-loader
        type="text"
        width="60%"
        class="my-1"
      />
      <v-spacer />
      <v-skeleton-loader
        type="rect"
        width="100%"
        height="36px"
        class="mt-2"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.movie-card {
  width: 250px;
}

.image-wrapper {
  position: relative;
}
</style>
