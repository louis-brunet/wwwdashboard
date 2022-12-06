<script setup lang="ts">
import { ref, onMounted } from "vue";

import type { Ref } from "vue";
import type { User } from "@firebase/auth";
import { getCurrentUser } from "@/firebase";
import api from "@/api";
import type { Todo } from "@/todos";

const title: Ref<string | null> = ref(null);
const content: Ref<string | null> = ref(null);
const date: Ref<string | null> = ref(null);
const user: Ref<User | null> = ref(null);

const emit = defineEmits<{
  (e: "created", todo: Todo): void;
}>();

function validateForm() {
  return true; // TODO
}

async function createTodo() {
  if (!user.value) return;
  if (!validateForm()) return;
  const createdTodo = await api.postTodo(
    user.value.uid,
    title.value as string,
    content.value as string,
    date.value as string
  );
  console.log(
    `Refreshing after having created todo ${createdTodo.todoId} for uid ${createdTodo.uid}`
  );
  emit("created", createdTodo);
}

onMounted(async () => {
  user.value = await getCurrentUser();
});
</script>

<template>
  <div>
    CREATING TODO { {{ title }}, {{ content }}, {{ date }} }
    <form>
      <div>
        <label for="todo-title">Title: </label>
        <input
          id="todo-title"
          v-model.trim="title"
          type="text"
          name="todo-title"
        />
      </div>
      <div>
        <label for="todo-content">Content: </label>
        <input
          id="todo-content"
          v-model.trim="content"
          type="text"
          name="todo-content"
        />
      </div>
      <div>
        <label for="todo-date">Date: </label>
        <input id="todo-date" v-model="date" type="date" name="todo-date" />
      </div>
    </form>
    <button @click="createTodo">Create</button>
  </div>
</template>
