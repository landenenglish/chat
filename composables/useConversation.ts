interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: number
}

interface ConversationOptions {
  model: MaybeRefOrGetter<string>
}

interface StreamChunkDelta {
  content?: string
  role?: string
}

interface StreamChunk {
  choices: {
    delta: StreamChunkDelta
    index: number
    finish_reason: string | null
  }[]
}

export const useConversation = (options: ConversationOptions) => {
  const getInitialMessages = (): Message[] => {
    return [
      {
        role: 'system',
        content: 'You are a helpful assistant. Respond in markdown format.',
        timestamp: Date.now(),
      },
    ]
  }

  const messages = useClientStorage<Message[]>('messages', getInitialMessages())
  const isStreaming = ref(false)
  const currentChunk = ref('')
  const error = ref<string | null>(null)

  const resetMessages = () => {
    messages.value = getInitialMessages()
  }

  const addMessage = (role: Message['role'], content: string) => {
    messages.value.push({ role, content, timestamp: Date.now() })
  }

  const processStreamChunk = (chunk: string) => {
    if (chunk.startsWith('data: ')) {
      const data = chunk.slice(6)
      if (data === '[DONE]') return true

      try {
        const parsed = JSON.parse(data) as StreamChunk
        const content = parsed.choices[0]?.delta?.content
        if (content) {
          currentChunk.value += content
        }
      } catch (e) {
        // Ignore parsing errors for non-JSON chunks (like keepalive comments)
      }
    }
    return false
  }

  const sendMessage = async (content: string) => {
    try {
      error.value = null
      isStreaming.value = true
      currentChunk.value = ''

      // Add user message immediately
      addMessage('user', content)

      const response = await fetch('/api/stream-completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: toValue(options.model),
          messages: messages.value,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader available')

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        let newlineIndex
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const chunk = buffer.slice(0, newlineIndex)
          buffer = buffer.slice(newlineIndex + 1)

          if (processStreamChunk(chunk)) break
        }
      }

      // Add the complete assistant message to history
      if (currentChunk.value) {
        addMessage('assistant', currentChunk.value)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      console.error('Error in sendMessage:', e)
    } finally {
      isStreaming.value = false
    }
  }

  return {
    messages: readonly(messages),
    isStreaming: readonly(isStreaming),
    currentChunk: readonly(currentChunk),
    error: readonly(error),
    sendMessage,
    resetMessages,
  }
}
