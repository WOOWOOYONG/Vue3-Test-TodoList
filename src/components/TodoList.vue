<script setup lang="ts">
import { type TodoItem } from '@/types'
import { useTodoStore } from '@/stores/todoStore'
import { Icon } from '@iconify/vue'

const { toggleTodo, deleteTodo } = useTodoStore()

defineProps<{ todos: TodoItem[] }>()
</script>

<template>
  <ul v-if="todos.length > 0" class="text-lg border-b-2 border-gray-300 pb-4">
    <li
      class="mb-4 flex cursor-pointer justify-between items-center"
      v-for="todo in todos"
      :key="todo.id"
    >
      <div
        class="flex-grow cursor-pointer"
        :class="{ 'text-decoration-line: line-through': todo.completed }"
        @click="toggleTodo(todo.id)"
      >
        <input type="checkbox" :checked="todo.completed" class="cursor-pointer" />
        <span class="pl-4">{{ todo.title }}</span>
      </div>

      <button class="cursor-pointer" type="button" @click="deleteTodo(todo.id)">
        <Icon icon="material-symbols:delete-outline" class="text-2xl hover:text-orange-600" />
      </button>
    </li>
  </ul>
</template>

<style scoped></style>
