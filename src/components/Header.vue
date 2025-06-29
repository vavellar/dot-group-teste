<template>
  <v-app-bar app color="teal-lighten-4">
    <div style="width: 100%" class="d-flex align-center justify-space-between fill-height">
      <div class="d-flex align-center">
        <h3 class="ml-8">LOGO</h3>
      </div>

      <div class="d-flex align-center flex-grow-1 justify-center px-4">
        <v-text-field
          variant="outlined"
          bg-color="white"
          :hide-details="true"
          placeholder="Pesquisa"
          append-inner-icon="mdi-magnify"
          v-model="search"
          style="max-width: 500px; width: 100%;"
        ></v-text-field>
      </div>

      <div class="d-flex align-center mr-4">
        <v-badge
          @click="$emit('openFavorites')"
          :content="favoritesCount"
          color="red"
          overlap
          bordered
        >
          <v-btn icon >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
        </v-badge>

        <v-badge
          @click="$emit('openCart')"
          :content="cartCount"
          color="red"
          overlap
          bordered
        >
          <v-btn icon>
            <v-icon>mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>

import {computed, ref, watch} from "vue";
import {useStore} from "vuex";
import {debounce} from "lodash";

const store = useStore()
const cartCount = computed(() => store.getters['cart/itemCount'])
const favoritesCount = computed(() => store.getters['favorites/favoritesCount'])

const search = ref('')

const searchMovies = () => {
  if (search.value.trim()) {
    store.dispatch('movies/fetchMoviesByName', search.value.trim())
  } else {
    store.dispatch('movies/reset')
    store.dispatch('movies/init')
  }
}

const debouncedSearch = debounce(searchMovies, 500)

watch(() => search.value, () => {
  debouncedSearch()
})
</script>

<style scoped>
.v-app-bar {
  height: 64px;
}
</style>
