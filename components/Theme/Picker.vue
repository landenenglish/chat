<script setup>
const { primaryColors, surfaces, primary, surface, isDarkMode, updateColors } =
  useAppTheme()
</script>

<template>
  <div class="relative">
    <Button
      v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-fadeout',
        hideOnOutsideClick: true,
      }"
      icon="pi pi-cog"
      text
      rounded
      aria-label="Settings"
    />
    <div
      class="absolute right-0 top-16 z-50 hidden w-64 origin-top rounded-md border border-surface-200 bg-white p-4 shadow-lg dark:border-surface-700 dark:bg-surface-900"
    >
      <div class="flex flex-col gap-4">
        <div>
          <span
            class="text-sm font-semibold text-surface-600 dark:text-surface-400"
          >
            Primary
          </span>
          <div class="flex flex-wrap justify-between gap-2 pt-2">
            <button
              v-for="pc of primaryColors"
              :key="pc.name"
              type="button"
              :title="pc.name"
              :class="[
                'h-5 w-5 cursor-pointer rounded-full border-none p-0 focus:outline-none focus:ring-2 focus:ring-offset-2',
                { 'ring-2 ring-primary ring-offset-2': primary === pc.name },
              ]"
              :style="{ backgroundColor: pc.palette['500'] }"
              @click="updateColors('primary', pc.name)"
            />
          </div>
        </div>
        <div>
          <span
            class="text-sm font-semibold text-surface-600 dark:text-surface-400"
            >Surface</span
          >
          <div class="flex flex-wrap justify-between gap-2 pt-2">
            <button
              v-for="s of surfaces"
              :key="s.name"
              type="button"
              :title="s.name"
              :class="[
                'h-5 w-5 cursor-pointer rounded-full border-none p-0 focus:outline-none focus:ring-2 focus:ring-offset-2',
                {
                  'ring-2 ring-primary ring-offset-2': surface
                    ? surface === s.name
                    : isDarkMode
                      ? s.name === 'zinc'
                      : s.name === 'slate',
                },
              ]"
              :style="{ backgroundColor: s.palette['500'] }"
              @click="updateColors('surface', s.name)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
