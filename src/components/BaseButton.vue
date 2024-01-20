<script setup lang="ts">
import { computed } from 'vue'

interface BtnProps {
  btnType: 'normal' | 'green' | 'yellow'
  disabled: boolean
}

const props = withDefaults(defineProps<BtnProps>(), {
  btnType: 'normal',
  disabled: false
})

const getBtnType = (type: string) => {
  switch (type) {
    case 'normal':
      return 'btn-normal'
    case 'green':
      return 'btn-green'
    case 'yellow':
      return 'btn-yellow'
    default:
      return 'btn-normal'
  }
}

const btnClass = computed(() => {
  return getBtnType(props.btnType)
})
</script>

<template>
  <button
    type="button"
    class="btn disabled:cursor-auto disabled:opacity-70"
    :class="btnClass"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-normal {
  @apply bg-gray-300 text-gray-800;
}

.btn-normal:not(:disabled):hover {
  @apply hover:bg-gray-400;
}

.btn-green {
  @apply bg-green-600 text-gray-100;
}

.btn-green:not(:disabled):hover {
  @apply hover:bg-green-700;
}

.btn-yellow {
  @apply text-gray-900 bg-[#fae77dfd];
}

.btn-yellow:not(:disabled):hover {
  @apply hover:bg-[#fae77dfd]/80;
}
</style>
