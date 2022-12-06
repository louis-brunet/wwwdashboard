<script setup lang="ts">
import type { Todo } from "../todos";

interface TodoProps {
  todo: Todo;
}
//const props =
withDefaults(defineProps<TodoProps>(), {});

const handleDelete = () => alert("delete!");
const handleDone = () => alert("done!");
const handleEdit = () => alert("edit!");
</script>

<template>
  <div class="todo-item">
    <div class="todo-header">
      <h3 class="todo-title">{{ todo.title }}</h3>
      <div class="todo-time">{{ todo.date }}</div>
    </div>
    <div class="todo-content">{{ todo.content }}</div>
    <div class="todo-buttons">
      <button @click="handleEdit">edit</button>
      <button @click="handleDelete">delete</button>
      <button @click="handleDone">done</button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  border: 1px solid green;
}

.todo-item > * {
  padding: 1em;
}

.todo-header {
  display: flex;
  place-content: center space-between;
  border-bottom: 1px solid green;
}
.todo-buttons {
  display: flex;
  place-content: center end;
  border-top: 1px solid green;
}
</style>
