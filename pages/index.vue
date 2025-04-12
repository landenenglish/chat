<script setup lang="ts">
const model = ref<Model>()
</script>

<template>
  <div class="mx-auto flex h-full max-w-xl flex-col items-center gap-4">
    <ModelPicker v-model:model="model" />

    <div v-if="model" class="flex flex-col gap-4">
      <div class="flex flex-col gap-2">
        <h2 class="text-2xl font-bold">
          {{ model.name }}
        </h2>
      </div>
    </div>
  </div>
</template>
