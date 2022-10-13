const App = {
  components: {
    TodoItem: TodoItem,
  },
  data() {
    return {
      title: 'Vue.js Todo App',
      newTodo: '',
      todos: [],
      display: 'todo',
    }
  },
  methods: {
    handleSubmit() {
      if (this.newTodo !== '') {
        this.todos.push({
          text: this.newTodo,
          done: false,
          id: this.todos.length
        })
        this.newTodo = ''
      }
    },
    handleChange(event) {
      this.todos.forEach(todo => todo.done = event.target.checked)
    },
    handleTodo(id, newTodo) {
      const index = this.todos.findIndex(todo => todo.id === id)
      this.todos[index] = newTodo
    }
  },
  computed: {
    allDone() {
      return this.todos.length > 0 && this.todos.every(todo => todo.done)
    },
    allDoneLabel() {
      if (this.allDone) {
        return 'Nothing to do'
      }
    },
    filteredTodos() {
      return this.todos.filter((todo) => this.display === 'all'
        || (this.display === 'done' && todo.done)
        || (this.display === 'todo' && !todo.done))
    },
    indeterminate() {
      return this.todos.some(todo => todo.done !== this.todos[0].done)
    }
  }
}
