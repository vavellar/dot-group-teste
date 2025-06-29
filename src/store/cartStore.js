// src/store/cartStore.js
import store from "@/store/index.js";

export const cartStore = {
  namespaced: true,
  state: () => ({
    items: []
  }),
  getters: {
    itemCount: state => {
      return state.items.reduce((total, item) => total + (item.quantity ?? 1), 0)
    },
    totalPrice: state => {
      return state.items.reduce((sum, item) => sum + Number(item.price) * (item.quantity ?? 1), 0)
    },
    items: state => state.items,
  },
  mutations: {
    addItem(state, newItem) {
      const existingItem = state.items.find(item => item.id === newItem.id)
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 1) + 1
      } else {
        state.items.push({
          ...newItem,
          quantity: 1
        })
      }
      store.dispatch('snackbar/trigger', {
        message: `Item "${newItem.title}" adicionado ao carrinho!`,
        color: 'green',
      })
    },
    removeItem(state, itemId) {
      state.items = state.items.filter(i => i.id !== itemId)
    },
    clearCart(state) {
      state.items = []
    }
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addItem', item)
    },
    removeFromCart({ commit }, itemId) {
      commit('removeItem', itemId)
    },
    clearCart({ commit }) {
      commit('clearCart')
    }
  }
}
