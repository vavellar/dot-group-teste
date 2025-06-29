import {getMovies, searchMovie} from "@/services/MoviesService.js";

let scrollHandler = null

export const moviesStore = {
  namespaced: true,
  state: () => ({
    movies: [],
    currentPage: 1,
    loading: false
  }),

  getters: {
    movies: state => state.movies,
    isLoading: state => state.loading
  },

  mutations: {
    setLoading(state, value) {
      state.loading = value
    },
    addMovies(state, movies) {
      state.movies.push(...movies)
    },
    setMovies(state, movies) {
      state.movies = movies
    },
    incrementPage(state) {
      state.currentPage += 1
    },
    reset(state) {
      state.movies = []
      state.currentPage = 1
      state.loading = false
    }
  },

  actions: {
    async fetchMovies({ commit, state }) {
      commit('setLoading', true)
      const { data } = await getMovies({ page: state.currentPage })
      const newMovies = data.results.map(movie => ({
        ...movie,
        price: generateFakePrice()
      }))
      commit('addMovies', newMovies)
      commit('setLoading', false)
    },

    async fetchMoviesByName({ commit }, name) {
      commit('setLoading', true)
      try {
        const { data } = await searchMovie({ query: name })
        const foundMovies = data.results.map(movie => ({
          ...movie,
          price: generateFakePrice()
        }))
        commit('setMovies', foundMovies)
      } finally {
        commit('setLoading', false)
      }
    },

    handleScroll({ state, dispatch, commit }) {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight

      if (scrollTop + windowHeight + 200 >= fullHeight && !state.loading) {
        commit('incrementPage')
        dispatch('fetchMovies')
      }
    },

    async init({ dispatch }) {
      await dispatch('fetchMovies')
      scrollHandler = () => dispatch('handleScroll')
      window.addEventListener('scroll', scrollHandler)
    },

    destroy() {
      if (scrollHandler) {
        window.removeEventListener('scroll', scrollHandler)
        scrollHandler = null
      }
    },

    reset({ commit }) {
      commit('reset')
    }
  }
}

function generateFakePrice() {
  return (Math.random() * 50 + 10).toFixed(2)
}
