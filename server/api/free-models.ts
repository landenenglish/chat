import { getOpenRouterHeaders } from '~/server/utils/openrouter'

export default defineEventHandler(async () => {
  const filterToFreeModels = (models: Model[]) => {
    const isFree = (model: Model) =>
      Object.values(model.pricing).every((price) => price === '0')

    return models.filter(isFree)
  }

  const sortModels = (models: Model[]) =>
    models.sort((a, b) => b.context_length - a.context_length)

  const groupModelsByCompany = (models: Model[]): Company[] => {
    const companyMap = new Map<string, Model[]>()

    models.forEach((model) => {
      const company = model.name.split(':')[0]

      if (!company) {
        return
      }

      const companyModels = companyMap.get(company) || []
      companyModels.push(model)
      companyMap.set(company, companyModels)
    })

    return Array.from(companyMap.entries()).map(([companyName, models]) => ({
      companyName,
      models,
    }))
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: getOpenRouterHeaders(),
    })

    const { data }: { data: Model[] } = await response.json()

    const models = groupModelsByCompany(sortModels(filterToFreeModels(data)))

    return {
      total: models.length,
      data: models,
    }
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Error fetching OpenRouter models',
      data: error,
    })
  }
})
