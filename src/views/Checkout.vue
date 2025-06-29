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
      <v-col cols="12" md="6">
        <v-sheet class="pa-2 ma-2">
          <h3>Finalizar compra</h3>
          <div class="mt-4">
            <v-text-field
                variant="outlined"
                bg-color="white"
                :error="v$.nomeCompleto.$error"
                :error-messages="v$.nomeCompleto.$errors.map(e => e.$message)"
                label="Nome Completo"
                v-model="form.nomeCompleto"
                @blur="v$.nomeCompleto.$touch()"
            />

            <v-row no-gutters>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                      variant="outlined"
                      bg-color="white"
                      :error="v$.cpf.$error"
                      :error-messages="v$.cpf.$errors.map(e => e.$message)"
                      label="CPF"
                      v-maska="'###-###-###-##'"
                      @blur="v$.cpf.$touch()"
                      v-model="form.cpf"
                  />
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                      variant="outlined"
                      bg-color="white"
                      :error="v$.celular.$error"
                      :error-messages="v$.celular.$errors.map(e => e.$message)"
                      label="Celular"
                      v-maska="'(##) # ####-####'"
                      @blur="v$.celular.$touch()"
                      v-model="form.celular"
                  />
                </v-sheet>
              </v-col>
            </v-row>

            <v-text-field
                variant="outlined"
                bg-color="white"
                :error="v$.email.$error"
                :error-messages="v$.email.$errors.map(e => e.$message)"
                label="E-mail"
                @blur="v$.email.$touch()"
                v-model="form.email"
            />

            <v-row no-gutters>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                      variant="outlined"
                      bg-color="white"
                      :error="v$.cep.$error"
                      :error-messages="v$.cep.$errors.map(e => e.$message)"
                      label="CEP"
                      v-maska="'#####-###'"
                      @blur="v$.cep.$touch()"
                      v-model="form.cep"
                  />
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                      variant="outlined"
                      bg-color="white"
                      :error="v$.endereco.$error"
                      :error-messages="v$.endereco.$errors.map(e => e.$message)"
                      label="Endereço"
                      @blur="v$.endereco.$touch()"
                      v-model="form.endereco"
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
                      :error="v$.cidade.$error"
                      :error-messages="v$.cidade.$errors.map(e => e.$message)"
                      label="Cidade"
                      @blur="v$.cidade.$touch()"
                      v-model="form.cidade"
                  />
                </v-sheet>
              </v-col>
              <v-col>
                <v-sheet class="py-2 my-2">
                  <v-text-field
                      variant="outlined"
                      bg-color="white"
                      :error="v$.estado.$error"
                      @blur="v$.estado.$touch()"
                      :error-messages="v$.estado.$errors.map(e => e.$message)"
                      label="Estado"
                      v-model="form.estado"
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
            @click="submitForm"
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

import {computed, ref} from "vue";
import {formatToBRL} from "../utils/index.js";
import {useRouter} from "vue-router";
import {useStore} from "vuex";
import useVuelidate from "@vuelidate/core";
import {email, helpers, maxLength, minLength, required} from "@vuelidate/validators";
import { vMaska } from "maska/vue"
import Swal from "sweetalert2";

const store = useStore()

const cartItems = computed(() => store.getters['cart/items'])
const cartTotalPrice = computed(() => store.getters['cart/totalPrice'])

const removeItem = (id) => {
  store.dispatch('cart/removeFromCart', id)
}

const form = ref({
  nomeCompleto: '',
  cpf: '',
  celular: '',
  email: '',
  cep: '',
  endereco: '',
  cidade: '',
  estado: ''
})

const rules = {
  nomeCompleto: { required: helpers.withMessage('Nome é obrigatório', required) },
  cpf: {
    required: helpers.withMessage('CPF é obrigatório', required),
    minLength: helpers.withMessage('CPF deve ter 11 dígitos', minLength(14)),
    maxLength: helpers.withMessage('CPF deve ter 11 dígitos', maxLength(14)),
  },
  celular: { required: helpers.withMessage('Celular é obrigatório', required) },
  email: { required: helpers.withMessage('E-mail é obrigatório', required), email: helpers.withMessage('E-mail inválido', email) },
  cep: { required: helpers.withMessage('CEP é obrigatório', required) },
  endereco: { required: helpers.withMessage('Endereço é obrigatório', required) },
  cidade: { required: helpers.withMessage('Cidade é obrigatória', required) },
  estado: { required: helpers.withMessage('Estado é obrigatório', required) },
}

const v$ = useVuelidate(rules, form)

function submitForm() {
  v$.value.$touch()
  if (!v$.value.$invalid) {
    Swal.fire({
      title: 'Obrigado!',
      text: 'Sua compra foi finalizada com sucesso',
      icon: 'success',
      cancelButtonColor: 'white',
      cancelButtonText: "Ir para loja",
      showCancelButton: true,
      showConfirmButton: false
    }).then(() => {
      router.push('/')
      store.dispatch('cart/clearCart')
    })
  } else {
    Swal.fire({
      title: 'Atenção!',
      text: 'Campos do formulário não preenchidos!',
      icon: 'error',
      showConfirmButton: false,
      cancelButtonColor: 'white',
      cancelButtonText: "FECHAR",
      showCancelButton: true,
    })
  }
}

const getPosterUrl = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/500x750?text=No+Image'

const router = useRouter()
</script>
