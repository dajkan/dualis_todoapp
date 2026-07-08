<script setup>
import { computed, onMounted, ref } from 'vue'
import TodoForm from './components/TodoForm.vue'
import TodoItem from './components/TodoItem.vue'
import TodoFilter from './components/TodoFilter.vue'

import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo
} from './services/todoService'

const todos = ref([])
const filter = ref('all')
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  todos.value = await getTodos()
  loading.value = false
})

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(todo => !todo.completed)
  }

  if (filter.value === 'completed') {
    return todos.value.filter(todo => todo.completed)
  }

  return todos.value
})

async function handleAddTodo(title) {
  const newTodo = await addTodo(title)
  todos.value.push(newTodo)
}

async function handleToggle(todo) {
  const updatedTodo = {
    ...todo,
    completed: !todo.completed
  }

  const savedTodo = await updateTodo(updatedTodo)

  todos.value = todos.value.map(item =>
    item.id === savedTodo.id ? savedTodo : item
  )
}

async function handleEdit(todo, newTitle) {
  const updatedTodo = {
    ...todo,
    title: newTitle
  }

  const savedTodo = await updateTodo(updatedTodo)

  todos.value = todos.value.map(item =>
    item.id === savedTodo.id ? savedTodo : item
  )
}

async function handleDelete(id) {
  await deleteTodo(id)
  todos.value = todos.value.filter(todo => todo.id !== id)
}
</script>

<template>
  <main class="page">
    <section class="todo-card">
      <h1>Vue To-Do Lista</h1>
      <p class="subtitle">
        Egyszerű feladatkezelő hozzáadással, módosítással, törléssel és szűréssel.
      </p>

      <TodoForm @add-todo="handleAddTodo" />

      <TodoFilter v-model="filter" />

      <p v-if="loading">Betöltés...</p>

      <div v-else class="todo-list">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          @toggle-todo="handleToggle"
          @edit-todo="handleEdit"
          @delete-todo="handleDelete"
        />

        <p v-if="filteredTodos.length === 0" class="empty">
          Nincs megjeleníthető feladat.
        </p>
      </div>
    </section>
  </main>
</template>