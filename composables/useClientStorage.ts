import { StorageSerializers, useStorage } from '@vueuse/core'

export function useClientStorage<T>(
  key: string,
  defaultValue: T | undefined = undefined
) {
  const data = ref<T | undefined>(defaultValue)

  const storage = useStorage<T | undefined>(
    key,
    defaultValue,
    import.meta.client ? localStorage : undefined,
    {
      serializer: StorageSerializers.object,
      writeDefaults: false,
    }
  )

  if (import.meta.client) {
    const saved = localStorage.getItem(key)

    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        data.value = parsed
        storage.value = parsed
      } catch (e) {
        console.warn(`Failed to parse stored value for key "${key}"`, e)
      }
    }

    watch(
      storage,
      (newValue) => {
        data.value = newValue
      },
      { immediate: true }
    )

    watch(
      data,
      (newValue) => {
        storage.value = newValue
      },
      { immediate: true }
    )
  }

  return data as Ref<T>
}
