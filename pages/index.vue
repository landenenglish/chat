<script setup lang="ts">
import { useClientStorage } from '~/composables/useClientStorage'

const model = useClientStorage<Model>('selected-model')
const company = useClientStorage<Company>('selected-company')
</script>

<template>
  <div class="flex h-[95dvh] w-full flex-col overflow-hidden">
    <div class="flex-none p-4">
      <div class="mx-auto w-full max-w-xl">
        <ModelPicker v-model:model="model" v-model:company="company" />
      </div>
    </div>
    <main class="relative min-h-0 flex-1 overflow-hidden">
      <ChatInterface v-if="model" :model="model" class="absolute inset-0" />
    </main>
  </div>
</template>
