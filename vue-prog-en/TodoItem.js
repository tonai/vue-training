const TodoItem = {
  template: `
<li class="todo">
  <input
    :checked="todo.done"
    @change="handleDone"
    class="todo__done"
    :id="'done-' + todo.id"
    type="checkbox"
  />
  <form v-if="isEditing" @submit.prevent="handleSubmit">
    <input v-model="text"/>
  </form>
  <label
    v-else
    class="todo__text"
    :class="{ 'todo__text--done': todo.done }"
    :for="'done-' + todo.id"
  >{{ todo.text }}</label>
  <input type="checkbox" v-model="isEditing"/>
</li>`,
  props: ['todo'],
  emits: ["update:todo"],
  data() {
    return {
      isEditing: false,
      text: this.todo.text
    }
  },
  methods: {
    handleDone(event) {
      const clone = { ...this.todo }
      clone.done = event.target.checked
      this.$emit('update:todo', clone)
      
    },
    handleSubmit() {
      this.$emit('update:todo', {
        ...this.todo,
        text: this.text
      })
      this.isEditing = false
    }
  }
}