<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const todo = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emit('update:modelValue', newVal)
  }
})

const todoInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  todoInput.value?.focus()
})
</script>

<template>
  <div>
    <input
      ref="todoInput"
      type="text"
      v-model="todo"
      placeholder="來做點事吧！"
      class="py-1 text-lg px-2 rounded"
    />
  </div>
</template>

<style scoped></style>
