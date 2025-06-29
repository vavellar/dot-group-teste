<template>
  <v-container
    class="text-center d-flex flex-column align-center justify-center fill-height"
  >
    <v-icon color="grey" size="48">{{ icon }}</v-icon>
    <p class="text-subtitle-1 mt-2">
      {{ text }}
    </p>
  </v-container>
</template>

<script setup>

defineProps({
  text: { type: String },
  icon: { type: String }
})
</script>
