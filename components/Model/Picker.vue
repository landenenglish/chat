<script lang="ts" setup>
const { data: models } = await useFetch<{ data: Company[] }>('/api/free-models')

const selectedModel = defineModel<Model>('model', { required: false })
const selectedCompany = defineModel<Company>('company', { required: false })

const popover = useTemplateRef('popover')

const companies = computed<Company[]>(() => models.value?.data ?? [])

const clearSelection = () => {
  selectedModel.value = undefined
  selectedCompany.value = undefined
}

const toggleShowDetails = (event: Event) => {
  popover.value?.toggle(event)
}
</script>

<template>
  <div
    class="flex h-full w-full max-w-[800px] flex-col items-center justify-center gap-2 p-2"
  >
    <Popover ref="popover" class="w-96">
      <ModelDetails :company="selectedCompany" :model="selectedModel" />
    </Popover>

    <ModelSelected
      v-if="selectedCompany && selectedModel"
      :company="selectedCompany"
      :model="selectedModel"
      @show-details="toggleShowDetails"
      @clear="clearSelection"
    />

    <ModelSelectionForm
      v-if="!selectedModel"
      v-model:company="selectedCompany"
      v-model:model="selectedModel"
      :companies="companies"
    />
  </div>
</template>
