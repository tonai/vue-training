<script setup>
// import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// const todos = reactive(JSON.parse(localStorage.getItem("todos")) || {});

function handleAddTodo() {
  const todos = JSON.parse(localStorage.getItem("todos"))
  const id = Number(Object.keys(todos).at(-1)) + 1;
  todos[id] = [];
  localStorage.setItem("todos", JSON.stringify(todos));
  router.push(`/todo/${id}`);
}

function handleRemoveTodo() {
  const todos = JSON.parse(localStorage.getItem("todos"))
  delete todos[route.params.id];
  localStorage.setItem("todos", JSON.stringify(todos));
  router.push(`/`);
}
</script>

<template>
  <div>
    <button type="button" @click="handleAddTodo">Add todo list</button>
    <!-- <router-link v-for="(todo, key) of todos" :key="key" :to="`/todo/${key}`">
      Todo {{ key }}
    </router-link> -->
    <button type="button" @click="handleRemoveTodo">Remove todo list</button>
  </div>
  <RouterView></RouterView>
</template>
