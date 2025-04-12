<script lang="ts" setup>
const { company, model } = defineProps<{
  company?: Company
  model?: Model
}>()

const formatModelName = (name: string = '') => {
  // Removes the company name and the free tag
  return name.replace(/^[^:]+:\s*/, '').replace(/\s*\(free\)$/, '')
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-surface-600 dark:text-surface-400">
        {{ company?.companyName }}
      </span>
      <span class="font-medium text-surface-900 dark:text-surface-100">
        {{ formatModelName(model?.name) }}
      </span>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <span class="text-sm text-surface-600 dark:text-surface-400">
          Context Length:
        </span>
        <span
          class="text-sm font-medium text-surface-900 dark:text-surface-100"
        >
          {{ model?.context_length?.toLocaleString() }}
        </span>
      </div>

      <div v-if="model?.description" class="flex flex-col gap-1">
        <span class="text-sm text-surface-600 dark:text-surface-400">
          Description:
        </span>
        <p class="text-sm text-surface-900 dark:text-surface-100">
          {{ model?.description }}
        </p>
      </div>
    </div>
  </div>
</template>
