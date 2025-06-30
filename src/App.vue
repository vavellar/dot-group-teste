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
import {computed, onMounted, ref, watch} from "vue";
import store from "@/store/index.js";
import {useBodyScroll} from "@/composables/useBodyScroll.js";

const isCartOpen = ref(false)
const isFavoritesOpen = ref(false)

watch(() => isCartOpen.value, (value) => {
  if (value) {
    isFavoritesOpen.value = false
    disableScroll()
  } else {
    enableScroll()
  }
})

watch(() => isFavoritesOpen.value, (value) => {
  if (value) {
    isCartOpen.value = false
    disableScroll()
  } else {
    enableScroll()
  }
})

const { disableScroll, enableScroll } = useBodyScroll()

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

onMounted(() => {
  store.dispatch('movies/init')
})
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.cart-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 1fr 0.2fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}
</style>
