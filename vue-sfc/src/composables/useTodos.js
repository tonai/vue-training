import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

export function useTodos() {
  const route = useRoute();
  const todos = reactive([]);
  const id = ref(0);
  // watch
  watch(todos, (newValue) => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    todos[route.params.id] = newValue;
    localStorage.setItem("todos", JSON.stringify(todos));
  });
  watch(
    () => route.params.id,
    () => {
      const loadedTodos = JSON.parse(localStorage.getItem("todos"));
      todos.splice(0, todos.length, ...loadedTodos[route.params.id]);
      id.value = Math.max(-1, ...todos.map((todo) => todo.id)) + 1;
    },
    { immediate: true }
  );
  return {
    todos,
    id,
  };
}
