<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import TodoItem from "./TodoItem.vue";

// data
const title = ref("Vue.js Todo App");
const newTodo = ref("");
const todos = reactive(JSON.parse(localStorage.getItem("todos")) || []);
const id = ref(Math.max(-1, ...todos.map((todo) => todo.id)) + 1);
const display = ref("todo");
const input = ref(null);

// computed
const allDone = computed(
  () => todos.length > 0 && todos.every((todo) => todo.done)
);
const allDoneLabel = computed(() => (allDone.value ? "Nothing to do" : ""));
const filteredTodos = computed(() =>
  todos.filter(
    (todo) =>
      display.value === "all" ||
      (display.value === "done" && todo.done) ||
      (display.value === "todo" && !todo.done)
  )
);
const indeterminate = computed(() =>
  todos.some((todo) => todo.done !== todos[0].done)
);

// methods
function findTodoIndex(id) {
  return todos.findIndex((todo) => todo.id === id);
}
function handleSubmit() {
  if (newTodo.value !== "") {
    todos.push({
      text: newTodo.value,
      done: false,
      id: id.value++,
    });
    newTodo.value = "";
  }
}
function handleChange(event) {
  todos.forEach((todo) => (todo.done = event.target.checked));
}
function handleTodo(id, newTodo) {
  const index = findTodoIndex(id);
  todos[index] = newTodo;
}
function handleDelete(id) {
  const index = findTodoIndex(id);
  todos.splice(index, 1);
}

// watch
watch(todos, (newValue) =>
  localStorage.setItem("todos", JSON.stringify(newValue))
);

// lifecycle
onMounted(() => input.value.focus());
</script>

<template>
  <h1>{{ title }}</h1>
  <form @submit.prevent="handleSubmit">
    <input class="new-todo" v-model.trim="newTodo" ref="input" />
  </form>
  <div class="actions">
    <label>
      <input
        class="action-done"
        type="checkbox"
        :checked="allDone"
        @change="handleChange"
        :indeterminate.prop="indeterminate"
      />
      <template v-if="allDone">Mark all to be done</template>
      <template v-else>Mark all done</template>
    </label>
  </div>
  <ul class="todo-list">
    <todo-item
      v-for="todo of filteredTodos"
      :key="todo.id"
      :todo="todo"
      @update:todo="handleTodo(todo.id, $event)"
    >
      <button class="todo__remove" type="button" @click="handleDelete(todo.id)">
        Delete
      </button>
    </todo-item>
  </ul>
  <div>{{ allDoneLabel }}</div>
  <div class="filters">
    <button type="button" @click="display = 'all'">All</button>
    <button type="button" @click="display = 'todo'">To do</button>
    <button type="button" @click="display = 'done'">Done</button>
  </div>
</template>

<style scoped>
.new-todo {
  width: 100%;
  padding: 5px;
}

.actions {
  margin-top: 5px;
}

.action-done {
  margin-left: 5px;
}

.todo-list {
  display: block;
  padding: 0;
  margin: 5px 0;
}

.todo__remove {
  margin-left: auto;
  background: none;
  border: 0;
  padding: 0 5px;
  height: 19px;
}

.filters {
  display: flex;
}
</style>