import { defineAsyncComponent } from "vue";
import { createWebHistory, createRouter } from "vue-router";

// import TodoList from "./TodoList.vue";
const TodoList = defineAsyncComponent(() => import("./TodoList.vue"));
const Timer = defineAsyncComponent(() => import("./Timer.vue"));

const routes = [
  {
    path: "/",
    component: TodoList,
    beforeEnter() {
      let todos = JSON.parse(localStorage.getItem("todos"));
      if (!todos || Object.keys(todos).length === 0) {
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
  {
    path: "/timer",
    component: Timer,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
