<template>
  <v-container fluid>
    <div class="layout-wrapper">
      <!-- Botão de Hambúrguer -->
      <v-btn icon @click="toggleProjects">
        <i class="mdi mdi-menu"></i>
      </v-btn>

      <!-- Lista de Projetos -->
      <div v-if="showProjects" class="projects">
        <v-card class="card-custom">
          <v-card-title class="title-custom">Projetos</v-card-title>
          <v-card-text>
            <project-list :projects="projectStore.projects" @select-project="selectProject" />
          </v-card-text>
        </v-card>
        <v-btn
          color="primary"
          class="mt-3 new-project-button"
          @click="addNewProject"
        >
          + Novo Projeto
        </v-btn>
      </div>

      <!-- Tarefas -->
      <div class="tasks" v-if="projectStore.currentProject">
        <v-row>
          <v-col cols="12" v-for="task in projectStore.currentProject.tasks" :key="task._id">
            <v-card class="card-custom-project">
              <v-card-text>
                <task-card :task="task" @remove-task="removeTask"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- Formulários -->
      <div class="forms">
        <v-card class="card-custom">
          <v-card-title>Nova Tarefa</v-card-title>
          <v-card-text>
            <new-task-form @add-task="addTask" />
          </v-card-text>
        </v-card>
        <v-card class="card-custom mt-4">
          <v-card-title>Novo Projeto</v-card-title>
          <v-card-text>
            <new-project-form @add-project="addProject" />
          </v-card-text>
        </v-card>
      </div>
    </div>
  </v-container>
</template>

<script>
import { onMounted, ref  } from 'vue';
import { useProjectStore } from '../store/projects';
import TaskCard from '../components/TaskCard.vue';
import NewTaskForm from '../components/NewTaskForm.vue';
import NewProjectForm from '../components/NewProjectForm.vue';
import ProjectList from '../components/ProjectList.vue';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000'; // Certifique-se de que está apontando para a porta correta

export default {
  name: 'ProjectDashboard',
  components: {
    TaskCard,
    NewTaskForm,
    NewProjectForm,
    ProjectList
  },
  computed: {
    pendingTasks() {
      return this.projectStore.currentProject.tasks.filter(task => !task.isCompleted && !task.inProgress);
    },
    inProgressTasks() {
      return this.projectStore.currentProject.tasks.filter(task => task.inProgress);
    },
    completedTasks() {
      return this.projectStore.currentProject.tasks.filter(task => task.isCompleted);
    }
  },
  setup() {
    const projectStore = useProjectStore();
    const showProjects = ref(true);

    const toggleProjects = () => {
      showProjects.value = !showProjects.value;
    };

    onMounted(() => {
      projectStore.fetchProjects();
    });

    return {
      projectStore,
      showProjects,
      toggleProjects
    };
  },
  methods: {
    addTask(task) {
      if (this.projectStore.currentProject) {
        const projectId = this.projectStore.currentProject._id;
        this.projectStore.addTaskToProject(projectId, task);
      } else {
        console.error('Nenhum projeto selecionado');
      }
    },
    addProject(project) {
      this.projectStore.addProject(project);
      this.projectStore.currentProject = project;
    },
    selectProject(project) {
      this.projectStore.currentProject = project;
    },
    async removeTask(taskId) {
      try {
        console.log(`Tentando remover tarefa com ID: ${taskId}`);
        const response = await axios.delete(`/api/tasks/${taskId}`);
        console.log('Resposta da API:', response.data);
        this.projectStore.currentProject.tasks = this.projectStore.currentProject.tasks.filter(task => task._id !== taskId);
        console.log('Tarefa removida com sucesso');
      } catch (error) {
        console.error('Erro ao remover tarefa:', error);
        console.error('Configuração da requisição:', error.config);
        console.error('Resposta da API:', error.response);
        console.error('Requisição original:', error.request);
      }
    }
  }
}
</script>
