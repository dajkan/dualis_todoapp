<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-todo'])

const title = ref('')

function submitTodo() {
  const trimmedTitle = title.value.trim()

  if (!trimmedTitle) {
    return
  }

  emit('add-todo', trimmedTitle)
  title.value = ''
}
</script>

<template>
  <form class="todo-form" @submit.prevent="submitTodo">
    <input
      v-model="title"
      type="text"
      placeholder="Új feladat..."
    />

    <button type="submit">
      Hozzáadás
    </button>
  </form>
</template>