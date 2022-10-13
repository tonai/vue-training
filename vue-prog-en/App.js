const App = {
  components: {
    TodoItem: TodoItem,
  },
  data() {
    return {
      id: 0,
      title: 'Vue.js Todo App',
      newTodo: '',
      todos: [],
      display: 'todo',
    }
  },
  methods: {
    findTodoIndex(id) {
      return this.todos.findIndex(todo => todo.id === id)
    },
    handleSubmit() {
      if (this.newTodo !== '') {
        this.todos.push({
          text: this.newTodo,
          done: false,
          id: this.id++
        })
        this.newTodo = ''
      }
    },
    handleChange(event) {
      this.todos.forEach(todo => todo.done = event.target.checked)
    },
    handleTodo(id, newTodo) {
      const index = this.findTodoIndex(id)
      this.todos[index] = newTodo
    },
    handleDelete(id) {
      const index = this.findTodoIndex(id)
      this.todos.splice(index, 1)
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
  },
  watch: {
    todos: {
      handler(newValue) {
        localStorage.setItem('todos', JSON.stringify(newValue))
      },
      deep: true
    }
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem('todos')) || []
    this.id = Math.max(-1, ...this.todos.map(todo => todo.id)) + 1
  },
  mounted() {
    this.$refs.input.focus()
  }
}
