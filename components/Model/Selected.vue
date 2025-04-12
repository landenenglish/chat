<script lang="ts" setup>
const { company, model } = defineProps<{
  company: Company
  model: Model
}>()

const emit = defineEmits<{
  'show-details': [event: Event]
  clear: []
}>()

const formatModelName = (name: string) => {
  return name.replace(/^[^:]+:\s*/, '').replace(/\s*\(free\)$/, '')
}
</script>

<template>
  <div class="flex w-full items-center">
    <div
      class="flex w-full flex-col rounded-lg border border-gray-200 bg-surface-50 px-3 py-2 shadow-sm transition-colors dark:border-surface-700 dark:bg-surface-800"
    >
      <div class="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3">
        <button @click="emit('show-details', $event)" class="flex-none">
          <i
            class="pi pi-info-circle text-sm text-primary-500 transition-colors hover:text-primary-600"
          />
        </button>

        <div class="flex justify-center text-center">
          <div class="inline-flex items-center gap-1 break-normal">
            <span class="font-medium text-surface-900 dark:text-surface-100">
              {{ company.companyName }}
            </span>
            <span class="text-surface-400 dark:text-surface-500">/</span>
            <span class="font-medium text-surface-900 dark:text-surface-100">
              {{ formatModelName(model.name) }}
            </span>
          </div>
        </div>

        <button
          class="flex-none text-surface-500 transition-colors hover:text-primary-500"
          @click="emit('clear')"
        >
          <i class="pi pi-trash text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>
