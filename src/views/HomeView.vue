<script setup lang="ts">
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoStatusTab from '@/components/TodoStatusTab.vue'
import BaseButton from '@/components/BaseButton.vue'

import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todoStore'
import { storeToRefs } from 'pinia'

const { todos, filteredTodos, undoneCount } = storeToRefs(useTodoStore())
const { addTodo } = useTodoStore()
onMounted(() => {
  // 模擬從API取得
  todos.value = [
    {
      id: 1,
      title: '學習Vue',
      completed: true
    },
    {
      id: 2,
      title: '學習TypeScript',
      completed: false
    },
    {
      id: 3,
      title: '學習Docker',
      completed: false
    }
  ]
})

const todo = ref('')

const submitNewTodo = (newTodo: string) => {
  addTodo(newTodo)
  todo.value = ''
}
</script>

<template>
  <main>
    <section class="py-20 container flex justify-center items-center flex-col mx-auto">
      <h1 class="text-3xl mb-10 font-medium">待辦事項</h1>
      <div class="px-12 pt-6 pb-8 bg-[#f5f5f5] shadow rounded-md">
        <TodoStatusTab />
        <div class="flex mb-10 items-center gap-2">
          <TodoInput v-model.trim="todo" @keypress.enter="submitNewTodo(todo)" />
          <BaseButton @click="submitNewTodo(todo)" btn-type="green"> 新增 </BaseButton>
        </div>
        <TodoList :todos="filteredTodos" />
        <p v-if="undoneCount > 0" class="mt-4 text-right text-lg">
          目前共有{{ undoneCount }}項待完成
        </p>
        <p v-else class="mt-10 text-right text-lg">目前沒有待辦囉～</p>
      </div>
    </section>
  </main>
</template>
