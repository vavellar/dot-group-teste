<template>
  <v-navigation-drawer
    location="right"
    temporary
    width="500"
    class="d-flex flex-column fill-height"
    @update:model-value="val => emit('update:open', val)"
  >
    <EmptyState
        v-if="favorites.length === 0"
        text="Não há nenhum item na sua lista de favoritos."
        icon="mdi-heart-off"
    />
    <div v-else>
      <v-toolbar flat>
        <v-toolbar-title>Favoritos</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-sheet class="flex-grow-1 overflow-y-auto">
        <v-list class="mb-16">
          <div
              v-for="(item) in favorites"
              :key="item.id"
          >
            <div class="align-center px-4 py-2 d-flex justify-lg-space-between w-100">
              <v-col cols="3">
                <v-img
                    :src="getPosterUrl(item.backdrop_path)"
                    rounded
                    height="100"
                    width="100"
                />
              </v-col>
              <v-col cols="3" class="text-left">{{ item.title }}</v-col>
              <v-col cols="3" class="text-right">{{ formatToBRL(item.price) }}</v-col>
              <div class="d-flex align-center ml-4">
                <v-btn
                    icon
                    @click="addToCart(item)"
                    size="x-small"
                    class="mx-1"
                >
                  <v-icon color="green">mdi-cart-outline</v-icon>
                  <v-tooltip
                      activator="parent"
                      location="top"
                  >Adicionar ao carrinho</v-tooltip>
                </v-btn>

                <v-btn
                    icon
                    @click="removeItem(item)"
                    size="x-small"
                    class="mx-1"
                >
                  <v-icon color="red">mdi-delete</v-icon>
                  <v-tooltip
                      activator="parent"
                      location="top"
                  >Remover dos favoritos</v-tooltip>
                </v-btn>
              </div>
            </div>
            <v-divider/>
          </div>
        </v-list>
      </v-sheet>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import {defineProps, defineEmits, computed} from 'vue'
import store from "@/store/index.js";
import EmptyState from "@/components/EmptyState.vue";
import {formatToBRL} from "@/utils/index.js";

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
