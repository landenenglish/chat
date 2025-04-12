<script lang="ts" setup>
const { disabled = false, showReset = false } = defineProps<{
  disabled?: boolean
  showReset?: boolean
}>()

const model = defineModel<string>()

const emit = defineEmits<{
  send: [message: string]
  reset: []
}>()

const { textarea, input } = useTextareaAutosize({ styleProp: 'height' })

watchEffect(() => (model.value = input.value.trim()))

const send = () => {
  if (!model.value || disabled) {
    return
  }

  emit('send', model.value)
  model.value = ''
  input.value = ''
}

const reset = () => {
  emit('reset')
}

// Enter sends on desktop, but not on mobile
// Shift+Enter allows new lines without sending
const onKeydown = (e: KeyboardEvent) => {
  if (
    e.key === 'Enter' &&
    !e.shiftKey &&
    !window.matchMedia('(max-width: 768px)').matches
  ) {
    e.preventDefault()
    send()
  }
}

// Auto focus. Timeout hack for now because click event conflicted with focus
onMounted(() => setTimeout(() => textarea.value?.focus(), 100))
</script>

<template>
  <div class="fixed inset-x-0 bottom-0 w-full">
    <div class="mx-auto w-full max-w-3xl p-4">
      <div class="relative">
        <textarea
          v-model="input"
          class="slim-scrollbar max-h-[200px] w-full resize-none rounded-xl border border-surface-200 bg-surface-50 p-3 pr-12 focus:border-primary-500 focus:outline-none dark:border-surface-700 dark:bg-surface-800"
          rows="1"
          placeholder="Ask Anything"
          @keydown="onKeydown"
          ref="textarea"
        />
        <button
          v-if="model"
          class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-all hover:scale-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-transparent"
          @click="send"
          :disabled="disabled"
        >
          <i
            class="pi pi-send -translate-y-[1px] translate-x-[1px] -rotate-45 text-lg text-primary-500 transition-transform"
          />
        </button>
        <button
          v-if="showReset"
          class="absolute -top-10 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface-100 text-surface-500 transition-all hover:bg-surface-200 hover:text-surface-900 dark:bg-surface-700 dark:text-surface-400 dark:hover:bg-surface-600 dark:hover:text-surface-50"
          @click="reset"
          title="Reset chat"
          v-tooltip.top="'Reset chat'"
        >
          <i class="pi pi-refresh text-sm" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea {
  min-height: 50px;
  line-height: 1.5;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

textarea::-webkit-scrollbar {
  display: none;
}
</style>
