<template>
  <v-container
    class="text-center d-flex flex-column align-center justify-center fill-height"
  >
    <v-icon color="grey" size="48">mdi-cart-off</v-icon>
    <p class="text-subtitle-1 mt-2">
      Seu carrinho está vazio.
    </p>
  </v-container>
</template>

<script setup>
import {computed} from "vue";
import store from "@/store/index.js";

</script>
