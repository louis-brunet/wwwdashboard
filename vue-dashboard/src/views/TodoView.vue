<script setup lang="ts">
import { getCurrentUser } from "../firebase";
import { onMounted, ref } from "vue";
import api from "../api";

import type { Ref } from "vue";
import type { User } from "@firebase/auth";
import type { Todo } from "../todos";

import TodoItem from "@/components/TodoItem.vue";
import TodoCreate from "@/components/TodoCreate.vue";

const user: Ref<null | User> = ref(null);
const todos: Ref<Todo[]> = ref([]);
const creatingTodo = ref(false);

onMounted(refreshTodos);

async function refreshTodos() {
  user.value = await getCurrentUser();
  if (user.value) {
    todos.value = await api.getTodos(user.value.uid);
  }
}

function handleCreated(/*todo: Todo*/): void {
  creatingTodo.value = false;
  refreshTodos();
}
</script>

<template>
  <div>
    <template v-if="!creatingTodo">
      <button @click="creatingTodo = true">Create</button>
    </template>

    <template v-else>
      <button @click="creatingTodo = false">Cancel</button>
      <TodoCreate @created="handleCreated" />
    </template>

    <TodoItem v-for="todo in todos" :key="todo.todoId" :todo="todo" />

    <!--<hr />
    <code>
      {{ JSON.stringify(user).replace(",", ", ") }}
    </code>-->
  </div>
</template>
