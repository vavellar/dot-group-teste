<template>
  <v-container
      class="fill-height d-flex flex-column justify-center align-center text-center"
  >
    <h1 class="display-1 font-weight-bold">404</h1>
    <p class="headline mb-4">Página não encontrada</p>
    <p class="mb-4">A página que você está tentando acessar não existe.</p>
    <v-btn color="primary" @click="goHome">Voltar para a Loja</v-btn>
  </v-container>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
