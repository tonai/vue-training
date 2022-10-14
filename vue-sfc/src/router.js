import { createWebHistory, createRouter } from "vue-router";
import TodoList from "./TodoList.vue";

const routes = [
  {
    path: "/",
    component: TodoList,
    beforeEnter() {
      let todos = JSON.parse(localStorage.getItem("todos"));
      if (!todos) {
        todos = { 0: [] };
        localStorage.setItem("todos", JSON.stringify(todos));
      }
      const id = Object.keys(todos)[0];
      return `/todo/${id}`;
    },
  },
  {
    path: "/todo/:id",
    component: TodoList,
    beforeEnter(to) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      if (!todos[to.params.id]) {
        return "/";
      }
    },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
