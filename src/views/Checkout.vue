<template>
  <v-container>
    <div v-if="cartItems.length === 0">
      <EmptyCart />
      <div class="d-flex justify-center">
        <v-btn
          class="mt-4"
          color="secondary"
          text="Volte para a loja e adicione novos items no carrinho"
          @click="router.push('/')"
        />
      </div>
    </div>
    <v-row no-gutters v-else>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>Finalizar compra</h3>
          <div class="mt-4">
            <v-text-field
              variant="outlined"
              bg-color="white"
              :hide-details="true"
              label="Nome Completo"
            />
            <v-row no-gutters>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                    variant="outlined"
                    bg-color="white"
                    :hide-details="true"
                    label="CPF"
                  />
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                    variant="outlined"
                    bg-color="white"
                    :hide-details="true"
                    label="Celular"
                  />
                </v-sheet>
              </v-col>
            </v-row>
            <v-text-field
              variant="outlined"
              bg-color="white"
              :hide-details="true"
              label="E-mail"
            />
            <v-row no-gutters>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                    variant="outlined"
                    bg-color="white"
                    :hide-details="true"
                    label="CEP"
                  />
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                    variant="outlined"
                    bg-color="white"
                    :hide-details="true"
                    label="Endereço"
                  />
                </v-sheet>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                    variant="outlined"
                    bg-color="white"
                    :hide-details="true"
                    label="Cidade"
                  />
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                    variant="outlined"
                    bg-color="white"
                    :hide-details="true"
                    label="Estado"
                  />
                </v-sheet>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-container>
            <v-row class="align-center font-weight-bold text-grey-darken-2 pb-3">
              <v-col cols="2" class="text-left">Imagem</v-col>
              <v-col cols="2" class="text-left">Nome</v-col>
              <v-col cols="2" class="text-center">Qtd</v-col>
              <v-col cols="3" class="text-right">Preço</v-col>
            </v-row>

            <v-divider class="mb-2"></v-divider>

            <v-row v-for="item in cartItems" :key="item.id" class="align-center">
              <v-col cols="2">
                <v-img :src="getPosterUrl(item.backdrop_path)" rounded height="100" width="100"/>
              </v-col>
              <v-col cols="2" class="text-left">{{ item.title }}</v-col>
              <v-col cols="2" class="text-center">{{ item.quantity }}</v-col>
              <v-col cols="3" class="text-right">{{ formatToBRL(item.price * item.quantity) }}</v-col>
              <v-btn icon @click="removeItem(item.id)" size="x-small">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </v-container>
          <v-divider class="mb-2"></v-divider>
          <div class="d-flex justify-lg-space-between px-4">
            <h2>Total</h2>
            <h2>
              {{ formatToBRL(cartTotalPrice) }}
            </h2>
          </div>
        </v-sheet>
        <div class="w-100 d-flex justify-center pa-6">
          <v-btn
            color="light-blue-darken-4"
            class="w-100"
            text="Finalizar"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>

import {computed} from "vue";
import {formatToBRL} from "../utils/index.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";

const store = useStore()

const cartItems = computed(() => store.getters['cart/items'])
const cartTotalPrice = computed(() => store.getters['cart/totalPrice'])

const removeItem = (id) => {
  store.dispatch('cart/removeFromCart', id)
}

const getPosterUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'

const router = useRouter()
</script>
