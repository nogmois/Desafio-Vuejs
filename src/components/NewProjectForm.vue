<template>
  <div class="form-container">
    <form @submit.prevent="submitProject" class="project-form">
      <input v-model="project.title" placeholder="Título do Projeto" class="input-field" />
      <textarea v-model="project.description" placeholder="Descrição" class="textarea-field"></textarea>
      <button type="submit" class="submit-btn">Criar Projeto</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'NewProjectForm',
  data() {
    return {
      project: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    submitProject() {
      const newProject = {
        ...this.project,
        creatorId: 'userID_atual' // Inclua o creatorId diretamente aqui
      };
      this.$emit('add-project', newProject);
      // Limpa o formulário após o envio
      this.project.title = '';
      this.project.description = '';
    }
  }
}
</script>

