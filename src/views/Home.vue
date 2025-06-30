<template>
  <EmptyState
      v-if="movies.length === 0"
      text="Não foram encontrados resultados para sua busca."
      icon="mdi-magnify-close"
  />
  <div class="text-center d-flex flex-column align-center justify-center fill-height" v-else-if="loading">
    <v-progress-circular indeterminate color="blue" :size="80"></v-progress-circular>
  </div>
  <v-container v-else>
    <v-row
      dense
      justify="center"
    >
      <v-col
        v-for="movie in movies"
        :key="movie.id"
        cols="12"
        sm="3"
        class="d-flex justify-center"
      >
        <MovieCard
          :movie="movie"
        />
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { useStore } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'
import {onMounted, onBeforeUnmount, ref, computed} from "vue"
import EmptyState from "@/components/EmptyState.vue";
const store = useStore()

const movies = computed(() => store.getters['movies/movies'])
const loading = computed(() => store.getters['movies/isLoading'])


</script>

<style>
.v-row {
  row-gap: 32px;
  column-gap: 8px;
}
</style>
