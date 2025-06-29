export const favoritesStore = {
  namespaced: true,
  state: () => ({
    favorites: []
  }),
  getters: {
    favoritesCount: state => state.favorites.length,
    isFavorited: state => movieId => state.favorites.some(f => f.id === movieId),
    favorites: state => state.favorites
  },
  mutations: {
    addFavorite(state, movie) {
      if (!state.favorites.find(f => f.id === movie.id)) {
        state.favorites.push(movie)
      }
    },
    removeFavorite(state, movieId) {
      state.favorites = state.favorites.filter(f => f.id !== movieId)
    },
    clearFavorites(state) {
      state.favorites = []
    }
  },
  actions: {
    toggleFavorite({ state, commit }, movie) {
      if (state.favorites.find(f => f.id === movie.id)) {
        commit('removeFavorite', movie.id)
      } else {
        commit('addFavorite', movie)
      }
    },
    clearFavorites({ commit }) {
      commit('clearFavorites')
    },
    removeFavorite({ commit }, movie) {
      commit('removeFavorite', movie.id)
    },
  }
}
