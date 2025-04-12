<script setup lang="ts">
const { model } = defineProps<{
  model: Model
}>()

const input = ref('')

const modelId = computed(() => model.id)

const {
  messages,
  sendMessage: originalSendMessage,
  isStreaming,
  error,
  currentChunk,
  resetMessages,
} = useConversation({
  model: modelId,
})

const sendMessage = async (content: string) => {
  await originalSendMessage(content)
}

const hasNonSystemMessages = computed(() =>
  messages.value.some((message) => message.role !== 'system')
)
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-hidden">
    <ChatHistory
      :messages="messages"
      :is-streaming="isStreaming"
      :current-chunk="currentChunk"
      :error="error"
    />

    <ChatInput
      v-model="input"
      :disabled="isStreaming"
      :show-reset="hasNonSystemMessages && !isStreaming"
      @send="sendMessage"
      @reset="resetMessages"
      class="z-10"
    />
  </div>
</template>
