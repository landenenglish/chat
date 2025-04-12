export interface Model {
  id: string
  name: string
  created: number
  description: string
  architecture: {
    input_modalities: string[]
    output_modalities: string[]
    tokenizer: string
  }
  top_provider: {
    is_moderated: boolean
  }
  pricing: {
    prompt: string
    completion: string
    image: string
    request: string
    input_cache_read: string
    input_cache_write: string
    web_search: string
    internal_reasoning: string
  }
  context_length: number
  per_request_limits: Record<string, string>
}

export interface Company {
  companyName: string
  models: Model[]
}
