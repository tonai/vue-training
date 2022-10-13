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
    <input v-model="text" ref="input"/>
  </form>
  <label
    v-else
    class="todo__text"
    :class="{ 'todo__text--done': todo.done }"
    :for="'done-' + todo.id"
  >{{ todo.text }}</label>
  <input class="todo__edit" type="checkbox" v-model="isEditing"/>
  <slot></slot>
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
      this.isEditing = false
      this.$emit('update:todo', {
        ...this.todo,
        text: this.text
      })
    }
  },
  watch: {
    isEditing: {
      handler(newValue) {
        if (!newValue) {
          this.text = this.todo.text
        } else {
          this.$refs.input.focus()
        }
      },
      flush: 'post'
    }
  }
}