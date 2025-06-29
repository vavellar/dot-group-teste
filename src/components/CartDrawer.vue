<template>
  <v-navigation-drawer
      location="right"
      temporary
      width="500"
  >
    <template v-if="cartItems.length === 0">
      <EmptyState
          text="Não há nenhum item no carrinho."
          icon="mdi-cart-off"
          class="grid-content"
      />
    </template>
    <div v-else class="cart-grid">
      <div class="grid-header">
        <v-toolbar flat>
          <v-toolbar-title>Carrinho</v-toolbar-title>
          <v-spacer />
          <v-btn @click="clearCart" variant="text" color="error">
            Esvaziar carrinho
          </v-btn>
        </v-toolbar>
      </div>
      <div class="grid-content">
        <div class="content-wrapper">
          <div
              v-for="(item, index) in cartItems"
              :key="item.id"
          >
            <div class="align-center px-4 py-2 d-flex justify-lg-space-between">
              <v-col cols="3">
                <v-img
                    :src="getPosterUrl(item.backdrop_path)"
                    rounded
                    height="100"
                    width="100"
                />
              </v-col>
              <v-col cols="3" class="text-left">{{ item.title }}</v-col>
              <v-col cols="2" class="text-center">{{ item.quantity }}</v-col>
              <v-col cols="3" class="text-right">{{ formatToBRL(item.price * item.quantity) }}</v-col>
              <v-btn
                  icon
                  @click="removeItem(item.id)"
                  size="x-small"
                  class="mx-1"
              >
                <v-icon color="red">mdi-delete</v-icon>
                <v-tooltip
                    activator="parent"
                    location="top"
                >Remover do carrinho</v-tooltip>
              </v-btn>
            </div>
            <v-divider/>
          </div>
        </div>
      </div>
      <div class="grid-footer">
        <div class="footer-content pa-4 border-t">
          <div class="d-flex justify-space-between py-2">
            <h3>Total</h3>
            <h3>{{ formatToBRL(cartTotalPrice) }}</h3>
          </div>
          <v-btn color="primary" block @click="router.push('/checkout')">
            Finalizar Compra
          </v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import {computed, watch} from 'vue'
import { useRouter } from 'vue-router'
import { formatToBRL } from '../utils/index.js'
import { useStore } from 'vuex'
import EmptyState from '@/components/EmptyState.vue'

const router = useRouter()
const store = useStore()

const cartItems = computed(() => store.getters['cart/items'])
const cartTotalPrice = computed(() => store.getters['cart/totalPrice'])

const clearCart = () => {
  store.dispatch('cart/clearCart')
}

const removeItem = (id) => {
  store.dispatch('cart/removeFromCart', id)
}

const getPosterUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'

</script>

<style scoped>
.grid-content {
  height: 68vh;
  overflow-y: scroll;
}
</style>
