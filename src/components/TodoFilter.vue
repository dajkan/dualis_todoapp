<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

function setFilter(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="filters">
    <button
      :class="{ active: modelValue === 'all' }"
      @click="setFilter('all')"
    >
      Összes
    </button>

    <button
      :class="{ active: modelValue === 'active' }"
      @click="setFilter('active')"
    >
      Aktív
    </button>

    <button
      :class="{ active: modelValue === 'completed' }"
      @click="setFilter('completed')"
    >
      Kész
    </button>
  </div>
</template>