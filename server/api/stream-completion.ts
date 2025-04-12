import { getOpenRouterHeaders } from '~/server/utils/openrouter'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate request body
  if (!body.model || !body.messages || !Array.isArray(body.messages)) {
    return createError({
      statusCode: 400,
      statusMessage: 'Invalid request format',
      data: {
        message: 'Model and messages are required',
      },
    })
  }

  try {
    const requestBody = {
      model: body.model,
      messages: body.messages,
      stream: true,
    }

    // Development logging only
    if (process.dev) {
      console.log('Sending request to OpenRouter', { model: body.model })
    }

    const httpReferer = process.dev
      ? 'http://localhost:3000'
      : 'https://chat-app-production.com' // Replace with your production URL

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          ...getOpenRouterHeaders(),
          'HTTP-Referer': httpReferer,
          'X-Title': 'Chat App',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
      })

      return createError({
        statusCode: response.status,
        statusMessage: `OpenRouter API error: ${response.statusText}`,
        data: { message: errorText },
      })
    }

    // Set response headers for streaming
    setResponseHeaders(event, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    })

    // Create a ReadableStream to pipe the response
    return new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader()
        if (!reader) {
          controller.error(new Error('No reader available from response body'))
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            controller.enqueue(value)
          }
        } catch (error) {
          console.error('Stream reading error:', error)
          controller.error(error)
        } finally {
          controller.close()
        }
      },
    })
  } catch (error) {
    console.error('Stream error:', error)
    return createError({
      statusCode: 500,
      statusMessage: 'Error streaming from OpenRouter',
      data: {
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    })
  }
})
