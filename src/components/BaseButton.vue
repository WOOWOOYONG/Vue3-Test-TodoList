<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ btnType: string }>()

const getBtnType = (type: string) => {
  switch (type) {
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
  <button type="button" class="btn" :class="btnClass">
    <slot></slot>
  </button>
</template>

<style scoped>
.btn-normal {
  @apply bg-gray-300 hover:bg-gray-400 text-gray-800;
}

.btn-green {
  @apply bg-green-600 text-gray-100 hover:bg-green-700;
}

.btn-yellow {
  @apply text-gray-900 bg-[#ffcf6f] hover:bg-[#F7BE38]/90;
}
</style>
