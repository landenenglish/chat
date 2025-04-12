<script setup lang="ts">
import { marked } from 'marked'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: number
}

const props = defineProps<{
  messages: Readonly<Message[]>
  isStreaming: boolean
  currentChunk?: string
  error?: string | null
}>()

const messagesContainer = ref<HTMLDivElement>()

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch([() => props.messages, () => props.currentChunk], () => {
  nextTick(scrollToBottom)
})

onMounted(scrollToBottom)

const renderMarkdown = (content: string) => {
  return marked(content)
}

const formatTimestamp = (timestamp?: number) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

const nonSystemMessages = computed(() =>
  props.messages.filter((message) => message.role !== 'system')
)
</script>

<template>
  <div
    ref="messagesContainer"
    class="slim-scrollbar flex-1 overflow-y-auto px-4 py-8 pb-[100px]"
  >
    <div class="mx-auto w-full max-w-3xl">
      <div class="flex flex-col gap-6">
        <div
          v-for="(message, index) in nonSystemMessages"
          :key="index + message.content"
          class="flex flex-col gap-2"
        >
          <div
            v-if="message.role === 'user'"
            class="ml-auto flex max-w-[80%] items-end gap-2"
          >
            <div class="rounded-2xl bg-primary-600 px-4 py-2 text-white">
              <div
                v-html="renderMarkdown(message.content)"
                class="text-white"
              ></div>
            </div>
          </div>
          <div v-else class="mr-auto flex max-w-[80%] items-end gap-2">
            <div class="rounded-2xl px-4 py-2">
              <div class="flex flex-col gap-1">
                <div
                  v-html="renderMarkdown(message.content)"
                  class="prose prose-sm dark:prose-invert"
                ></div>
                <div v-if="message.timestamp" class="text-xs text-surface-500">
                  {{ formatTimestamp(message.timestamp) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Streaming message -->
        <div
          v-if="currentChunk && isStreaming"
          class="mr-auto flex max-w-[80%] items-end gap-2"
        >
          <div class="rounded-2xl px-4 py-2">
            <div
              v-html="renderMarkdown(currentChunk) + '●'"
              class="prose prose-sm dark:prose-invert"
            ></div>
          </div>
        </div>
        <!-- Loading indicator -->
        <div
          v-if="isStreaming && !currentChunk"
          class="mr-auto flex max-w-[80%] items-end gap-2"
        >
          <div class="flex items-center gap-2 rounded-2xl px-4 py-2">
            <div
              class="h-2 w-2 animate-bounce rounded-full bg-surface-400"
            ></div>
            <div
              class="h-2 w-2 animate-bounce rounded-full bg-surface-400 [animation-delay:0.2s]"
            ></div>
            <div
              class="h-2 w-2 animate-bounce rounded-full bg-surface-400 [animation-delay:0.4s]"
            ></div>
          </div>
        </div>
        <!-- Error message -->
        <div v-if="error" class="mx-auto text-sm text-red-500">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>
