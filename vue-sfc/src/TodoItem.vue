<script setup>
import { ref, watch } from "vue";

const props = defineProps(["todo"]);
const emit = defineEmits(["update:todo"]);

// data
const isEditing = ref(false);
const text = ref(props.todo.text);
const input = ref(null)

// methods
function handleDone(event) {
  const clone = { ...props.todo };
  clone.done = event.target.checked;
  emit("update:todo", clone);
}
function handleSubmit() {
  isEditing.value = false;
  emit("update:todo", {
    ...props.todo,
    text: text.value,
  });
}

// watch
watch(
  isEditing,
  (newValue) => {
    if (!newValue) {
      text.value = props.todo.text;
    } else {
      input.value.focus();
    }
  },
  { flush: "post" }
);
</script>

<template>
  <li class="todo">
    <input
      :checked="todo.done"
      @change="handleDone"
      class="todo__done"
      :id="'done-' + todo.id"
      type="checkbox"
    />
    <form v-if="isEditing" @submit.prevent="handleSubmit">
      <input v-model="text" ref="input" />
    </form>
    <label
      v-else
      class="todo__text"
      :class="{ 'todo__text--done': todo.done }"
      :for="'done-' + todo.id"
      >{{ todo.text }}</label
    >
    <input class="todo__edit" type="checkbox" v-model="isEditing" />
    <slot></slot>
  </li>
</template>

<style scoped>
.todo {
  display: flex;
  list-style-type: none;
  align-items: center;
  flex: 1;
  padding: 5px 0 5px 5px;
}

.todo__done,
.todo__is-editing {
  display: none;
}

.todo__text {
  flex: 1;
}

.todo__text--done {
  text-decoration: line-through;
  opacity: 0.5;
}

.todo__edit-form {
  flex: 1;
}

.todo__input {
  border: 0;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  font-family: inherit;
}

.todo__edit {
  margin-left: auto;
  background: none;
  border: 0;
  padding: 0 5px;
  height: 19px;
}
</style>
