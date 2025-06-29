<template>
  <v-navigation-drawer
    location="right"
    temporary
    width="500"
    class="d-flex flex-column fill-height"
    @update:model-value="val => emit('update:open', val)"
  >
    <v-toolbar flat>
      <v-toolbar-title>Favoritos</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container
      v-if="favorites.length === 0"
      class="text-center d-flex flex-column align-center justify-center fill-height"
    >
      <v-icon color="grey" size="48">mdi-heart-off</v-icon>
      <p class="text-subtitle-1 mt-2">
        Não há nenhum item na sua lista de favoritos
      </p>
    </v-container>

    <v-sheet class="flex-grow-1 overflow-y-auto" v-else>
      <v-list>
        <v-list-item
          v-for="item in favorites"
          :key="item.id"
        >
          <div class="d-flex align-center w-100">
            <v-img
              :src="getPosterUrl(item.backdrop_path)"
              rounded
              max-height="60"
              height="60"
              max-width="60"
            />

            <div class="d-flex align-center justify-space-between flex-grow-1 ml-3 overflow-hidden">
              <div class="text-truncate">
                <strong>{{ item.title }}</strong>
              </div>

              <div class="d-flex align-center ml-4">
                <span class="font-weight-medium">R$ {{ item.price }}</span>
                <v-btn icon @click="addToCart(item)" size="x-small" class="ml-6">
                  <v-icon color="green">mdi-cart-outline</v-icon>
                </v-btn>
                <v-btn icon @click="removeItem(item)" size="x-small" class="ml-4">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </div>

          <v-divider></v-divider>
        </v-list-item>
      </v-list>
    </v-sheet>
  </v-navigation-drawer>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'
import store from "@/store/index.js";

const emit = defineEmits(['update:open'])

const favorites = computed(() => store.getters['favorites/favorites'])

const removeItem = (movie) => {
  store.dispatch('favorites/removeFavorite', movie)
}

const addToCart = (movie) => {
  store.dispatch('cart/addToCart', movie)
}

const getPosterUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'
</script>
