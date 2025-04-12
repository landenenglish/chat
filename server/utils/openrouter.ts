export const getOpenRouterHeaders = () => {
  const config = useRuntimeConfig()
  return {
    Authorization: `Bearer ${config.openRouter.apiKey}`,
    'Content-Type': 'application/json',
  }
}
