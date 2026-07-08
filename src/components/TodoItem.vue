<script setup>
import { ref } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-todo', 'edit-todo', 'delete-todo'])

const isEditing = ref(false)
const editedTitle = ref(props.todo.title)

function saveEdit() {
  const trimmedTitle = editedTitle.value.trim()

  if (!trimmedTitle) {
    return
  }

  emit('edit-todo', props.todo, trimmedTitle)
  isEditing.value = false
}
</script>

<template>
  <article class="todo-item">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle-todo', todo)"
    />

    <span
      v-if="!isEditing"
      :class="{ completed: todo.completed }"
    >
      {{ todo.title }}
    </span>

    <input
      v-else
      v-model="editedTitle"
      class="edit-input"
      @keyup.enter="saveEdit"
    />

    <div class="actions">
      <button v-if="!isEditing" @click="isEditing = true">
        Módosítás
      </button>

      <button v-else @click="saveEdit">
        Mentés
      </button>

      <button class="danger" @click="emit('delete-todo', todo.id)">
        Törlés
      </button>
    </div>
  </article>
</template>