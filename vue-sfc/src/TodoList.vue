<script setup>
import { computed, inject, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TodoItem from "./TodoItem.vue";
import { useTodos } from "./composables/useTodos";

const route = useRoute();

// data
const { addTodo, updateTodo, removeTodo } = inject("todoLists");
const { todos } = useTodos();
const title = ref("Vue.js Todo App");
const newTodo = ref("");
const display = ref("todo");
const input = ref(null);

// computed
const allDone = computed(
  () => todos.value.length > 0 && todos.value.every((todo) => todo.done)
);
const allDoneLabel = computed(() => (allDone.value ? "Nothing to do" : ""));
const filteredTodos = computed(() => 
  todos.value.filter(
    (todo) =>
      display.value === "all" ||
      (display.value === "done" && todo.done) ||
      (display.value === "todo" && !todo.done)
  )
);
const indeterminate = computed(() =>
  todos.value.some((todo) => todo.done !== todos.value[0].done)
);

// methods
function handleSubmit() {
  if (newTodo.value !== "") {
    addTodo(route.params.id, newTodo.value);
    newTodo.value = "";
  }
}
function handleChange(event) {
  todos.value.forEach((todo) => (todo.done = event.target.checked));
}
function handleTodo(id, newTodo) {
  updateTodo(route.params.id, newTodo);
}
function handleDelete(id) {
  removeTodo(route.params.id, id);
}

// lifecycle
onMounted(() => input.value.focus());
</script>

<template>
  <h1>{{ title }} ({{ route.params.id }})</h1>
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
      Mark all
      <Transition name="all-done"><span v-if="allDone">to be</span></Transition>
      done
    </label>
  </div>
  <TransitionGroup class="todo-list" name="todo-list" tag="ul">
    <todo-item
      v-for="todo of filteredTodos"
      :key="`${route.params.id}-${todo.id}`"
      :todo="todo"
      @update:todo="handleTodo(todo.id, $event)"
    >
      <button class="todo__remove" type="button" @click="handleDelete(todo.id)">
        Delete
      </button>
    </todo-item>
  </TransitionGroup>
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

.all-done-enter-active,
.all-done-leave-active {
  transition: opacity 0.5s ease;
}

.all-done-enter-from,
.all-done-leave-to {
  opacity: 0;
}

.todo-list-enter-active,
.todo-list-leave-active {
  transition: all 0.5s ease;
}

.todo-list-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}

.todo-list-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
