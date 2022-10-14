import { computed, inject } from "vue";
import { useRoute } from "vue-router";

export function useTodos() {
  const { todoLists } = inject("todoLists");
  const route = useRoute();
  const id = computed(() => route.params.id);
  const todos = computed(() => todoLists[id.value] ?? []);
  return { todos };
}
