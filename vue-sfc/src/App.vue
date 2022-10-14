<script setup>
import { provide, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const todoLists = reactive({});

function handleAddTodo() {
  const id = Number(Object.keys(todoLists).at(-1)) + 1;
  todoLists[id] = [];
  localStorage.setItem("todos", JSON.stringify(todoLists));
  router.push(`/todo/${id}`);
}

function handleRemoveTodo() {
  delete todoLists[route.params.id];
  localStorage.setItem("todos", JSON.stringify(todoLists));
  router.push(`/`);
}

function addTodo(todoListId, text) {
  const todos = todoLists[todoListId];
  const id = Math.max(-1, ...todos.map((todo) => todo.id)) + 1;
  todos.push({
    text: text,
    done: false,
    id: id,
  });
}

function updateTodo(todoListId, newTodo) {
  const todos = todoLists[todoListId];
  const index = todos.findIndex((todo) => todo.id === newTodo.id);
  todos[index] = newTodo;
}

function removeTodo(todoListId, id) {
  const todos = todoLists[todoListId];
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);
}

router.beforeEach(() => {
  const loadedTodoLists = JSON.parse(localStorage.getItem("todos")) || {};
  Object.assign(todoLists, loadedTodoLists);
});

provide("todoLists", { todoLists, addTodo, updateTodo, removeTodo });

// watch
watch(todoLists, (newValue) => {
  localStorage.setItem("todos", JSON.stringify(newValue));
});
</script>

<template>
  <div>
    <button type="button" @click="handleAddTodo">Add todo list</button>
    <router-link
      v-for="(todoList, key) of todoLists"
      :key="key"
      :to="`/todo/${key}`"
    >
      Todo list {{ key }}
    </router-link>
    <button type="button" @click="handleRemoveTodo">Remove todo list</button>
  </div>
  <RouterView></RouterView>
</template>
