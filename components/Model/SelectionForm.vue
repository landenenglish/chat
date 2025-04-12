<script lang="ts" setup>
const { companies } = defineProps<{
  companies: Company[]
}>()

const selectedCompany = defineModel<Company>('company', { required: false })
const selectedModel = defineModel<Model>('model', { required: false })

const availableModels = computed(() => selectedCompany.value?.models ?? [])

const formatModelName = (name: string) => {
  return name.replace(/^[^:]+:\s*/, '').replace(/\s*\(free\)$/, '')
}
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div
      v-if="selectedCompany"
      class="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-surface-50 p-4 shadow-sm transition-colors dark:border-surface-700 dark:bg-surface-800"
    >
      <div class="flex flex-col gap-1">
        <div class="text-sm text-surface-500 dark:text-surface-400">
          Company
        </div>
        <div class="font-medium text-surface-900 dark:text-surface-100">
          {{ selectedCompany.companyName }}
        </div>
      </div>
      <button
        class="text-surface-500 transition-colors hover:text-primary-500"
        @click="selectedCompany = undefined"
      >
        <i class="pi pi-times text-sm" />
      </button>
    </div>

    <Select
      v-if="!selectedCompany"
      v-model="selectedCompany"
      :options="companies"
      optionLabel="companyName"
      placeholder="Select a Company"
      class="slim-scrollbar w-full"
    >
      <template #option="{ option }">
        <div class="flex items-center">
          <div class="font-medium text-surface-900 dark:text-surface-100">
            {{ option.companyName }}
          </div>
        </div>
      </template>
    </Select>

    <Select
      v-if="selectedCompany && !selectedModel"
      v-model="selectedModel"
      :options="availableModels"
      optionLabel="name"
      :placeholder="`Select a model from ${selectedCompany?.companyName}`"
      class="slim-scrollbar w-full"
    >
      <template #option="{ option }">
        <div class="flex items-center">
          <div class="w-full">
            <div class="font-medium text-surface-900 dark:text-surface-100">
              {{ formatModelName(option.name) }}
            </div>
            <div
              v-if="option.context_length"
              class="text-sm text-surface-500 dark:text-surface-400"
            >
              Context Length: {{ option.context_length.toLocaleString() }}
            </div>
          </div>
        </div>
      </template>
    </Select>
  </div>
</template>
