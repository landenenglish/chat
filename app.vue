<template>
  <NuxtRouteAnnouncer />

  <AppTopbar />

  <NuxtLayout>
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>
