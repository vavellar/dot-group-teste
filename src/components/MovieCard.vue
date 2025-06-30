<template>
  <v-card class="movie-card d-flex flex-column justify-space-between" elevation="4">
    <div class="image-wrapper">
      <v-img
        :src="posterUrl"
        :alt="movie.title"
        height="300px"
        class="movie-card__image"
        cover
      ></v-img>

      <v-btn
        icon
        class="favorite-btn"
        :color="isFavorited(movie.id) ? 'red' : 'grey lighten-1'"
        @click.stop="toggleFavorite(movie)"
        :aria-label="isFavorited(movie.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <v-icon>{{ isFavorited ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>
      <p class="release_date font-weight-bold">{{ convertDate(movie.release_date) }}</p>
    </div>

    <v-card-actions class="d-flex flex-column flex-grow-1 justify-between px-4 py-3">
      <div class="movie-card__title text-center">
        <h4>{{ movie.title }}</h4>
      </div>
      <div class="d-flex align-center mt-1">
        <v-icon color="yellow darken-3" size="18">mdi-star</v-icon>
        <span class="ml-1">{{ (movie.vote_average ?? '0.0').toFixed(1) }}</span>
      </div>
      <span class="font-weight-medium">{{ formatToBRL(movie.price) }}</span>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="addToCart(movie)" class="w-100" variant="tonal">
        <v-icon start>mdi-plus</v-icon>
        Adicionar
      </v-btn>
    </v-card-actions>
  </v-card>


</template>

<script setup>
import { computed, defineProps, defineEmits, ref } from 'vue'
import {useStore} from "vuex";
import {formatToBRL} from "../utils/index.js";

const props = defineProps({
  movie: { type: Object, required: true },
})

const store = useStore()

const addToCart = (movie) => {
  store.dispatch('cart/addToCart', movie)
}

const favorites = computed(() => store.getters['favorites/favorites'])

const isFavorited = (movieId) => {
  return favorites.value.some(f => f.id === movieId)
}

const posterUrl = computed(() =>
  props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image'
)



const toggleFavorite = (movie) => {
  store.dispatch('favorites/toggleFavorite', movie)
  if(isFavorited(movie.id)) {
    store.dispatch('snackbar/trigger', {
      message: `Item "${movie.title}" adicionado aos favoritos!`,
      color: 'green',
    })
  } else {
    store.dispatch('snackbar/trigger', {
      message: `Item "${movie.title}" removido dos favoritos!`,
      color: 'red',
    })
  }
}

const convertDate = (date) => {
  if (!date) return
  const dateFormatted = new Date(date + "T00:00:00");

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Intl.DateTimeFormat('pt-BR', options).format(dateFormatted);
}
</script>

<style scoped>
.movie-card {
  width: 250px;
  position: relative;
}

.image-wrapper {
  position: relative;
}

.favorite-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.favorite-btn:hover {
  background-color: rgba(255, 255, 255, 1);
}

.release_date {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 1rem;
  white-space: nowrap; /* impede quebra de linha, opcional */
  text-align: center;
}
</style>
