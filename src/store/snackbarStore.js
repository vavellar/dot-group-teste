export const snackbarStore = {
  namespaced: true,
  state: () => ({
    show: false,
    message: '',
    color: 'success', // padrão
    timeout: 3000,
    location: 'top right'
  }),
  mutations: {
    showSnackbar(state, { message, color = 'success', timeout = 3000, location = 'top right' }) {
      state.message = message
      state.color = color
      state.timeout = timeout
      state.location = location
      state.show = true
    },
    hideSnackbar(state) {
      state.show = false
    }
  },
  actions: {
    trigger({ commit }, payload) {
      commit('showSnackbar', payload)
    }
  }
}
