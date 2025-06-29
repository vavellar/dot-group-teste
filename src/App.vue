<template>
  <v-app>
    <Header
      @openCart="isCartOpen = !isCartOpen"
      @openFavorites="isFavoritesOpen = !isFavoritesOpen"
    />
    <v-main>
      <router-view />
    </v-main>
    <CartDrawer
      v-model="isCartOpen"
    />
    <FavoritesDrawer v-model="isFavoritesOpen"/>
    <v-snackbar
      v-model="show"
      :timeout="timeout"
      :color="color"
      :location="location"
    >
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import store from "@/store/index.js";

const isCartOpen = ref(false)
const isFavoritesOpen = ref(false)

watch(() => isCartOpen.value, (value) => {
  if (value) {
    isFavoritesOpen.value = false
  }
})

watch(() => isFavoritesOpen.value, (value) => {
  if (value) {
    isCartOpen.value = false
  }
})


const show = computed({
  get: () => store.state.snackbar.show,
  set: (value) => {
    if (!value) store.commit('snackbar/hideSnackbar')
  }
})
const message = computed(() => store.state.snackbar.message)
const color = computed(() => store.state.snackbar.color)
const timeout = computed(() => store.state.snackbar.timeout)
const location = computed(() => store.state.snackbar.location)

</script>
