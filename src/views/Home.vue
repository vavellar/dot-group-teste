<template>
  <v-container>
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
const store = useStore()

onMounted(() => {
  store.dispatch('movies/init')
})

onBeforeUnmount(() => {
  store.dispatch('movies/destroy')
})

const movies = computed(() => store.getters['movies/movies'])
const loading = computed(() => store.getters['movies/isLoading'])

</script>

<style>
.v-row {
  row-gap: 32px;
  column-gap: 8px;
}
</style>
