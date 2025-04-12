<template>
  <ClientOnly>
    <div class="flex w-full items-center justify-between">
      <a
        :href="`https://github.com/landenenglish/${APP_NAME.toLowerCase()}`"
        target="_blank"
        class="flex min-w-[40px] items-center justify-center text-gray-500 transition-colors duration-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <i class="pi pi-github text-xl"></i>
      </a>

      <h1 class="absolute left-1/2 -translate-x-1/2 text-2xl text-primary-500">
        Free Router
      </h1>

      <div class="flex items-center">
        <ThemeLightDark />
        <ThemePicker />
      </div>
    </div>
  </ClientOnly>
</template>
