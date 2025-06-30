<template>
  <v-app-bar app color="#1F2937">
    <div  class="d-flex align-center justify-space-between fill-height w-100">
      <div class="d-flex align-center">
        <v-btn class="ml-8" @click="router.push('/')">LOGO</v-btn>
      </div>

      <div class="d-flex align-center flex-grow-1 justify-center px-4">
        <v-text-field
          variant="default"
          :disabled="route.name !== 'Home'"
          :hide-details="true"
          placeholder="Pesquisa"
          @click:clear="store.dispatch('movies/init')"
          append-inner-icon="mdi-magnify"
          :clearable="true"
          v-model="search"
          max-width="500"
          width="100%"
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
import {useRoute, useRouter} from "vue-router";

const store = useStore()
const cartCount = computed(() => store.getters['cart/itemCount'])
const favoritesCount = computed(() => store.getters['favorites/favoritesCount'])

const search = ref('')
const route = useRoute()
const router = useRouter()

const searchMovies = () => {
  if (search.value.trim()) {
    store.dispatch('movies/fetchMoviesByName', search.value.trim())
  }
}

const debouncedSearch = debounce(searchMovies, 500)

watch(() => search.value, (value) => {
  if (!value) {
    store.dispatch('movies/reset')
    store.dispatch('movies/init')
    return
  }
  debouncedSearch()
})
</script>

<style scoped>
.v-app-bar {
  height: 64px;
}
</style>
