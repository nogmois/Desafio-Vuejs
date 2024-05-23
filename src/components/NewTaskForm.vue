<template>
  <div class="form-container">
    <form @submit.prevent="submitTask" class="task-form">
      <input v-model="task.title" placeholder="Título da Task" class="input-field" />
      <textarea v-model="task.description" placeholder="Descrição" class="textarea-field"></textarea>
      <button type="submit" class="submit-btn">Salvar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewTaskForm',
  data() {
    return {
      task: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    submitTask() {
      this.$emit('add-task', this.task);
      this.task.title = '';
      this.task.description = '';
    }
  }
}
</script>
