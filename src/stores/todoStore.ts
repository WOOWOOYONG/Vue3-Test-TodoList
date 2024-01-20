import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { type TodoItem } from '@/types'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<TodoItem[]>([])

  const addTodo = (todo: string) => {
    if (todo.length === 0) {
      alert('請先輸入待辦')
      return
    }
    todos.value = [
      ...todos.value,
      {
        title: todo,
        id: Date.now(),
        completed: false
      }
    ]
  }

  const toggleTodo = (selectedId: number) => {
    for (const todo of todos.value) {
      if (todo.id === selectedId) {
        todo.completed = !todo.completed
        break
      }
    }
  }

  const deleteTodo = (selectedId: number) => {
    todos.value = todos.value.filter((todo) => todo.id !== selectedId)
  }

  const undoneCount = computed(() => {
    return todos.value.filter((todo) => {
      return todo.completed === false
    }).length
  })

  const filteredState = ref('all')

  const changeState = (state: string) => {
    filteredState.value = state
  }

  const filteredTodos = computed(() => {
    return setTodoByState(filteredState.value)
  })

  const setTodoByState = (state: string) => {
    switch (state) {
      case 'all':
        return todos.value
      case 'undone':
        return todos.value.filter((todo) => !todo.completed)
      case 'done':
        return todos.value.filter((todo) => todo.completed)
      default:
        return todos.value
    }
  }

  return {
    todos,
    filteredTodos,
    filteredState,
    undoneCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    changeState
  }
})
