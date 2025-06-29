<template>
  <v-navigation-drawer
    location="right"
    temporary
    width="500"
  >

    <EmptyCart v-if="cartItems.length === 0"/>

    <div v-else>
      <v-toolbar>
        <v-toolbar-title>Carrinho</v-toolbar-title>
        <v-btn @click="clearCart">
          Esvaziar carrinho
        </v-btn>
      </v-toolbar>
      <v-row v-for="item in cartItems" :key="item.id" class="align-center px-4">
        <v-col cols="3">
          <v-img
            :src="getPosterUrl(item.backdrop_path)" rounded height="100" width="100"/>
        </v-col>
        <v-col cols="2" class="text-left">{{ item.title }}</v-col>
        <v-col cols="2" class="text-center">{{ item.quantity }}</v-col>
        <v-col cols="3" class="text-right">{{ formatToBRL(item.price * item.quantity) }}</v-col>
        <v-btn icon @click="removeItem(item.id)" size="x-small">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
        <v-divider />
      </v-row>


      <div class="pa-4 position-absolute bottom-0 w-100">
        <v-btn color="primary" block @click="router.push('/checkout')">
          Finalizar Compra
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import {computed, defineEmits} from 'vue'
import {useRouter} from "vue-router";
import {formatToBRL} from "../utils/index.js";
import EmptyCart from "@/components/EmptyCart.vue";
import {useStore} from "vuex";


const router = useRouter()
const store = useStore()

const cartItems = computed(() => store.getters['cart/items'])

const clearCart = () => {
  store.dispatch('cart/clearCart')
}

const removeItem = (id) => {
  store.dispatch('cart/removeFromCart', id)
}

const getPosterUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'
</script>
