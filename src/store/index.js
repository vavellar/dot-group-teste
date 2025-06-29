import { createStore } from 'vuex'
import { cartStore } from './cartStore'
import { favoritesStore } from './favoritesStore'
import {snackbarStore} from "@/store/snackbarStore.js";
import {moviesStore} from "@/store/moviesStore.js";

export default createStore({
  modules: {
    cart: cartStore,
    favorites: favoritesStore,
    snackbar: snackbarStore,
    movies: moviesStore
  }
})
