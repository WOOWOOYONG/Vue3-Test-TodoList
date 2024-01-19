import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '@/stores/todoStore'

describe('use TodoStore', () => {
  let store
  beforeEach(() => {
    setActivePinia(createPinia())
    // Mock Date.now()
    vi.spyOn(Date, 'now')
      .mockReturnValueOnce(1)
      .mockReturnValueOnce(2)
      .mockReturnValueOnce(3)
      .mockReturnValueOnce(4)
    store = useTodoStore()
    store.addTodo('學習Vue')
    store.addTodo('學習TypeScript')
    store.addTodo('學習Docker')
    store.toggleTodo(1)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('add todo', () => {
    const store = useTodoStore()
    store.addTodo('學習Nuxt')
    const todos = store.todos

    expect(todos[todos.length - 1]).toEqual({
      title: '學習Nuxt',
      completed: false,
      id: 4
    })
  })

  it('delete todo', () => {
    const store = useTodoStore()
    store.addTodo('學習Nuxt')
    store.deleteTodo(4)
    expect(store.todos.length).toBe(3)
  })

  it('toggle todo', () => {
    const store = useTodoStore()
    store.addTodo('學習Nuxt')
    store.toggleTodo(4)
    const toggledTodo = store.todos.find((todo) => todo.id === 4)

    expect(toggledTodo).toBeDefined()
    expect(toggledTodo?.completed).toBe(true)
  })

  it('show all todo', () => {
    const store = useTodoStore()
    store.changeState('all')
    expect(store.filteredTodos.length).toBe(3)
    expect(store.filteredTodos).toEqual(store.todos)
  })

  it('show undone todo', () => {
    const store = useTodoStore()
    store.changeState('undone')
    const undoneTodos = store.todos.filter((todo) => !todo.completed)
    expect(store.filteredTodos.length).toBe(undoneTodos.length)
    expect(store.filteredTodos).toEqual(undoneTodos)
  })

  it('show done todo', () => {
    const store = useTodoStore()
    store.changeState('done')
    const doneTodos = store.todos.filter((todo) => todo.completed)
    expect(store.filteredTodos.length).toBe(doneTodos.length)
    expect(store.filteredTodos).toEqual(doneTodos)
  })
})
